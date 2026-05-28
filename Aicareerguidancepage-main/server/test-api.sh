#!/bin/bash

echo ""
echo "🧪 Testing BC CourseFinder™ Gemini API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if server is running
echo "1️⃣  Checking if server is running..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "   ✅ Server is running"
else
    echo "   ❌ Server is not running"
    echo "   💡 Start the server with: pnpm start"
    exit 1
fi

# Test health endpoint
echo ""
echo "2️⃣  Testing health endpoint..."
health_response=$(curl -s http://localhost:3001/api/health)
echo "   Response: $health_response"

# Check if API key is configured
if echo "$health_response" | grep -q '"hasApiKey":true'; then
    echo "   ✅ API key is configured"
else
    echo "   ❌ API key is not configured"
    echo "   💡 Run: bash setup-gemini.sh"
    exit 1
fi

# Test chat endpoint
echo ""
echo "3️⃣  Testing chat endpoint with sample question..."
chat_response=$(curl -s -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Belgium Campus?"}')

if echo "$chat_response" | grep -q '"response"'; then
    echo "   ✅ Chat endpoint is working"
    echo ""
    echo "   📝 AI Response:"
    echo "$chat_response" | grep -o '"response":"[^"]*"' | sed 's/"response":"//;s/"$//' | fold -w 70 -s | sed 's/^/      /'
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ All tests passed! Gemini API is working correctly."
    echo ""
else
    echo "   ❌ Chat endpoint failed"
    echo "   Error: $chat_response"
    exit 1
fi
