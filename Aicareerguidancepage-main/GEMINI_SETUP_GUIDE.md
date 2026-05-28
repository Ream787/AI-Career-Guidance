# 🚀 Gemini API Setup Guide

Complete guide to setting up the Gemini AI integration for BC CourseFinder™

## 📋 Prerequisites

- Node.js v18 or higher
- npm or pnpm package manager
- A Google account (for Gemini API key)

## 🔑 Step 1: Get Your Gemini API Key

1. Visit **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Select **"Create API key in new project"** (or select an existing project)
5. Copy your API key (starts with `AIza...`)

> **Important:** Keep your API key secure and never commit it to version control!

## ⚙️ Step 2: Configure the Server

### Option 1: Automated Setup (Recommended)

```bash
cd server
npm install
bash setup-gemini.sh
```

The script will:
- Create your `.env` file
- Prompt you for your API key
- Verify the setup

### Option 2: Manual Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` and add your API key:**
   ```env
   GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   PORT=3001
   ```

5. **Verify setup:**
   ```bash
   npm run check
   ```

## 🏃 Step 3: Start the Server

```bash
npm start
```

You should see:
```
🚀 BC CourseFinder™ Backend running on http://localhost:3001
📡 API endpoint: http://localhost:3001/api/chat
🔑 Gemini API Key configured: Yes ✓
🤖 Model: gemini-1.5-flash (latest stable)
```

## 🧪 Step 4: Test the Integration

### Test 1: Health Check

Open your browser or use curl:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "BC CourseFinder™ API is running",
  "model": "gemini-1.5-flash",
  "hasApiKey": true
}
```

### Test 2: Send a Chat Message

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What IT careers are available at Belgium Campus?"}'
```

You should receive an AI-generated response about Belgium Campus IT careers.

### Test 3: Test from the Frontend

1. Make sure the backend server is running (Step 3)
2. Start your React frontend (in a separate terminal):
   ```bash
   # From the project root
   npm run dev
   # or if using Vite directly
   npm run start
   ```
3. Open the chatbot interface in your browser
4. Send a message and verify you get AI responses

## 🔧 Troubleshooting

### Error: "Gemini API key not configured"

**Solution:**
- Verify `.env` file exists in the `server/` directory
- Check that `GEMINI_API_KEY` is set in `.env`
- Restart the server after adding the key

### Error: "Invalid API key"

**Solution:**
- Verify your API key is correct (no extra spaces)
- Check if the key is still active at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Try generating a new API key

### Error: "API quota exceeded"

**Solution:**
- Check your API usage at [Google AI Studio](https://aistudio.google.com)
- Gemini API has a free tier with rate limits
- You may need to wait or upgrade your quota

### Error: "Port 3001 is already in use"

**Solution:**
1. Change the port in `server/.env`:
   ```env
   PORT=3002
   ```
2. Update the frontend API URL in `src/app/components/ChatInterface.tsx`:
   ```typescript
   const API_URL = 'http://localhost:3002/api/chat';
   ```
3. Restart both frontend and backend

### Frontend can't connect to backend

**Checklist:**
- ✅ Backend server is running (check terminal for startup messages)
- ✅ Backend is on port 3001 (or the port specified in `.env`)
- ✅ Frontend is calling the correct URL
- ✅ No CORS errors in browser console
- ✅ Both frontend and backend are running simultaneously

## 📊 Current Configuration

### Model Information
- **Model:** `gemini-1.5-flash`
- **Type:** Latest stable Google Gemini model
- **Features:** Fast responses, optimized for chat interactions
- **Context:** Configured with Belgium Campus knowledge base

### Alternative Models

You can change the model in `server/index.js`:

```javascript
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',  // Change this
  systemInstruction: SYSTEM_CONTEXT
});
```

Available models:
- `gemini-1.5-flash` - Fast, balanced (recommended)
- `gemini-1.5-pro` - More capable, slower, higher cost
- `gemini-2.0-flash-exp` - Experimental latest model

## 🔒 Security Best Practices

1. **Never commit `.env` to Git**
   - Already in `.gitignore`
   - Double-check before pushing

2. **Never share your API key**
   - Don't post in issues, forums, or chat
   - Regenerate if accidentally exposed

3. **Use environment variables in production**
   - Don't hardcode API keys
   - Use your hosting platform's environment variable system

## 🚢 Next Steps: Production Deployment

When ready to deploy:

### Option 1: Firebase Functions (Recommended)
```bash
npm install -g firebase-tools
firebase init functions
# Copy server code to functions/index.js
firebase functions:config:set gemini.api_key="YOUR_KEY"
firebase deploy --only functions
```

### Option 2: Vercel
```bash
npm install -g vercel
cd server
vercel
# Add GEMINI_API_KEY in Vercel dashboard
```

### Option 3: Railway/Render/Heroku
1. Push code to Git repository
2. Connect repository to platform
3. Add `GEMINI_API_KEY` environment variable in platform settings
4. Deploy

## 📞 Need Help?

1. **Check server logs** - Most errors are displayed in the terminal
2. **Run setup check** - `npm run check` to verify configuration
3. **Test health endpoint** - Verify server is responding
4. **Check Gemini API status** - Visit [Google AI Studio](https://aistudio.google.com)
5. **Review documentation** - Check `server/README.md` for more details

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Start the server |
| `npm run dev` | Start with auto-reload |
| `npm run check` | Verify setup |
| `bash setup-gemini.sh` | Automated setup script |

## ✅ Setup Complete!

Once everything is working:
1. ✅ Backend server starts without errors
2. ✅ Health check returns `"hasApiKey": true`
3. ✅ Chat endpoint returns AI responses
4. ✅ Frontend can communicate with backend

You're ready to help Belgium Campus students find their IT career path! 🎓
