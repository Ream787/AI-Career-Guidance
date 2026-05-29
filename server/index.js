import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI client

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});


// System context for the AI to understand Belgium Campus
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

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body ?? {};

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env file',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message.trim(),
      config: {
        systemInstruction: SYSTEM_CONTEXT,
        maxOutputTokens: 700,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      return res.status(500).json({
        error: 'The AI returned an empty response. Please try again.',
      });
    }

    return res.json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));

    const status = error?.status || error?.code;

    if (status === 400) {
      return res.status(400).json({
        error: 'Bad request sent to Gemini API.',
        details: error.message,
      });
    }

    if (status === 401 || status === 403) {
      return res.status(500).json({
        error: 'Invalid or unauthorized Gemini API key. Please check your GEMINI_API_KEY in the .env file.',
      });
    }

    if (status === 404) {
      return res.status(500).json({
        error: 'Gemini model not found. Please verify the model name being used by the backend.',
      });
    }

    return res.status(500).json({
      error: 'Failed to get AI response. Please try again.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'BC CourseFinder™ API is running',
    hasApiKey: !!GEMINI_API_KEY,
    model: 'gemini-2.5-flash',
    apiVersion: 'v1',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BC CourseFinder™ Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔑 Gemini API Key configured: ${GEMINI_API_KEY ? 'Yes ✓' : 'No ✗'}`);
});