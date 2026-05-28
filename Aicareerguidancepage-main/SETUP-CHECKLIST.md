# ✅ BC CourseFinder™ Setup Checklist

Use this checklist to make sure you've completed all setup steps correctly.

## 📋 Pre-Setup Checklist

Before you begin, verify you have:

- [ ] Node.js v18+ installed
  - Test: Run `node --version` in terminal
  - Should show: v18.x.x or higher
  - If not: Download from https://nodejs.org/

- [ ] npm installed
  - Test: Run `npm --version` in terminal
  - Should show: 8.x.x or higher
  - Comes with Node.js

- [ ] VS Code installed
  - If not: Download from https://code.visualstudio.com/

- [ ] Google account (for API key)
  - If not: Create one at https://accounts.google.com/

---

## 🔑 API Key Setup

- [ ] **Visited Google AI Studio**
  - URL: https://aistudio.google.com/app/apikey
  
- [ ] **Signed in with Google account**
  
- [ ] **Created API Key**
  - Clicked "Create API Key" button
  
- [ ] **Copied the API key**
  - Saved somewhere safe (you'll need it soon!)

---

## 🖥️ Backend Setup

- [ ] **Opened VS Code**
  - Project folder is open

- [ ] **Opened integrated terminal**
  - Press: `` Ctrl+` ``

- [ ] **Navigated to server folder**
  ```bash
  cd server
  ```

- [ ] **Installed dependencies**
  ```bash
  npm install
  ```
  - ✅ Should see: packages installed successfully
  - ❌ If errors: Check Node.js version

- [ ] **Created .env file**
  ```bash
  cp .env.example .env
  ```
  - Windows PowerShell: `copy .env.example .env`
  - ✅ File `server/.env` now exists

- [ ] **Added API key to .env**
  - Opened `server/.env` in VS Code
  - Replaced `your_gemini_api_key_here` with actual key
  - Saved the file (Ctrl+S)

- [ ] **Verified setup**
  ```bash
  npm run check
  ```
  - ✅ Should show: "All checks passed!"

- [ ] **Started backend server**
  ```bash
  npm start
  ```
  - ✅ Should see: `🚀 BC CourseFinder™ Backend running...`
  - ✅ Should see: `🔑 Gemini API Key configured: Yes ✓`
  - ❌ If errors: Check API key in .env file

---

## 🎨 Frontend Setup

- [ ] **Opened NEW terminal**
  - Click `+` button in terminal panel
  - Or press: `` Ctrl+Shift+` ``
  - Keep backend terminal running!

- [ ] **Navigated to project root**
  ```bash
  cd ..
  ```
  - If you're in `/server` folder
  - Check with `pwd` command

- [ ] **Installed dependencies**
  ```bash
  npm install
  ```
  - Takes 1-2 minutes
  - ✅ Should complete without errors

- [ ] **Started frontend server**
  ```bash
  npm run dev
  ```
  - ✅ Should see: `VITE v6.x.x ready`
  - ✅ Should see: `Local: http://localhost:5173/`

---

## 🌐 Browser Test

- [ ] **Opened browser**
  - Go to: http://localhost:5173/

- [ ] **Page loads successfully**
  - ✅ See: "BC CourseFinder™" header
  - ✅ See: Welcome message from bot
  - ✅ See: Input field at bottom
  - ✅ See: Quick action buttons

- [ ] **Tested backend connection**
  - Open new tab: http://localhost:3001/api/health
  - ✅ Should see JSON: `{"status":"ok"...}`

---

## 💬 Chatbot Test

- [ ] **Sent a test message**
  - Type: "Hello"
  - Press Enter or click Send

- [ ] **Received AI response**
  - ✅ Loading indicator appears (3 bouncing dots)
  - ✅ AI response appears in chat
  - ✅ Message has timestamp
  - ❌ If connection error: Check backend is running

- [ ] **Tested quick action button**
  - Click: "Careers with Maths & Science"
  - ✅ Button triggers message
  - ✅ AI responds appropriately

- [ ] **Tested multiple messages**
  - Send 2-3 different questions
  - ✅ All receive responses
  - ✅ Chat scrolls automatically

---

## 🔧 VS Code Setup (Optional but Recommended)

- [ ] **Installed recommended extensions**
  - VS Code should show popup
  - Click "Install All"
  - Or install manually from Extensions panel (Ctrl+Shift+X)

- [ ] **Tested VS Code tasks**
  - Press: `Ctrl+Shift+P`
  - Type: "Tasks: Run Task"
  - See: "🎯 Start Both Servers" option
  - (You can use this for faster startup next time!)

---

## 📁 File Verification

Verify these files exist:

- [ ] `/server/.env` - Your API key (SECRET - not in Git)
- [ ] `/server/node_modules/` - Backend packages
- [ ] `/node_modules/` - Frontend packages
- [ ] `/server/index.js` - Backend server code
- [ ] `/src/app/components/ChatInterface.tsx` - Frontend chat

---

## 🎯 Final Verification

- [ ] **Both servers running simultaneously**
  - Terminal 1: Backend on port 3001
  - Terminal 2: Frontend on port 5173

- [ ] **Can chat with bot**
  - Send message → Get AI response

- [ ] **No console errors**
  - Press F12 in browser
  - Check Console tab
  - Should be clean (or only warnings)

- [ ] **Backend shows requests**
  - Check Terminal 1 (backend)
  - Should log POST requests to /api/chat

---

## ✨ Success Criteria

You're fully set up when:

✅ Backend terminal shows: `Backend running on http://localhost:3001`
✅ Frontend terminal shows: `Local: http://localhost:5173/`
✅ Browser shows chatbot interface at localhost:5173
✅ Sending messages gets AI responses
✅ No error messages in browser console
✅ Quick action buttons work

---

## 🆘 Troubleshooting Checklist

If something's not working, check:

### Backend Issues

- [ ] Is Node.js v18+ installed? (`node --version`)
- [ ] Did `npm install` complete in `/server`?
- [ ] Does `server/.env` file exist?
- [ ] Is API key in `.env` file (no extra spaces)?
- [ ] Is backend terminal showing "Backend running"?
- [ ] Run `npm run check` in `/server` folder

### Frontend Issues

- [ ] Did `npm install` complete in project root?
- [ ] Is frontend terminal showing "VITE ready"?
- [ ] Is backend also running (both terminals)?
- [ ] Try refreshing browser (Ctrl+R)
- [ ] Check browser console for errors (F12)

### API/Connection Issues

- [ ] Backend running on port 3001?
- [ ] Frontend running on port 5173?
- [ ] Test: http://localhost:3001/api/health shows "ok"
- [ ] Check API key is valid at Google AI Studio
- [ ] No firewall blocking localhost connections?

---

## 📚 Next Steps After Setup

Once everything is ✅ checked:

- [ ] Read: [VSCODE-GUIDE.md](VSCODE-GUIDE.md) - Learn VS Code tips
- [ ] Read: [ARCHITECTURE.md](ARCHITECTURE.md) - Understand how it works
- [ ] Read: [CUSTOMIZATION.md](CUSTOMIZATION.md) - Make it your own
- [ ] Test: Ask the chatbot various questions
- [ ] Experiment: Try changing the welcome message

---

## 🎓 Learning Checklist

As you work with the project:

- [ ] Understand React components (ChatInterface.tsx)
- [ ] Understand Express API (server/index.js)
- [ ] Understand data flow (message → backend → AI → response)
- [ ] Try making small customizations
- [ ] Read the code comments in each file

---

## 💾 Save Your Progress

Before making changes:

- [ ] Initialize Git (if not already):
  ```bash
  git init
  git add .
  git commit -m "Initial setup complete"
  ```

- [ ] Verify .env is NOT in Git:
  ```bash
  git status
  ```
  - Should NOT see `server/.env` in the list
  - ✅ Already in .gitignore

---

## 🎉 You're All Set!

If you've checked everything above, congratulations! You now have:

✅ A fully functional AI-powered chatbot
✅ Local development environment
✅ Both frontend and backend running
✅ Understanding of the project structure

**Start experimenting and building! 🚀**

---

## 📝 Daily Startup Checklist

For next time you work on this project:

1. [ ] Open project in VS Code
2. [ ] Open terminal (`` Ctrl+` ``)
3. [ ] Start backend:
   ```bash
   cd server
   npm start
   ```
4. [ ] Open new terminal (`+`)
5. [ ] Start frontend:
   ```bash
   npm run dev
   ```
6. [ ] Open browser: http://localhost:5173/
7. [ ] Start coding! 💻

Or use VS Code task: `Ctrl+Shift+P` → "Run Task" → "🎯 Start Both Servers"

---

Need help? Check [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) for all guides!
