/**
 * BC CourseFinder™ Setup Checker
 * Run this before starting the server to verify everything is configured correctly
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔍 BC CourseFinder™ Setup Checker\n');
console.log('━'.repeat(50));

let hasErrors = false;

// Check 1: .env file exists
console.log('\n1️⃣  Checking for .env file...');
const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  console.log('   ✅ .env file found');
  
  // Check 2: .env contains API key
  console.log('\n2️⃣  Checking Gemini API key...');
  const envContent = readFileSync(envPath, 'utf8');
  
  if (envContent.includes('GEMINI_API_KEY=')) {
    const apiKeyLine = envContent.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
    const apiKey = apiKeyLine.split('=')[1]?.trim();
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === '') {
      console.log('   ❌ API key not configured');
      console.log('   💡 Edit server/.env and add your Gemini API key');
      console.log('   💡 Get your key from: https://aistudio.google.com/app/apikey');
      hasErrors = true;
    } else {
      console.log('   ✅ API key is configured');
      console.log(`   🔑 Key: ${apiKey.substring(0, 10)}...`);
    }
  } else {
    console.log('   ❌ GEMINI_API_KEY not found in .env');
    hasErrors = true;
  }
} else {
  console.log('   ❌ .env file not found');
  console.log('   💡 Copy .env.example to .env: cp .env.example .env');
  hasErrors = true;
}

// Check 3: node_modules exists
console.log('\n3️⃣  Checking dependencies...');
const nodeModulesPath = join(__dirname, 'node_modules');
if (existsSync(nodeModulesPath)) {
  console.log('   ✅ Dependencies installed');
} else {
  console.log('   ❌ Dependencies not installed');
  console.log('   💡 Run: npm install');
  hasErrors = true;
}

// Check 4: Required packages
console.log('\n4️⃣  Checking required packages...');
try {
  const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));
  const required = ['express', 'cors', '@google/generative-ai', 'dotenv'];
  const missing = required.filter(pkg => !packageJson.dependencies?.[pkg]);
  
  if (missing.length > 0) {
    console.log(`   ❌ Missing packages: ${missing.join(', ')}`);
    console.log('   💡 Run: npm install');
    hasErrors = true;
  } else {
    console.log('   ✅ All required packages present');
  }
} catch (error) {
  console.log('   ⚠️  Could not verify packages');
}

// Final verdict
console.log('\n' + '━'.repeat(50));
if (hasErrors) {
  console.log('\n❌ Setup incomplete. Please fix the issues above.\n');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed! You\'re ready to start the server.\n');
  console.log('   Run: npm start\n');
  process.exit(0);
}
