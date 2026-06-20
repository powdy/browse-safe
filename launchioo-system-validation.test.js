/**
 * Launchioo System Validation Test
 * Purpose: Full rule coverage + context-aware severity verification
 */

// ==================================================
// 1. SECRETS / AUTH FLOW
// ==================================================

const apiKey = "sk_live_test_1234567890";
const githubToken = "ghp_test_1234567890abcdef";
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature";

// weak cookie configuration
document.cookie = "session=abc123; Secure=false; HttpOnly=false; SameSite=None";

// weak auth pattern (should trigger auth bypass rule)
function checkAuth(user) {
  if (user.role) return true;
  return false;
}

// ==================================================
// 2. USER INPUT FLOW (TAINT SOURCE TESTS)
// ==================================================

const userInput = process.argv[2];
const req = {
  query: { url: userInput },
  body: { url: userInput },
  headers: { referer: userInput },
};

// ==================================================
// 3. SSRF TESTS (CRITICAL ENGINE CHECK)
// ==================================================

fetch(req.query.url);
fetch(userInput);
axios.get(req.body.url);
http.request(req.query.url);

function loadRemote(url) {
  return fetch(url);
}

loadRemote(req.query.url);

// SSRF with config object
const endpoint = req.body.url;
fetch(endpoint);

// internal metadata target
fetch("http://169.254.169.254/latest/meta-data");

// ==================================================
// 4. NETWORK SECURITY TESTS
// ==================================================

fetch("http://insecure.example.com/data");
axios.get("http://api.example.com/user");
http.request("http://internal.local/admin");

// websocket insecure
const socket = new WebSocket("ws://example.com/socket");

// redirect chain risk
window.location = "http://evil.com/login";
location.href = "http://phishing.com";

// ==================================================
// 5. XSS / DOM SINKS
// ==================================================

document.body.innerHTML = "<div>" + userInput + "</div>";

document.write(userInput);

element.insertAdjacentHTML("beforeend", userInput);

// sanitized but still tainted (important for taint tracking)
const cleaned = sanitize(userInput);
document.body.innerHTML = cleaned;

// ==================================================
// 6. COMMAND INJECTION TESTS
// ==================================================

const { exec } = require("child_process");

exec("ping " + userInput);
exec(`curl ${req.query.url}`);

function run(cmd) {
  return exec(cmd);
}

run("ls " + userInput);

// ==================================================
// 7. CRYPTO / RANDOMNESS TESTS
// ==================================================

// should vary severity depending on context
const sessionToken = Math.random().toString(36);
const uiNoise = Math.random();

// weak hash simulation
const md5Like = "md5(" + userInput + ")";

// ==================================================
// 8. DEPENDENCY / SUPPLY CHAIN TESTS
// ==================================================

const dep1 = "git+http://github.com/private/repo.git";
const dep2 = "npm install some-package";
const dep3 = "package-name@*";

// ==================================================
// 9. CSRF / STATE CHANGE TESTS
// ==================================================

fetch("/api/deleteUser", {
  method: "POST",
  body: JSON.stringify({ id: userInput }),
});

// missing CSRF token intentionally
axios.post("/api/updateProfile", {
  name: userInput,
});

// ==================================================
// 10. CONTEXT VARIATION TEST (IMPORTANT)
// ==================================================

// SAME PATTERN DIFFERENT CONTEXTS

// SHOULD BE HIGH (non-auth)
fetch("http://public-api.com/data");

// SHOULD BE CRITICAL (auth context)
fetch("http://internal-api.com/admin?token=" + userInput);

// SHOULD BE CRITICAL (network + auth combo)
fetch("http://auth.example.com/login?session=" + userInput);

// ==================================================
// 11. EDGE CASE: TAINED FLOW CHAIN
// ==================================================

function getUrl(u) {
  return u;
}

const chained = getUrl(req.query.url);
fetch(chained);

const chained2 = sanitize(getUrl(userInput));
exec("ping " + chained2);

// ==================================================
// 12. CONFIG-BASED ATTACK SURFACE
// ==================================================

const config = {
  webhook: "http://webhook.site/test",
  api: req.body.url,
  secret: apiKey,
};

fetch(config.api);

// ==================================================
// END OF SYSTEM VALIDATION
// ==================================================
