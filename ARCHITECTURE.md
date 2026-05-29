# 🏗️ BC CourseFinder™ Architecture

Understanding how everything works together.

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR COMPUTER                           │
│                                                                 │
│  ┌─────────────────────┐         ┌─────────────────────┐      │
│  │   React Frontend    │         │   Express Backend   │      │
│  │   (Port 5173)       │         │   (Port 3001)       │      │
│  │                     │         │                     │      │
│  │  • ChatInterface    │────────>│  • /api/chat        │      │
│  │  • User Input       │  POST   │  • Gemini AI Call   │      │
│  │  • Display Messages │<────────│  • Response Handler │      │
│  │                     │  JSON   │                     │      │
│  └─────────────────────┘         └──────────┬──────────┘      │
│                                              │                  │
└──────────────────────────────────────────────┼──────────────────┘
                                               │
                                               │ HTTPS
                                               │ (API Call)
                                               │
                                    ┌──────────▼──────────┐
                                    │   Google Cloud      │
                                    │   Gemini API        │
                                    │   (ai.google.dev)   │
                                    └─────────────────────┘
```

## 🔄 Request Flow

### When a user sends a message:

```
1. User types message
   └─> ChatInterface.tsx

2. Frontend sends POST request
   └─> http://localhost:3001/api/chat
       Body: { message: "What careers are available?" }

3. Express server receives request
   └─> server/index.js
       
4. Server calls Gemini API
   └─> Uses @google/generative-ai package
       Sends: User message + System context
       
5. Gemini generates response
   └─> AI processes the question
       Returns: Intelligent answer
       
6. Server sends response to frontend
   └─> JSON: { response: "Here are the IT careers..." }
       
7. Frontend displays AI response
   └─> ChatMessage component renders the message
```

## 🗂️ Folder Structure Explained

```
bc-coursefinder/
│
├── server/                          # Backend Server (Node.js)
│   ├── index.js                     # Main Express server
│   │   ├── CORS middleware          # Allow frontend to call backend
│   │   ├── /api/chat endpoint       # Handle chat messages
│   │   ├── /api/health endpoint     # Server health check
│   │   └── Gemini AI integration    # Call Google's AI
│   │
│   ├── .env                         # 🔐 Your API key (SECRET!)
│   ├── .env.example                 # Template for .env
│   ├── package.json                 # Backend dependencies
│   └── node_modules/                # Backend packages
│
├── src/                             # Frontend Application (React)
│   ├── app/
│   │   ├── components/              # Reusable React components
│   │   │   ├── ChatInterface.tsx    # Main chat UI + logic
│   │   │   ├── ChatMessage.tsx      # Individual message bubble
│   │   │   ├── ChatHeader.tsx       # Top header bar
│   │   │   ├── QuickActionButton.tsx # Quick topic buttons
│   │   │   └── Layout.tsx           # Page layout wrapper
│   │   │
│   │   ├── pages/                   # Full page components
│   │   │   ├── Home.tsx             # Chat page (main)
│   │   │   ├── About.tsx            # About Belgium Campus
│   │   │   └── NotFound.tsx         # 404 error page
│   │   │
│   │   ├── routes.tsx               # React Router config
│   │   └── App.tsx                  # Root component
│   │
│   └── styles/                      # CSS styling
│       ├── index.css                # Global styles
│       ├── theme.css                # Design tokens
│       └── tailwind.css             # Tailwind config
│
├── package.json                     # Frontend dependencies
├── vite.config.ts                   # Vite build config
└── node_modules/                    # Frontend packages
```

## 🔌 API Endpoints

### POST /api/chat

**Purpose:** Send a user message, get AI response

**Request:**
```json
{
  "message": "What is software development?"
}
```

**Response (Success):**
```json
{
  "response": "Software development is the process of..."
}
```

**Response (Error):**
```json
{
  "error": "Gemini API key not configured"
}
```

### GET /api/health

**Purpose:** Check if backend is running

**Response:**
```json
{
  "status": "ok",
  "message": "BC CourseFinder™ API is running",
  "hasApiKey": true
}
```

## 🎨 Frontend Components

```
App.tsx (Root)
  └── RouterProvider
      └── Layout.tsx
          ├── Header (Navigation)
          │   ├── "Home" link
          │   └── "About" link
          │
          └── Outlet (Current Page)
              │
              ├── Home.tsx
              │   └── ChatInterface.tsx
              │       ├── ChatHeader.tsx
              │       ├── Messages Area
              │       │   └── ChatMessage.tsx (multiple)
              │       ├── Quick Actions
              │       │   └── QuickActionButton.tsx (multiple)
              │       └── Input Area
              │
              └── About.tsx
                  └── Belgium Campus Info
```

## 🔐 Security Architecture

### API Key Protection

```
❌ WRONG (Insecure):
React App ──[API Key]──> Gemini API
└─> Key exposed in browser code!

✅ CORRECT (Secure):
React App ──[Message]──> Express Server ──[API Key]──> Gemini API
                         └─> Key stays on server!
```

### How It Works:

1. **API Key Storage**
   - Stored in `server/.env` (never sent to browser)
   - Only server can read it
   - `.gitignore` prevents committing to Git

2. **CORS Protection**
   - Server only accepts requests from your frontend
   - External sites can't call your API

3. **Request Validation**
   - Server checks for empty messages
   - Validates API key before calling Gemini

## 📡 Data Flow Example

**User asks:** "What careers use Math and Science?"

```
┌──────────────────┐
│ 1. User Input    │
│ ChatInterface    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. State Update  │
│ setMessages()    │
│ Add user message │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. API Call      │
│ fetch(POST)      │
│ to /api/chat     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Express       │
│ Receives request │
│ Validates data   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Gemini API    │
│ Generate content │
│ with context     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 6. AI Response   │
│ Return to server │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 7. Express       │
│ Send JSON to     │
│ frontend         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 8. Frontend      │
│ Display message  │
│ in chat bubble   │
└──────────────────┘
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **@google/generative-ai** - Gemini SDK
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 🌐 Ports Explained

| Port | Service | Purpose |
|------|---------|---------|
| 3001 | Backend API | Handles AI requests, protects API key |
| 5173 | Frontend (Vite) | Serves React app to browser |

**Why two ports?**
- Separation of concerns (frontend vs backend)
- Security (API key stays on backend)
- Scalability (can deploy separately)

## 🚀 Deployment Architecture

### Local Development (Current):
```
Your Computer
  ├── Backend: localhost:3001
  └── Frontend: localhost:5173
```

### Production (Future - Firebase):
```
Cloud Infrastructure
  ├── Firebase Functions: backend-abc123.cloudfunctions.net
  └── Firebase Hosting: belgiumcampus-chat.web.app
```

## 📊 Performance Considerations

1. **API Calls are Async**
   - Frontend doesn't freeze while waiting
   - Loading state shown to user

2. **Message Streaming**
   - Currently: Wait for full response
   - Future: Stream response word-by-word

3. **Error Handling**
   - Frontend shows fallback if backend is down
   - Backend validates before calling Gemini

## 💡 Understanding the Code

### Key Files to Study:

1. **ChatInterface.tsx** - Learn React state management
2. **server/index.js** - Learn Express API creation
3. **routes.tsx** - Learn React Router setup

### Learning Path:

```
Beginner:
  └─> Modify welcome message in ChatInterface.tsx
      └─> Add new quick action button
          └─> Customize system context in server/index.js

Intermediate:
  └─> Add message history persistence
      └─> Implement typing indicator animation
          └─> Add file upload capability

Advanced:
  └─> Stream responses from Gemini
      └─> Add user authentication
          └─> Deploy to Firebase
```

---

Want to understand a specific part deeper? Check the code comments in each file!
