#!/bin/bash

echo ""
echo "🚀 BC CourseFinder™ - Gemini API Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file already exists"
    echo ""
    read -p "Do you want to update your API key? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
else
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
fi

echo ""
echo "🔑 To get your Gemini API key:"
echo "   1. Visit: https://aistudio.google.com/app/apikey"
echo "   2. Sign in with your Google account"
echo "   3. Click 'Create API Key'"
echo "   4. Copy your API key"
echo ""
read -p "Enter your Gemini API key: " api_key

if [ -z "$api_key" ]; then
    echo "❌ No API key provided. Setup cancelled."
    exit 1
fi

# Update .env file
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/GEMINI_API_KEY=.*/GEMINI_API_KEY=$api_key/" .env
else
    # Linux
    sed -i "s/GEMINI_API_KEY=.*/GEMINI_API_KEY=$api_key/" .env
fi

echo ""
echo "✅ API key saved to .env file"
echo ""
echo "🔍 Running setup check..."
echo ""

npm run check

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 All set! You can now start the server with:"
    echo "   npm start"
    echo ""
else
    echo ""
    echo "⚠️  There were some issues. Please review the errors above."
    echo ""
fi
