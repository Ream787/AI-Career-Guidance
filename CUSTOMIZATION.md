# 🎨 Customization Guide

Easy ways to customize BC CourseFinder™ for your needs.

## 🎯 Quick Customizations (5 minutes each)

### 1. Change the Welcome Message

**File:** `src/app/components/ChatInterface.tsx`

Find this section (around line 27):
```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: 1,
    text: "Hello! I'm your BC CourseFinder™ assistant...",
    // Change this text ↑
```

**Example:**
```typescript
text: "Hey there! 👋 I'm here to help you find your perfect IT career at Belgium Campus. Ask me anything!",
```

### 2. Add More Quick Action Buttons

**File:** `src/app/components/ChatInterface.tsx`

Find `allTopics` (around line 19):
```typescript
const allTopics = [
  ...quickTopics,
  { label: "Internship Options", icon: <Briefcase className="w-4 h-4" /> },
  // Add your new button here ↓
  { label: "Admission Requirements", icon: <FileText className="w-4 h-4" /> },
];
```

Don't forget to import the icon:
```typescript
import { Send, Calculator, ..., FileText } from "lucide-react";
```

### 3. Change the Color Scheme

**File:** `src/app/components/ChatInterface.tsx`

Find all instances of `bg-[#1e3a5f]` and replace with your color:

```typescript
// Belgium Campus blue
bg-[#1e3a5f]  →  bg-[#1e3a5f]

// Try different colors:
bg-[#2563eb]  // Blue
bg-[#7c3aed]  // Purple
bg-[#059669]  // Green
bg-[#dc2626]  // Red
```

### 4. Customize AI Personality

**File:** `server/index.js`

Find `SYSTEM_CONTEXT` (around line 16):
```javascript
const SYSTEM_CONTEXT = `You are BC CourseFinder™, an AI assistant...

Your role:
- Help students choose appropriate IT career paths
- Be friendly, professional, and encouraging  ← Change this!
```

**Example personalities:**
```javascript
// Enthusiastic mentor
- Be energetic, motivating, and use emojis
- Celebrate student goals and aspirations
- Share success stories and inspiration

// Professional advisor
- Maintain formal, respectful tone
- Focus on facts and data
- Provide structured, detailed answers

// Friendly peer
- Use casual, relatable language
- Share personal experiences (as a student guide)
- Keep responses conversational
```

### 5. Add More Belgium Campus Details

**File:** `server/index.js`

Expand the `SYSTEM_CONTEXT` with specific course info:
```javascript
Key information about Belgium Campus:
- Offers Higher Certificates (1 year), Diplomas (2-3 years)...
// Add specific courses ↓
- Software Development: Java, Python, JavaScript, React
- Data Science: Python, R, Machine Learning, Statistics
- Cybersecurity: Network Security, Ethical Hacking, CISSP prep
- Mobile Development: Android (Kotlin), iOS (Swift), React Native
```

## 🎨 Visual Customizations

### Change Chat Bubble Colors

**File:** `src/app/components/ChatMessage.tsx`

```typescript
// Bot messages (current: white)
<div className="bg-white rounded-lg p-4">

// User messages (current: blue)
<div className="bg-[#1e3a5f] text-white rounded-lg p-4">

// Try different styles:
<div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4">
```

### Add Belgium Campus Logo

**File:** `src/app/components/ChatInterface.tsx`

In the header section:
```typescript
<div className="bg-[#1e3a5f] text-white px-6 py-4 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="BC" className="w-8 h-8" />
    <h1 className="text-xl font-semibold">BC CourseFinder™</h1>
  </div>
  {/* ... */}
</div>
```

### Make Message Bubbles Animated

**File:** `src/app/components/ChatMessage.tsx`

Add motion:
```typescript
import { motion } from "motion/react";

// Change div to motion.div
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className={`flex items-start gap-3 ${isBot ? '' : 'justify-end'}`}
>
```

## 🤖 AI Behavior Customizations

### Make Responses Shorter

**File:** `server/index.js`

```javascript
Your role:
// Add this line ↓
- Keep responses under 100 words and 3 bullet points
- Be friendly, professional, and encouraging
```

### Make Responses More Detailed

```javascript
Your role:
// Add this line ↓
- Provide comprehensive, detailed explanations
- Include examples and real-world applications
- Expand on technical concepts with clarity
```

### Add Specific Response Format

```javascript
Your role:
// Add formatting instructions ↓
- Always structure responses with:
  1. Brief answer (1-2 sentences)
  2. Key points (3-5 bullets)
  3. Follow-up question to continue conversation
```

### Focus on Specific Topics

```javascript
Specialization: Software Development
// Add domain expertise ↓
- Provide code examples when relevant
- Explain programming concepts in simple terms
- Recommend specific technologies and frameworks
- Discuss current industry trends
```

## 📱 Mobile Optimizations

### Larger Touch Targets

**File:** `src/app/components/QuickActionButton.tsx`

```typescript
// Change button padding
className="p-3 text-left border-2"  // Current
className="p-4 text-left border-2"  // Larger (better for mobile)
```

### Hide Features on Mobile

**File:** `src/app/components/ChatInterface.tsx`

```typescript
<div className="hidden md:flex gap-2">
  {/* Desktop-only features */}
</div>

<div className="md:hidden">
  {/* Mobile-only features */}
</div>
```

## 🔧 Advanced Customizations

### Add Message Timestamps

Already implemented! But to customize the format:

**File:** `src/app/components/ChatInterface.tsx`

```typescript
timestamp: new Date().toLocaleTimeString([], { 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: true  // Add AM/PM
})
```

### Add Typing Indicator

Already implemented with loading state! The three bouncing dots appear automatically.

### Save Chat History to LocalStorage

**File:** `src/app/components/ChatInterface.tsx`

Add after the messages state:
```typescript
// Save to localStorage when messages change
useEffect(() => {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}, [messages]);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('chatHistory');
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);
```

### Add "Clear Chat" Button

**File:** `src/app/components/ChatInterface.tsx`

```typescript
const clearChat = () => {
  setMessages([{
    id: 1,
    text: "Chat cleared. How can I help you?",
    isBot: true,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);
  localStorage.removeItem('chatHistory');
};

// Add button in header:
<button onClick={clearChat} className="...">
  Clear Chat
</button>
```

### Add Rate Limiting

**File:** `server/index.js`

```javascript
// Install: npm install express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/chat', limiter);
```

### Add Response Streaming

**File:** `server/index.js`

```javascript
// For real-time word-by-word responses
const result = await model.generateContentStream(message);
for await (const chunk of result.stream) {
  const text = chunk.text();
  // Send chunk to frontend
}
```

## 🎓 Course-Specific Customizations

### Add Course Catalog

Create `src/app/data/courses.ts`:
```typescript
export const courses = {
  softwareDevelopment: {
    name: "Software Development",
    duration: "3 years",
    qualification: "Bachelor's Degree",
    skills: ["Java", "Python", "React", "Databases"],
    careers: ["Software Developer", "Full-Stack Developer"]
  },
  // Add more...
};
```

Use in ChatInterface or server responses.

### Add Career Quiz

Create `src/app/components/CareerQuiz.tsx`:
```typescript
export function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const questions = [
    "Do you enjoy solving logical problems?",
    "Are you interested in creative design?",
    // Add more questions
  ];
  
  // Quiz logic here
}
```

## 🌐 About Page Customizations

**File:** `src/app/pages/About.tsx`

### Add Student Testimonials

```typescript
const testimonials = [
  {
    name: "Sarah M.",
    course: "Software Development",
    text: "Belgium Campus changed my career path completely!"
  },
  // Add more
];
```

### Add Campus Photos

```typescript
<div className="grid grid-cols-2 gap-4">
  <img src="/campus1.jpg" alt="Campus" />
  <img src="/campus2.jpg" alt="Students" />
</div>
```

## 🔍 SEO & Metadata

**File:** `src/app/App.tsx` or create `src/app/components/Head.tsx`

```typescript
import { Helmet } from 'react-helmet';

<Helmet>
  <title>BC CourseFinder™ - Find Your IT Career Path</title>
  <meta name="description" content="AI-powered career guidance for Belgium Campus students" />
</Helmet>
```

## 🎯 Testing Your Customizations

1. **Save the file** (Ctrl+S)
2. **Check the browser** - Changes should auto-reload
3. **Test functionality** - Make sure it still works
4. **Check console** (F12) - Look for errors

## 💾 Before Making Big Changes

Always backup your working code:

```bash
# Create a copy of the file
cp src/app/components/ChatInterface.tsx src/app/components/ChatInterface.backup.tsx
```

Or use Git:
```bash
git add .
git commit -m "Working version before customization"
```

## 📚 Need More Help?

- Check component files for inline comments
- Look at [ARCHITECTURE.md](/ARCHITECTURE.md) to understand structure
- Test one change at a time
- Use browser DevTools (F12) to debug

---

Happy customizing! 🎨
