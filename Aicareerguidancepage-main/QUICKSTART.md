# ⚡ Quick Start - BC CourseFinder™

Get up and running in 5 minutes!

## 📋 Prerequisites

- ✅ Node.js v18+ installed ([Download here](https://nodejs.org/))
- ✅ VS Code installed ([Download here](https://code.visualstudio.com/))
- ✅ Google account (to get Gemini API key)

## 🚀 3-Step Setup

### STEP 1: Get Your API Key (1 minute)

```
1. Open: https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
```

### STEP 2: Configure Backend (2 minutes)

Open VS Code terminal (Ctrl+`) and run:

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Now edit `server/.env` and paste your API key:
```env
GEMINI_API_KEY=paste_your_actual_key_here
PORT=3001
```

Save the file!

### STEP 3: Start Everything (2 minutes)

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

Wait for: `🚀 BC CourseFinder™ Backend running...`

**Terminal 2 - Frontend** (click `+` to open new terminal):
```bash
# Go back to root if you're in server folder
cd ..

# Install frontend dependencies
npm install

# Start the app
npm run dev
```

Wait for: `➜ Local: http://localhost:5173/`

**Open browser:** http://localhost:5173/

## ✅ Verify Setup

Run the setup checker before starting:

```bash
cd server
npm run check
```

This will verify:
- ✓ .env file exists
- ✓ API key is configured
- ✓ Dependencies are installed
- ✓ All required packages present

## 🎯 Test the Chatbot

Try these questions:
1. "What IT careers can I pursue?"
2. "Tell me about software development"
3. "What's the difference between diploma and degree?"

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check `.env` file has your API key |
| "Connection error" in chat | Make sure backend is running on port 3001 |
| Port already in use | Change PORT in `server/.env` |
| npm install fails | Delete `node_modules`, run `npm install` again |

## 📁 Project Structure

```
bc-coursefinder/
├── server/              ← Backend (Node.js + Express + Gemini)
│   ├── index.js         ← Main server file
│   ├── .env             ← Your API key (create this!)
│   └── package.json     ← Backend dependencies
│
├── src/
│   └── app/
│       ├── components/  ← React components
│       └── pages/       ← App pages
│
└── package.json         ← Frontend dependencies
```

## 🎓 What's Running?

When both servers are running:

```
Backend:  http://localhost:3001  (API server)
Frontend: http://localhost:5173  (Your app)
```

**Both must be running for the chatbot to work!**

## 📚 Next Steps

- ✅ Test the chatbot with different questions
- ✅ Read [VSCODE-GUIDE.md](/VSCODE-GUIDE.md) for VS Code tips
- ✅ Read [README.md](/README.md) for full documentation
- ✅ Customize responses in `server/index.js`
- ✅ Deploy to production (Firebase/Vercel)

## 🔐 Important Security Note

**Never commit your `.env` file!**

It's already in `.gitignore`, but double-check:
```bash
git status
```

If you see `.env` in the list, run:
```bash
git rm --cached server/.env
```

## 💡 Pro Tips

### Quick Start Both Servers (VS Code)
1. Press `Ctrl+Shift+P`
2. Type: "Tasks: Run Task"
3. Select: "🎯 Start Both Servers"

### Auto-Reload on Changes
- Frontend: Auto-reloads when you save files
- Backend: Restart with `Ctrl+C` then `npm start`
  - Or use: `npm run dev` for auto-reload

### Test API Directly
Open in browser: http://localhost:3001/api/health

Should show:
```json
{
  "status": "ok",
  "message": "BC CourseFinder™ API is running",
  "hasApiKey": true
}
```

## 🆘 Still Need Help?

1. **Check Setup:** Run `npm run check` in the server folder
2. **Read Logs:** Look at terminal output for errors
3. **Browser Console:** Press F12 and check Console tab
4. **Full Guide:** Read [README.md](/README.md)

---

## ✨ You're All Set!

You now have a fully functional AI-powered chatbot running locally!

**Both terminals must stay open while using the app.**

When you're done:
- Press `Ctrl+C` in both terminals
- Or just close VS Code

---

Happy Coding! 🚀
Built for Belgium Campus Students ❤️
