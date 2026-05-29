# 🎉 Welcome to BC CourseFinder™!

An AI-powered chatbot to help Belgium Campus students find their perfect IT career path.

---

## ⚡ Super Quick Start (5 Minutes)

### What You Need:
- ✅ VS Code installed
- ✅ Node.js installed (v18+)
- ✅ 5 minutes of your time

### 3 Simple Steps:

#### 1️⃣ Get API Key (1 minute)
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in → Click "Create API Key"
3. Copy your key

#### 2️⃣ Setup Backend (2 minutes)
Open VS Code terminal (Ctrl+`):
```bash
cd server
npm install
cp .env.example .env
```
Edit `server/.env` and paste your API key

#### 3️⃣ Start Everything (2 minutes)

**Terminal 1:**
```bash
cd server
npm start
```

**Terminal 2** (click `+` to open new terminal):
```bash
npm install
npm run dev
```

**Done!** Open: http://localhost:5173/

---

## 📚 Full Documentation

| I want to... | Read this... |
|--------------|-------------|
| 🚀 Get started quickly | [QUICKSTART.md](QUICKSTART.md) |
| 💻 Learn VS Code setup | [VSCODE-GUIDE.md](VSCODE-GUIDE.md) |
| 📖 Understand everything | [README.md](README.md) |
| 🏗️ See how it works | [ARCHITECTURE.md](ARCHITECTURE.md) |
| 🎨 Customize the app | [CUSTOMIZATION.md](CUSTOMIZATION.md) |
| 📑 See all docs | [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) |

---

## 🎯 What Is This?

BC CourseFinder™ is a smart chatbot that helps students at Belgium Campus:
- Explore IT career options
- Understand different qualifications (diplomas vs degrees)
- Learn about courses and requirements
- Find internship opportunities
- Get personalized guidance

**Powered by Google's Gemini AI** - so it gives intelligent, helpful responses!

---

## 🖥️ What You're Building

```
┌──────────────────────────────────────┐
│   Your React App (Frontend)         │
│   - Chat Interface                   │
│   - Belgium Campus Branding          │
│   - Quick Action Buttons             │
└──────────┬───────────────────────────┘
           │
           │ Sends messages to...
           │
┌──────────▼───────────────────────────┐
│   Your Node Server (Backend)        │
│   - Protects your API key            │
│   - Calls Gemini AI                  │
│   - Returns smart responses          │
└──────────┬───────────────────────────┘
           │
           │ Calls...
           │
┌──────────▼───────────────────────────┐
│   Google Gemini AI                   │
│   - Generates intelligent responses  │
│   - Understands Belgium Campus       │
└──────────────────────────────────────┘
```

---

## ✨ Cool Features

- 🤖 **Real AI responses** (not scripted!)
- ⚡ **Quick action buttons** for common questions
- 💬 **Live chat interface** with typing indicators
- 📱 **Responsive design** (works on phone & desktop)
- 🎨 **Belgium Campus branding** (blue & professional)
- 🔐 **Secure** (API key stays on server, never exposed)

---

## 🎓 Perfect For Learning

This project teaches you:
- ✅ React & TypeScript
- ✅ Backend API development with Express
- ✅ Working with AI APIs (Gemini)
- ✅ Full-stack development
- ✅ VS Code productivity
- ✅ Deployment to production

---

## 🎮 Try It Out

Once running, ask the chatbot:
1. "What IT careers can I pursue?"
2. "What's the difference between a diploma and degree?"
3. "How do I become a software developer?"
4. "Tell me about internships"

Watch it give you intelligent, contextual responses! 🤯

---

## 🛠️ Technologies Used

**Frontend:**
- React 18 (UI library)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Vite (super fast dev server)

**Backend:**
- Node.js (JavaScript runtime)
- Express (web server)
- Google Gemini AI (artificial intelligence)

---

## ⚠️ Important: Keep Your API Key Secret!

Your Gemini API key is like a password. **Never:**
- ❌ Commit it to Git
- ❌ Share it publicly
- ❌ Put it in frontend code

**Always:**
- ✅ Keep it in `server/.env`
- ✅ Add `.env` to `.gitignore` (already done!)
- ✅ Use environment variables

---

## 🐛 Something Not Working?

### Quick Fixes:

**"Can't connect to backend"**
- Make sure Terminal 1 shows: `🚀 Backend running...`
- Check you created `server/.env` with your API key

**"API key not configured"**
- Edit `server/.env` and paste your key
- Restart the backend (Ctrl+C, then `npm start`)

**"Port already in use"**
- Close other apps using port 3001 or 5173
- Or change the port in `server/.env`

**Still stuck?**
- Run: `cd server && npm run check`
- Read: [QUICKSTART.md](QUICKSTART.md) → Troubleshooting

---

## 🚀 Next Steps

Once you have it running:

### Level 1: Get Comfortable (Day 1)
- [ ] Get the app running
- [ ] Chat with the bot
- [ ] Read [VSCODE-GUIDE.md](VSCODE-GUIDE.md)

### Level 2: Make It Yours (Week 1)
- [ ] Read [CUSTOMIZATION.md](CUSTOMIZATION.md)
- [ ] Change the welcome message
- [ ] Add a new quick action button
- [ ] Change the color scheme

### Level 3: Understand It (Week 2)
- [ ] Read [ARCHITECTURE.md](ARCHITECTURE.md)
- [ ] Study `ChatInterface.tsx`
- [ ] Study `server/index.js`
- [ ] Understand how data flows

### Level 4: Deploy It (Week 3)
- [ ] Set up Firebase account
- [ ] Deploy backend to Cloud Functions
- [ ] Deploy frontend to Hosting
- [ ] Share with your friends! 🎉

---

## 💡 Pro Tips

1. **Keep both terminals open** while working
   - Terminal 1 = Backend
   - Terminal 2 = Frontend

2. **Changes auto-reload!**
   - Edit code → Save → Browser refreshes automatically

3. **Use the browser console** (F12)
   - See errors
   - Debug issues
   - Test API calls

4. **Check terminal logs**
   - Backend logs show AI requests
   - Frontend logs show build info

5. **Start small, learn big**
   - Make one change at a time
   - Test after each change
   - Read the code comments

---

## 📞 Belgium Campus Info

This chatbot helps students at:

**Belgium Campus**
- 📍 Pretoria, South Africa
- 📧 info@belgiumcampus.ac.za
- 📞 +27 10 593 5368
- 🌐 belgiumcampus.ac.za

---

## 🎯 Ready to Start?

### Choose Your Path:

**🏃 I want to run it NOW!**
→ Follow the "Super Quick Start" at the top of this page

**📖 I want to understand first**
→ Read [README.md](README.md)

**💻 I'm comfortable with VS Code**
→ Jump to [QUICKSTART.md](QUICKSTART.md)

**🎨 I want to customize it**
→ Get it running first, then read [CUSTOMIZATION.md](CUSTOMIZATION.md)

---

## 🎓 You've Got This!

This might seem like a lot, but:
- ✅ The setup is only 5 minutes
- ✅ The documentation is super clear
- ✅ Everything is explained step-by-step
- ✅ You'll learn tons of valuable skills

**Let's build something awesome!** 🚀

---

## 📚 Documentation Quick Links

- [START HERE](START-HERE.md) ← You are here!
- [Quick Start Guide](QUICKSTART.md)
- [VS Code Guide](VSCODE-GUIDE.md)
- [Full README](README.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Customization Guide](CUSTOMIZATION.md)
- [Documentation Index](DOCUMENTATION-INDEX.md)

---

**Happy Coding!** 💙

Built with ❤️ for Belgium Campus Students
Powered by Google Gemini AI 🤖
