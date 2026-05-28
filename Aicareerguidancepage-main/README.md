# BC CourseFinder™ - AI Career Guidance Chatbot

An intelligent chatbot application built for Belgium Campus students to help them choose their IT career path. Features an interactive chat interface powered by Google's Gemini AI, providing personalized guidance on courses, qualifications, internships, and career options.

---

## 📌 New to This Project?

**👉 Start here: [START-HERE.md](START-HERE.md) - Get running in 5 minutes!**

For quick reference, see also:
- [QUICKSTART.md](QUICKSTART.md) - Fast setup steps
- [VSCODE-GUIDE.md](VSCODE-GUIDE.md) - VS Code instructions
- [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) - All documentation

---

## 🌟 Features

- **AI-Powered Chat**: Intelligent responses using Google Gemini AI
- **Quick Action Buttons**: Fast access to common topics
- **Belgium Campus Branding**: Professional, clean interface
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Responses**: Instant AI-generated guidance
- **Multiple Topics**: Career paths, qualifications, internships, course options

## 🏗️ Architecture

This project consists of two parts:

1. **Frontend** - React + TypeScript + Tailwind CSS
2. **Backend** - Node.js + Express + Gemini AI

```
┌─────────────────┐      HTTP Request       ┌─────────────────┐
│                 │  ─────────────────────>  │                 │
│  React Frontend │                          │  Express Server │
│   (Port 5173)   │  <─────────────────────  │   (Port 3001)   │
│                 │      AI Response         │                 │
└─────────────────┘                          └────────┬────────┘
                                                      │
                                                      │ API Call
                                                      ▼
                                              ┌─────────────────┐
                                              │   Gemini API    │
                                              │  (Google Cloud) │
                                              └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)
- **Google Gemini API Key** - [Get it here](https://aistudio.google.com/app/apikey)

### Step 1: Clone/Open the Project

Open this project folder in VS Code.

### Step 2: Set Up the Backend

1. **Navigate to the server folder:**
   ```bash
   cd server
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Get your Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key

5. **Add your API key to `.env`:**
   Open `server/.env` and replace `your_gemini_api_key_here` with your actual key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   PORT=3001
   ```

6. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   🚀 BC CourseFinder™ Backend running on http://localhost:3001
   📡 API endpoint: http://localhost:3001/api/chat
   🔑 Gemini API Key configured: Yes ✓
   ```

### Step 3: Set Up the Frontend

1. **Open a NEW terminal** (keep the backend running!)
   - In VS Code: Press `` Ctrl+Shift+` `` or click the `+` button in the terminal

2. **Navigate to the project root:**
   ```bash
   cd ..
   ```
   (If you're still in the server folder)

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v6.x.x ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ```

5. **Open the app:**
   - Click the link or go to http://localhost:5173/
   - You should see the BC CourseFinder™ chatbot interface!

## 🎯 Usage

### Using the Chatbot

1. Type your question in the input field
2. Press Enter or click "Send"
3. Wait for the AI to generate a response
4. Use Quick Action buttons for common topics

### Example Questions to Try

- "What career options do I have with Maths and Science?"
- "What's the difference between a diploma and a degree?"
- "How do I become a software developer?"
- "Tell me about internship opportunities"
- "What qualifications do you offer?"

## 📁 Project Structure

```
bc-coursefinder/
├── server/                    # Backend server
│   ├── index.js              # Express server with Gemini AI
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables (create this)
│   ├── .env.example          # Example env file
│   └── README.md             # Backend documentation
│
├── src/
│   ├── app/
│   │   ├── components/       # React components
│   │   │   ├── ChatInterface.tsx    # Main chat UI
│   │   │   ├── ChatMessage.tsx      # Message bubble
│   │   │   ├── ChatHeader.tsx       # Header component
│   │   │   └── QuickActionButton.tsx # Quick topic buttons
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Chat page
│   │   │   ├── About.tsx     # About Belgium Campus
│   │   │   └── NotFound.tsx  # 404 page
│   │   ├── routes.tsx        # React Router config
│   │   └── App.tsx           # Main app component
│   └── styles/               # CSS files
│
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

## 🛠️ Development in VS Code

### Running Both Servers

You need to run two servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Thunder Client** - API testing (alternative to Postman)
- **Error Lens** - Better error visualization

### Debugging Tips

1. **Check if backend is running:**
   - Open http://localhost:3001/api/health in your browser
   - You should see: `{"status":"ok","message":"BC CourseFinder™ API is running","hasApiKey":true}`

2. **Check browser console:**
   - Press F12 in your browser
   - Look for any error messages in the Console tab

3. **Check server logs:**
   - Look at the terminal where the backend is running
   - You'll see each API request logged

## 🐛 Troubleshooting

### Frontend shows "having trouble connecting"

✅ **Solution:**
- Make sure the backend server is running (check Terminal 1)
- Verify it shows "Backend running on http://localhost:3001"
- Check that you've added your Gemini API key to `server/.env`

### "API key not configured" error

✅ **Solution:**
- Verify `server/.env` exists and has your API key
- Make sure there are no extra spaces around the key
- Restart the backend server after adding the key

### Port already in use

✅ **Solution:**
- Backend (3001): Change PORT in `server/.env`, update frontend URL
- Frontend (5173): Vite will automatically try port 5174

### npm install fails

✅ **Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 🔐 Security Best Practices

- ✅ `.env` is in `.gitignore` - never commit API keys
- ✅ Backend proxies API calls - API key stays server-side
- ✅ CORS is configured - only your frontend can access the API
- ⚠️ This is for **development only** - use environment variables in production

## 🚀 Deploying to Production

When you're ready to deploy for real students:

### Backend Options

1. **Firebase Functions** (Recommended)
   - Free tier available
   - Automatic scaling
   - Easy environment variable management

2. **Vercel Serverless Functions**
   - Simple deployment
   - Great for Next.js/React apps

3. **Railway/Render**
   - Easy Node.js deployment
   - Free tiers available

### Frontend Options

1. **Vercel** - Best for React apps
2. **Netlify** - Great free tier
3. **Firebase Hosting** - If using Firebase Functions

## 📚 Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Google Generative AI** - Gemini API integration
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🤝 Contributing

This is a Belgium Campus student project. To modify:

1. Make changes in VS Code
2. Test locally (both frontend and backend)
3. Keep the Belgium Campus branding consistent
4. Don't commit your `.env` file!

## 📞 Belgium Campus Contact

- **Website:** https://belgiumcampus.ac.za
- **Email:** info@belgiumcampus.ac.za
- **Phone:** +27 10 593 5368
- **Location:** Pretoria, South Africa

## 📄 License

This project is for educational purposes for Belgium Campus students.

## 🎓 Next Steps

- [ ] Test the chatbot with various questions
- [ ] Customize AI responses for specific Belgium Campus programs
- [ ] Add chat history/conversation persistence
- [ ] Deploy to production (Firebase/Vercel)
- [ ] Add analytics to track popular questions
- [ ] Implement user feedback system

---

Built with ❤️ for Belgium Campus Students