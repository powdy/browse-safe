// ============================================
// Launchioo FULL SECURITY COVERAGE TEST v2
// Purpose: validate ALL detection engines
// ============================================

// ==========================
// 1. SECRETS / TOKENS
// ==========================

const apiKey = "sk_live_1234567890_TEST";
const githubToken = "ghp_1234567890abcdef1234567890abcdef";
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.TEST.signature";

// hidden in object (tests deep scan)
const config = {
  secret: "sk_test_ABC123",
  webhook: "http://webhook.site/test",
};

// ==========================
// 2. HTTP / WS / NETWORK RISK
// ==========================

fetch("http://insecure.example.com/data");
axios.get("http://api.example.com/user");
http.request("http://internal.local/admin");

const socket1 = new WebSocket("ws://example.com/socket");

// redirect chain
window.location = "http://evil.com/login";
location.href = "http://phishing.com";

// config-based URL
const endpoint = "http://config-insecure.com/api";
fetch(endpoint);

// ==========================
// 3. SSRF VARIANTS
// ==========================

fetch(req.query.url);
fetch(userInput);
axios.get(req.body.url);

function loadUrl(url) {
  return fetch(url);
}

loadUrl(process.env.EXTERNAL_URL);

// SSRF via URL object
const u = new URL(userInput);
fetch(u.href);

// ==========================
// 4. COMMAND INJECTION
// ==========================

const { exec } = require("child_process");

exec("ping " + userInput);
exec(`curl ${req.query.host}`);

// indirect sink
function run(cmd) {
  return exec(cmd);
}

run("ls " + userInput);

// ==========================
// 5. XSS / DOM SINKS
// ==========================

document.body.innerHTML = "<div>" + userInput + "</div>";
document.write(userInput);

element.insertAdjacentHTML("beforeend", userInput);

unsafeDiv.innerHTML = sanitize(userInput); // taint still exists

// ==========================
// 6. AUTH BYPASS PATTERNS
// ==========================

function checkAuth(user) {
  if (user.role) return true; // weak auth
}

function isAdmin(user) {
  return user.isAdmin == true || user;
}

// ==========================
// 7. COOKIE MISCONFIG
// ==========================

document.cookie =
  "session=abc123; Path=/; HttpOnly=false; Secure=false; SameSite=None";

// ==========================
// 8. CSRF PATTERNS
// ==========================

fetch("/transfer-money", {
  method: "POST",
  credentials: "include",
  body: JSON.stringify({ amount: 1000 }),
});

// missing CSRF token usage simulation
axios.post("/api/updateProfile", { name: userInput });

// ==========================
// 9. WEAK CRYPTO (CONTEXT TEST)
// ==========================

const id = Math.random(); // should NOT always be critical

const token = Math.random().toString(36); // suspicious

// crypto misuse
const hash = require("crypto").createHash("md5").update(userInput).digest("hex");

// ==========================
// 10. REDIRECT / OPEN REDIRECT
// ==========================

function redirect(url) {
  window.location = url;
}

redirect(userInput);

window.location.href = req.query.next;

// ==========================
// 11. DEPENDENCY / SUPPLY CHAIN SIGNALS
// ==========================

// insecure install patterns (simulated)
const dep1 = "git+http://github.com/private/repo.git";
const dep2 = "http://malicious-cdn.com/package.tgz";

// unpinned dependency simulation
const dependency = "*";

// ==========================
// 12. TAINT FLOW COMPLEX PATHS
// ==========================

const input = req.body.input;

const step1 = input;
const step2 = step1;
const step3 = step2;

eval(step3);
exec(step3);
document.body.innerHTML = step3;

// ==========================
// 13. ADVANCED INJECTION CHAINS
// ==========================

const payload = req.query.q;

function transform(x) {
  return x;
}

const result = transform(payload);

fetch(result);
