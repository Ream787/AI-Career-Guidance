# 📚 Documentation Index

Complete guide to all documentation for BC CourseFinder™.

## 🚀 Getting Started (Read First!)

Choose your path based on experience level:

### 👶 Complete Beginner
Start here if this is your first time:
1. **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
2. **[VSCODE-GUIDE.md](VSCODE-GUIDE.md)** - How to use VS Code
3. **[README.md](README.md)** - Full project overview

### 👨‍💻 Have Some Experience
If you know React/Node basics:
1. **[SETUP.md](SETUP.md)** - Quick 5-minute setup
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** - How it all works
3. **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Make it your own

### 🏆 Advanced Developer
Skip to the good stuff:
1. **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design
2. **[server/README.md](server/README.md)** - Backend details
3. **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Advanced features

---

## 📖 All Documentation Files

### Essential Documents

| File | Purpose | Read Time | When to Read |
|------|---------|-----------|--------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Get up and running fast | 3 min | First time setup |
| **[README.md](README.md)** | Complete project guide | 10 min | Understanding the project |
| **[SETUP.md](SETUP.md)** | Detailed setup steps | 5 min | Setting up locally |

### VS Code Specific

| File | Purpose | Read Time | When to Read |
|------|---------|-----------|--------------|
| **[VSCODE-GUIDE.md](VSCODE-GUIDE.md)** | How to use VS Code for this project | 8 min | Learning VS Code |
| **[.vscode/tasks.json](.vscode/tasks.json)** | Pre-configured VS Code tasks | - | Reference |

### Technical Documentation

| File | Purpose | Read Time | When to Read |
|------|---------|-----------|--------------|
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System design & data flow | 12 min | Understanding the code |
| **[server/README.md](server/README.md)** | Backend server documentation | 7 min | Working with the API |

### Customization & Advanced

| File | Purpose | Read Time | When to Read |
|------|---------|-----------|--------------|
| **[CUSTOMIZATION.md](CUSTOMIZATION.md)** | How to customize the app | 15 min | Making changes |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Contribution guidelines | 5 min | Contributing to project |

---

## 🎯 Use Case Scenarios

### "I'm totally new to this project"
```
1. Read: QUICKSTART.md
2. Do: Follow the 3-step setup
3. Read: VSCODE-GUIDE.md (while app is running)
4. Do: Test the chatbot
5. Read: CUSTOMIZATION.md (to make small changes)
```

### "I want to understand how it works"
```
1. Read: README.md (project overview)
2. Read: ARCHITECTURE.md (technical details)
3. Read: ChatInterface.tsx (frontend code)
4. Read: server/index.js (backend code)
```

### "I want to customize it"
```
1. Read: CUSTOMIZATION.md
2. Pick a customization from the guide
3. Make the change
4. Test it
5. Repeat!
```

### "I want to deploy to production"
```
1. Read: README.md → "Deploying to Production"
2. Read: server/README.md → "Moving to Firebase"
3. Set up Firebase project
4. Deploy backend to Cloud Functions
5. Deploy frontend to Firebase Hosting
```

### "Something's not working"
```
1. Check: QUICKSTART.md → "Troubleshooting"
2. Check: README.md → "Troubleshooting"
3. Check: VSCODE-GUIDE.md → "Debugging"
4. Run: npm run check (in server folder)
5. Check browser console (F12)
```

---

## 📁 File Organization

### Documentation Files
```
project-root/
├── README.md                 # Main project documentation
├── QUICKSTART.md            # Fast setup guide
├── SETUP.md                 # 5-minute setup
├── VSCODE-GUIDE.md          # VS Code instructions
├── ARCHITECTURE.md          # Technical architecture
├── CUSTOMIZATION.md         # How to customize
└── DOCUMENTATION-INDEX.md   # This file
```

### Code Files
```
project-root/
├── src/app/
│   ├── components/          # React components
│   └── pages/              # App pages
├── server/
│   ├── index.js            # Backend server
│   └── README.md           # Backend docs
└── .vscode/
    ├── tasks.json          # VS Code tasks
    └── extensions.json     # Recommended extensions
```

### Configuration Files
```
project-root/
├── package.json            # Frontend dependencies
├── vite.config.ts         # Vite configuration
├── server/
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables (create this)
│   └── .env.example       # Environment template
└── .gitignore             # Git ignore rules
```

---

## 🔍 Quick Reference

### Common Tasks

| Task | Documentation | Location |
|------|--------------|----------|
| First-time setup | QUICKSTART.md | Step 1-3 |
| Start servers | VSCODE-GUIDE.md | Method 1 or 2 |
| Get API key | QUICKSTART.md | Step 1 |
| Change colors | CUSTOMIZATION.md | Visual Customizations |
| Add quick actions | CUSTOMIZATION.md | Quick Customizations #2 |
| Understand data flow | ARCHITECTURE.md | Request Flow |
| Deploy to Firebase | README.md | Deploying to Production |
| Fix connection issues | README.md | Troubleshooting |

### Code Locations

| Feature | File | Line (approx) |
|---------|------|---------------|
| Welcome message | ChatInterface.tsx | ~30 |
| Quick action buttons | ChatInterface.tsx | ~19 |
| AI system context | server/index.js | ~16 |
| API endpoint | server/index.js | ~37 |
| Chat message styling | ChatMessage.tsx | ~15 |
| Color scheme | ChatInterface.tsx | Various |

---

## 💡 Learning Path

### Week 1: Get It Running
- [ ] Read QUICKSTART.md
- [ ] Complete setup
- [ ] Test the chatbot
- [ ] Read VSCODE-GUIDE.md

### Week 2: Understand It
- [ ] Read ARCHITECTURE.md
- [ ] Study ChatInterface.tsx
- [ ] Study server/index.js
- [ ] Understand request flow

### Week 3: Customize It
- [ ] Read CUSTOMIZATION.md
- [ ] Change welcome message
- [ ] Add new quick action
- [ ] Customize AI personality

### Week 4: Deploy It
- [ ] Set up Firebase account
- [ ] Deploy backend to Cloud Functions
- [ ] Deploy frontend to Hosting
- [ ] Share with friends!

---

## 🆘 Help & Support

### When You're Stuck

1. **Check the relevant documentation:**
   - Setup issue? → QUICKSTART.md or SETUP.md
   - VS Code issue? → VSCODE-GUIDE.md
   - Code issue? → ARCHITECTURE.md
   - Want to change something? → CUSTOMIZATION.md

2. **Run diagnostic tools:**
   ```bash
   cd server
   npm run check
   ```

3. **Check common issues:**
   - Is backend running? (Terminal 1)
   - Is frontend running? (Terminal 2)
   - Is API key configured? (server/.env)
   - Any errors in browser console? (F12)

4. **Read error messages carefully:**
   - Terminal output (backend errors)
   - Browser console (frontend errors)
   - Network tab (API errors)

---

## 📚 External Resources

### Learning the Technologies

- **React:** https://react.dev/learn
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Express.js:** https://expressjs.com/
- **Gemini API:** https://ai.google.dev/docs
- **VS Code:** https://code.visualstudio.com/docs

### Tools & Services

- **Get Gemini API Key:** https://aistudio.google.com/app/apikey
- **Firebase Console:** https://console.firebase.google.com/
- **Node.js Download:** https://nodejs.org/
- **VS Code Download:** https://code.visualstudio.com/

---

## 🎯 Next Steps

Now that you know where everything is:

1. **New to the project?**
   → Start with [QUICKSTART.md](QUICKSTART.md)

2. **Want to understand it?**
   → Read [ARCHITECTURE.md](ARCHITECTURE.md)

3. **Ready to customize?**
   → Follow [CUSTOMIZATION.md](CUSTOMIZATION.md)

4. **Need VS Code help?**
   → Check [VSCODE-GUIDE.md](VSCODE-GUIDE.md)

---

## 📝 Document Maintenance

Last Updated: March 2026
Version: 1.0.0

If you find any documentation issues:
- Check if the file has been updated
- Verify code examples still work
- Update this index if you add new docs

---

Happy Learning! 🚀
Built with ❤️ for Belgium Campus Students
