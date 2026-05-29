# 💻 VS Code Setup Guide for BC CourseFinder™

This guide shows you exactly how to run the project in Visual Studio Code.

## 🎯 Method 1: Using VS Code Tasks (Easiest!)

This is the simplest method - just press a few buttons!

### Step 1: Set Up Your API Key (One-Time Setup)

1. Get your API key from https://aistudio.google.com/app/apikey
2. In VS Code, open `server/.env.example`
3. Press `Ctrl+Shift+P` and type "Save As"
4. Save it as `server/.env`
5. Replace `your_gemini_api_key_here` with your actual key
6. Save the file

### Step 2: Install Dependencies (One-Time Setup)

1. Open VS Code terminal (`` Ctrl+` ``)
2. Run these commands:
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ..
   npm install
   ```

### Step 3: Run the Application

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: `Tasks: Run Task`
3. Select: `🎯 Start Both Servers`

✅ **Done!** Both servers will start in separate terminal panels!

---

## 🎯 Method 2: Using Multiple Terminals (Manual)

This method gives you more control over each server.

### Step 1: Start the Backend

1. Open integrated terminal (`` Ctrl+` ``)
2. Run:
   ```bash
   cd server
   npm install  # (first time only)
   npm start
   ```
3. Wait for: `🚀 BC CourseFinder™ Backend running...`

### Step 2: Start the Frontend

1. Click the `+` button in terminal (or `` Ctrl+Shift+` ``)
2. In the NEW terminal, run:
   ```bash
   npm install  # (first time only)
   npm run dev
   ```
3. Wait for: `➜  Local:   http://localhost:5173/`

### Step 3: Open Your Browser

Click the link or go to http://localhost:5173/

---

## 🖥️ Your VS Code Layout

Here's what your VS Code should look like when everything is running:

```
┌─────────────────────────────────────────────────────┐
│  VS Code - BC CourseFinder™                         │
├─────────────────────────────────────────────────────┤
│  Explorer  │  Code Editor                           │
│            │                                         │
│  📁 server │  ChatInterface.tsx                     │
│  📁 src    │  [Your code here]                      │
│  📄 README │                                         │
│            │                                         │
├─────────────────────────────────────────────────────┤
│  TERMINAL                                           │
│  ┌──────────────────┬──────────────────┐           │
│  │ 1: server        │ 2: frontend      │           │
│  │ ~/server$ npm    │ ~/$ npm run dev  │           │
│  │ 🚀 Backend       │ ⚡ Vite running  │           │
│  │ running...       │ on :5173         │           │
│  └──────────────────┴──────────────────┘           │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Useful VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `` Ctrl+` `` | Toggle terminal |
| `` Ctrl+Shift+` `` | New terminal |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+J` | Toggle panel |
| `Ctrl+\`` | Split editor |

---

## 📁 Important Files to Know

### Files You'll Edit Often:
- `src/app/components/ChatInterface.tsx` - Chat UI logic
- `server/index.js` - Backend AI integration
- `src/app/pages/About.tsx` - About page content

### Configuration Files (Edit Once):
- `server/.env` - Your API key (⚠️ NEVER commit this!)
- `server/package.json` - Backend dependencies
- `package.json` - Frontend dependencies

### Don't Touch These:
- `node_modules/` - Auto-generated
- `dist/` - Build output
- `.vscode/` - Editor settings (already configured)

---

## 🐛 Debugging in VS Code

### View Backend Logs
- Click the terminal tab labeled "server"
- Watch for API requests and errors

### View Frontend Logs
- Click the terminal tab labeled "frontend"
- Or press F12 in your browser

### Debug React Components
1. Press F12 in Chrome/Edge
2. Install "React Developer Tools" extension
3. Use the Components tab to inspect state

---

## 🎨 Recommended VS Code Extensions

VS Code will automatically suggest these. Click "Install" when prompted:

- **ES7+ React/Redux snippets** - React code shortcuts
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Thunder Client** - Test your API
- **Error Lens** - See errors inline
- **Prettier** - Code formatting

---

## ⚡ Quick Commands Reference

### Backend Commands (run in `/server` folder):
```bash
npm start          # Start the server
npm install        # Install dependencies
```

### Frontend Commands (run in project root):
```bash
npm run dev        # Start development server
npm install        # Install dependencies
npm run build      # Build for production
```

---

## 🔄 Workflow for Development

### Daily Development Routine:

1. **Open VS Code**
   - Open the project folder

2. **Start Backend** (Terminal 1)
   ```bash
   cd server
   npm start
   ```

3. **Start Frontend** (Terminal 2 - press `+`)
   ```bash
   npm run dev
   ```

4. **Make Changes**
   - Edit files in VS Code
   - Changes auto-reload in browser!

5. **Test**
   - Chat with the bot
   - Check browser console (F12)
   - Check terminal for errors

6. **Stop Servers**
   - Press `Ctrl+C` in both terminals
   - Or just close VS Code

---

## 💡 Pro Tips

### Tip 1: Auto-Reload on Save
Both frontend and backend auto-reload when you save files!

### Tip 2: Split View
- Press `Ctrl+\` to split editor
- Edit frontend and backend code side-by-side

### Tip 3: Quick File Navigation
- Press `Ctrl+P`
- Type filename to quickly open it

### Tip 4: Search Everything
- Press `Ctrl+Shift+F`
- Search across all files in project

### Tip 5: Format on Save
1. Press `Ctrl+,` (Settings)
2. Search "format on save"
3. Enable it
4. Your code auto-formats when you save!

---

## 🆘 Need Help?

### Backend Not Starting?
1. Check `server/.env` exists
2. Verify API key is correct
3. Run `npm install` in `/server` folder

### Frontend Not Starting?
1. Run `npm install` in project root
2. Check no other app is using port 5173
3. Try closing and reopening VS Code

### Can't See Terminal?
- Press `` Ctrl+` `` or
- View → Terminal

### Lost Your Browser Link?
- Look in the frontend terminal
- It shows: `Local: http://localhost:5173/`

---

## 🎓 Learning Resources

Want to understand the code better?

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com/
- **Gemini API**: https://ai.google.dev/docs

---

Happy Coding! 🚀
