# BC CourseFinder™ Backend Server

This is the backend server for the BC CourseFinder chatbot application, providing AI-powered responses using Google's Gemini API.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- A Google Gemini API key

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Install Dependencies

```bash
cd server
npm install
```

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

### Step 4: Start the Server

```bash
npm start
```

You should see:
```
🚀 BC CourseFinder™ Backend running on http://localhost:3001
📡 API endpoint: http://localhost:3001/api/chat
🔑 Gemini API Key configured: Yes ✓
```

## 📝 Running in VS Code

### Option 1: Using the Integrated Terminal

1. Open VS Code
2. Open the integrated terminal (`` Ctrl+` `` or `View > Terminal`)
3. Navigate to the server folder:
   ```bash
   cd server
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Option 2: Using VS Code Tasks (Recommended)

Create a `.vscode/tasks.json` file in your project root:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend Server",
      "type": "shell",
      "command": "npm start",
      "options": {
        "cwd": "${workspaceFolder}/server"
      },
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    }
  ]
}
```

Then press `Ctrl+Shift+P` > "Tasks: Run Task" > "Start Backend Server"

## 🔌 API Endpoints

### POST /api/chat

Send a chat message and get an AI response.

**Request:**
```json
{
  "message": "What IT careers are available?"
}
```

**Response:**
```json
{
  "response": "There are many exciting IT careers available at Belgium Campus..."
}
```

### GET /api/health

Check if the server is running and API key is configured.

**Response:**
```json
{
  "status": "ok",
  "message": "BC CourseFinder™ API is running",
  "hasApiKey": true
}
```

## 🐛 Troubleshooting

### Error: "Gemini API key not configured"

- Make sure you created a `.env` file in the `/server` folder
- Verify your API key is correctly pasted (no extra spaces)
- Restart the server after adding the API key

### Error: "Port 3001 is already in use"

- Change the PORT in your `.env` file to a different number (e.g., 3002)
- Also update the frontend to use the new port in `/src/app/components/ChatInterface.tsx`

### Frontend can't connect to backend

- Make sure the backend server is running (you should see the startup messages)
- Check that the backend is running on port 3001
- Verify the frontend is calling `http://localhost:3001/api/chat`
- Check for CORS errors in the browser console

## 📦 Project Structure

```
server/
├── index.js           # Main server file with Express and Gemini integration
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this - not in git)
├── .env.example      # Example environment file
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🔐 Security Notes

- **NEVER** commit your `.env` file to Git
- **NEVER** share your Gemini API key publicly
- The `.env` file is already in `.gitignore` to prevent accidental commits
- For production deployment, use environment variables on your hosting platform

## 🚢 Moving to Firebase Later

When you're ready to deploy to Firebase:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase Functions: `firebase init functions`
3. Copy the code from `index.js` to `functions/index.js`
4. Set environment config: `firebase functions:config:set gemini.api_key="YOUR_KEY"`
5. Deploy: `firebase deploy --only functions`

The current local setup uses Express, which is very similar to Firebase Cloud Functions, so migration will be straightforward.

## 💡 Development Tips

- Use `node --watch index.js` for auto-reload during development (Node 18+)
- Check the console logs to see requests and responses
- Test the `/api/health` endpoint to verify everything is working
- Use Postman or Thunder Client (VS Code extension) to test the API

## 📞 Support

If you encounter issues:
1. Check the server console for error messages
2. Verify your Gemini API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Make sure you're using Node.js v18 or higher: `node --version`
4. Try deleting `node_modules` and running `npm install` again
