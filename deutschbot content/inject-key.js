/**
 * inject-key.js — Netlify build script
 * Injects DEUTSCHBOT_GEMINI_KEY env var into index.html at build time.
 * Run via netlify.toml: command = "node inject-key.js"
 *
 * Setup:
 *   1. Netlify dashboard → Site settings → Environment variables
 *   2. Add: DEUTSCHBOT_GEMINI_KEY = AIza... (your Gemini key from aistudio.google.com)
 *   3. Push to Git / trigger deploy — key is injected automatically.
 *   4. Share your Netlify URL — users get instant access, no setup needed.
 */
const fs  = require('fs');
const key = process.env.DEUTSCHBOT_GEMINI_KEY || '';

// Rename the source file to index.html if needed
const src = fs.existsSync('DeutschBot-v13.html') ? 'DeutschBot-v13.html' : 'index.html';
let html  = fs.readFileSync(src, 'utf8');

if (key) {
  // Replace the placeholder token with the actual key string
  html = html.replace(
    "? __NETLIFY_GEMINI_KEY__",
    `? '${key}'`
  );
  console.log(`✅ API key injected (${key.slice(0,8)}…)`);
} else {
  console.log('⚠️  DEUTSCHBOT_GEMINI_KEY not set — key injection skipped.');
  console.log('   Users will need to configure the app, or set the env var in Netlify dashboard.');
}

fs.writeFileSync('index.html', html);
console.log(`✅ index.html written (${Math.round(html.length/1024)}KB)`);
