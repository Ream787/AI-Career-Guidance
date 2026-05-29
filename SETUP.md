# 🚀 Quick Setup Guide

Follow these steps to get BC CourseFinder™ running on your computer in VS Code.

## ⚡ 5-Minute Setup

### 1️⃣ Get Your Gemini API Key (2 minutes)

1. Open https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. **Copy the key** (you'll need it in step 3)

### 2️⃣ Install Backend Dependencies (1 minute)

Open the integrated terminal in VS Code (`` Ctrl+` ``) and run:

```bash
cd server
npm install
```

### 3️⃣ Configure Your API Key (30 seconds)

Still in the terminal:

```bash
# Copy the example file
cp .env.example .env
```

Then open `server/.env` in VS Code and paste your API key:

```env
GEMINI_API_KEY=paste_your_key_here
PORT=3001
```

Save the file!

### 4️⃣ Start the Backend (10 seconds)

In the same terminal:

```bash
npm start
```

✅ You should see:
```
🚀 BC CourseFinder™ Backend running on http://localhost:3001
🔑 Gemini API Key configured: Yes ✓
```

### 5️⃣ Start the Frontend (1 minute)

**Open a NEW terminal** (click the `+` button or press `` Ctrl+Shift+` ``):

```bash
# Go back to project root
cd ..

# Install frontend dependencies
npm install

# Start the frontend
npm run dev
```

✅ You should see:
```
➜  Local:   http://localhost:5173/
```

### 6️⃣ Open the App (5 seconds)

Click the link or open your browser to:
```
http://localhost:5173/
```

🎉 **You're done! Start chatting with BC CourseFinder™!**

---

## 🎯 Quick Test

Try asking these questions:

1. "What career paths are available in IT?"
2. "What's the difference between a diploma and a degree?"
3. "How do I become a software developer?"

---

## 📝 Your VS Code Setup Should Look Like This

```
Terminal 1 (server):
~/project/server$ npm start
🚀 BC CourseFinder™ Backend running...

Terminal 2 (frontend):
~/project$ npm run dev
➜  Local:   http://localhost:5173/
```

**Both terminals must stay open!**

---

## ❓ Something Not Working?

### Backend won't start?
- Check you created `server/.env` file
- Verify your API key has no extra spaces
- Make sure you're in the `/server` folder when running `npm start`

### Frontend won't start?
- Make sure you ran `npm install` in the project root
- Check if port 5173 is already in use

### Chatbot shows connection error?
- Is the backend terminal still running?
- Did you see "Backend running on http://localhost:3001"?
- Check that your API key is in `server/.env`

### Still stuck?
Read the full [README.md](/README.md) for detailed troubleshooting.

---

## 🎓 What You Just Built

- ✅ Local Node.js backend server
- ✅ Integration with Google Gemini AI
- ✅ React frontend with real-time chat
- ✅ Full-stack application running on your computer

**Next:** Try customizing the responses or deploy to Firebase!
