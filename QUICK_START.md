# ⚡ Quick Start Guide - BC CourseFinder™

## 🎯 What You Need To Do Now

### 1. Install Server Dependencies

The server needs its own dependencies installed. Run these commands:

```bash
npm install
```

This will install all required packages including the Gemini AI SDK.

### 2. Get Your Gemini API Key

1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### 3. Configure Your API Key

#### Automated Method (Recommended):
```bash
bash setup-gemini.sh
```

#### Manual Method:
1. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

### 4. Verify Setup

```bash
pnpm run check
```

This will verify:
- ✅ .env file exists
- ✅ API key is configured
- ✅ Dependencies are installed

### 5. Start the Server

```bash
pnpm start
```

You should see:
```
🚀 BC CourseFinder™ Backend running on http://localhost:3001
🔑 Gemini API Key configured: Yes ✓
🤖 Model: gemini-1.5-flash (latest stable)
```

### 6. Test It Works

Open a new terminal and test:

```bash
curl http://localhost:3001/api/health
```

Should return:
```json
{
  "status": "ok",
  "hasApiKey": true,
  "model": "gemini-1.5-flash"
}
```

## 🎉 That's It!

Your Gemini AI integration is now set up with:
- ✅ Latest Gemini 1.5 Flash model
- ✅ Belgium Campus knowledge base
- ✅ Express backend server
- ✅ Error handling and safety filters
- ✅ CORS enabled for frontend integration

## 🚀 Next Steps

1. **Test the chatbot** - Open your React frontend and try asking questions
2. **Read full docs** - See `GEMINI_SETUP_GUIDE.md` for detailed information
3. **Customize responses** - Edit the system prompt in `server/index.js`

## 📚 Documentation

- `GEMINI_SETUP_GUIDE.md` - Complete setup documentation
- `server/README.md` - Server-specific documentation
- `server/.env.example` - Example environment configuration

## ⚠️ Important Notes

- Keep your `.env` file secure (already in `.gitignore`)
- Never commit your API key to version control
- The free tier has rate limits - check Google AI Studio for quota
- Server runs on port 3001 by default

## 🆘 Need Help?

Run the setup checker:
```bash
pnpm run check
```

Check the logs for error messages and refer to the troubleshooting section in `GEMINI_SETUP_GUIDE.md`.

---

**Ready to help Belgium Campus students find their IT career path!** 🎓
