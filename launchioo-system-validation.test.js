// ==================================================
// Launchioo System Validation Suite (CALIBRATION)
// Purpose: verify detection + reduce false positives
// ==================================================


// ==========================
// 1. SAFE CONFIGURATION (NO SECRETS)
// ==========================

const config = {
  apiKey: process.env.API_KEY, // SAFE: env-based secret
  githubToken: process.env.GITHUB_TOKEN,
  webhook: "https://secure.example.com/webhook",
};

function getApiKey() {
  return process.env.API_KEY;
}


// ==========================
// 2. AUTH — SAFE PATTERNS
// ==========================

// SAFE: explicit deny-by-default auth
function checkAuth(user) {
  if (!user) return false;
  if (user.role === "admin") return true;
  return false;
}

// SAFE: RBAC with explicit mapping
const roles = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

function canAccess(user, action) {
  const permissions = roles[user.role] || [];
  return permissions.includes(action);
}


// ==========================
// 3. SSRF — SAFE vs UNSAFE CALIBRATION
// ==========================

// SAFE: allowlisted fetch (should NOT trigger SSRF)
const ALLOWED_DOMAINS = ["api.example.com"];

async function safeFetch(url) {
  const parsed = new URL(url);
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    throw new Error("Blocked domain");
  }
  return fetch(url);
}

// UNSAFE TEST CASE (EXPECTED DETECTION)
function unsafeFetch(req) {
  return fetch(req.query.url);
}


// ==========================
// 4. HTTP / HTTPS RULES
// ==========================

// SAFE HTTPS usage
fetch("https://api.example.com/data");

// UNSAFE TEST (expected flag)
fetch("http://insecure.example.com/data");


// ==========================
// 5. WEBSOCKET RULES
// ==========================

// SAFE
new WebSocket("wss://secure.example.com/socket");

// UNSAFE TEST
new WebSocket("ws://example.com/socket");


// ==========================
// 6. REDIRECT SAFETY
// ==========================

// SAFE redirect
function redirectTo(url) {
  const allowed = ["https://app.example.com"];
  if (!allowed.includes(url)) return;
  window.location = url;
}

// UNSAFE TEST
window.location = "http://evil.com/login";


// ==========================
// 7. XSS / DOM SAFETY
// ==========================

// SAFE rendering (should NOT flag)
function renderSafe(userInput) {
  const el = document.createElement("div");
  el.textContent = userInput;
  document.body.appendChild(el);
}

// UNSAFE (expected detection)
function renderUnsafe(userInput) {
  document.body.innerHTML = "<div>" + userInput + "</div>";
}


// ==========================
// 8. TAINT FLOW VALIDATION
// ==========================

// SAFE sanitized flow
function safeTaint(userInput) {
  const cleaned = sanitize(userInput);
  return document.createTextNode(cleaned);
}

// UNSAFE taint flow (expected detection)
function unsafeTaint(userInput) {
  const cleaned = sanitize(userInput);
  document.body.innerHTML = cleaned;
}


// ==========================
// 9. COMMAND INJECTION CONTROL
// ==========================

// SAFE
const { execFile } = require("child_process");

execFile("ping", ["127.0.0.1"]);

// UNSAFE (expected detection)
const { exec } = require("child_process");
exec("ping " + userInput);


// ==========================
// 10. DEPENDENCY RISK SIMULATION
// ==========================

// SAFE: pinned dependency
const pkg = "express@4.18.2";

// UNSAFE patterns (should be detected)
const gitDep = "git+https://github.com/user/repo.git";
const unpinned = "lodash:*";


// ==========================
// 11. CRYPTO CONTEXT SCORING
// ==========================

// SAFE (non-security usage)
const uiId = Math.random().toString(36);

// UNSAFE (auth context simulation)
function generateSessionToken() {
  return Math.random().toString(36);
}


// ==========================
// 12. SSRF EDGE CASE (REDIRECT CHAIN)
// ==========================

function loadFromConfig() {
  const url = "http://config.internal/api";
  return fetch(url);
}


// ==========================
// END OF SYSTEM VALIDATION
// ==========================
