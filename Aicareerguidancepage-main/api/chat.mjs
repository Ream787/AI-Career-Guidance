// /api/chat.js

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite"
];

const SYSTEM_CONTEXT = `You are BC CourseFinder™, an AI assistant for Belgium Campus students. Belgium Campus iTversity is a leading private higher education institution in South Africa specializing in Information Technology and innovation-driven learning.

Key information about Belgium Campus iTversity:
- Founded in 1999, focused on developing highly skilled, industry-ready IT graduates
- Offers Higher Certificates (1 year), Diplomas (2-3 years), Advanced Diplomas, and Bachelor's Degrees (3-4 years)
- All qualifications are DHET registered and industry-recognized
- Over 8% of South Africa's ICT graduates come from Belgium Campus
- Main IT career paths: Software Development, Data Science, AI, Cybersecurity, Network Engineering, UX/UI Design, Systems Architecture
- Strong industry partnerships with leading tech companies for internships and employment
- Three campuses: Pretoria (Main - 138 Berg Ave, Heatherdale), Kempton Park (45A Long Street), Stellenbosch (10 Distillery Road)
- Modern facilities: hybrid classrooms, robotics labs, innovation spaces, libraries, sports facilities
- Strong graduate employability through industry exposure and practical learning
- Contact: info@belgiumcampus.ac.za, +27 10 593 5368
- Applications: apply@belgiumcampus.ac.za
- Website: belgiumcampus.ac.za

Your role:
- Help students choose appropriate IT career paths based on their interests and goals
- Provide detailed information about qualifications, courses, and entry requirements
- Explain differences between certificates, diplomas, advanced diplomas, and degrees
- Guide students on internship, learnership, and career opportunities
- Answer questions about campus facilities, student life, and accommodation
- Provide accurate contact information and direct students to the right departments
- Be friendly, professional, encouraging, and supportive
- Keep responses concise but informative (2-4 paragraphs max)
- Use bullet points for clarity when listing options or comparing programs
- Encourage students to explore their interests and reach out for more information

Always maintain a helpful, student-focused tone and inspire confidence in students' IT career journey.`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini({ apiKey, model, message, conversation }) {
  const prompt = conversation
    ? `${SYSTEM_CONTEXT}\n\nThe conversation so far:\n${conversation}\n\nPlease continue this conversation and answer the latest student question directly without repeating the introductory greeting.\n\nStudent question: ${message}`
    : `${SYSTEM_CONTEXT}\n\nStudent question: ${message}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  const rawText = await response.text();

  let data = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { raw: rawText };
  }

  return { response, data };
}

async function tryModelWithBackoff({ apiKey, model, message, conversation }) {
  const delays = [1200, 2500, 5000];

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    const { response, data } = await callGemini({ apiKey, model, message, conversation });

    if (response.ok) {
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part?.text || "")
          .filter(Boolean)
          .join("") || "";

      return {
        ok: true,
        model,
        text: text || "I’m here to help. Could you rephrase your question a little?"
      };
    }

    const status = response.status;
    const errorMessage = data?.error?.message || "Unknown upstream error";

    // Retry only for temporary overload / capacity problems
    if (status === 503 && attempt < delays.length) {
      const jitter = Math.floor(Math.random() * 400);
      await sleep(delays[attempt] + jitter);
      continue;
    }

    return {
      ok: false,
      model,
      status,
      errorMessage,
      data
    };
  }

  return {
    ok: false,
    model,
    status: 503,
    errorMessage: "Model remained unavailable after retries."
  };
}

async function generateWithFallback({ apiKey, message, conversation }) {
  let lastError = null;

  for (const model of MODELS) {
    const result = await tryModelWithBackoff({ apiKey, model, message, conversation });

    if (result.ok) {
      return result;
    }

    lastError = result;

    // If it's 503 (overload) or 429 (rate limit), try next model in the list
    if (result.status === 503 || result.status === 429) {
      continue;
    }

    // For other errors, stop immediately
    return result;
  }

  return lastError || {
    ok: false,
    status: 503,
    errorMessage: "No model available."
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const message = body?.message;
    const conversation = body?.conversation;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY in Vercel environment variables"
      });
    }

    const result = await generateWithFallback({ apiKey, message, conversation });

    if (result.ok) {
      return res.status(200).json({
        response: result.text
      });
    }

    if (result.status === 429) {
      return res.status(200).json({
        response:
          "⚠️ The AI service rate limit was reached. Please wait a bit and try again."
      });
    }

    if (result.status === 403) {
      return res.status(200).json({
        response:
          "⚠️ The AI service rejected the API key or project access."
      });
    }

    if (result.status === 400) {
      return res.status(200).json({
        response:
          "⚠️ The AI request was rejected. Please try a shorter or simpler question."
      });
    }

    return res.status(200).json({
      response:
        "⚠️ Gemini is under heavy demand right now on both available models. Please try again in a little while."
    });
  } catch (error) {
    console.error("chat.js fatal error:", error);

    return res.status(200).json({
      response:
        "⚠️ Something went wrong on the server while generating a response."
    });
  }
}