// ===============================
// Launchioo Full Rule Coverage Test
// Purpose: trigger ALL detection rules
// DO NOT USE IN PRODUCTION
// ===============================

// RULE: console-log (Low)
console.log("debug log");

// RULE: debugger (Medium)
debugger;

// RULE: eval (Critical)
eval("console.log('xss')");

// RULE: api-key (Critical)
const apiKey = "sk_live_1234567890";

// RULE: github-token (Critical)
const githubToken = "ghp_1234567890abcdef1234567890abcdef";

// RULE: jwt-token (Critical)
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload.signature";

// RULE: command-injection (Critical)
const { exec } = require("child_process");
const userInput = process.argv[2];
exec("ping " + userInput);

// RULE: insecure-http (High → Critical in auth context)
fetch("http://example.com/api/data");
fetch("http://auth.example.com/login");

// RULE: inner-html (High)
document.body.innerHTML = "<div>" + userInput + "</div>";

// RULE: document-write (High)
document.write(userInput);

// RULE: insert-adjacent-html (High)
element.insertAdjacentHTML("beforeend", userInput);

// RULE: unsafe-dom-sink
element.innerHTML = userInput;

// RULE: weak-randomness (Medium → High/Critical depending context)
const id = Math.random();

// RULE: weak-crypto (Medium/Critical)
const md5 = require("crypto").createHash("md5").update("test").digest("hex");

// RULE: auth-bypass pattern (Critical)
const isAdmin = false;
if (isAdmin || true) {
  console.log("bypass triggered");
}

// RULE: localStorage token storage (High)
localStorage.setItem("token", jwtToken);

// RULE: environment secret leak (Critical)
console.log(process.env.GITHUB_TOKEN);

// RULE: insecure redirect pattern (High)
window.location = "http://evil.com";

// RULE: unsafe eval alternative pattern (should still flag contextually)
setTimeout("alert('xss')", 1000);

// RULE: prototype pollution hint (High/Critical depending engine)
obj["__proto__"]["polluted"] = true;

// RULE: open redirect / injection pattern
const redirect = userInput;
window.location.href = redirect;

// RULE: unsafe regex (Medium)
new RegExp(userInput);

// RULE: sensitive logging (High)
console.log("JWT:", jwtToken);
console.log("API KEY:", apiKey);

// RULE: insecure cookie handling (High)
document.cookie = "session=" + jwtToken;

// RULE: fetch without HTTPS (should flag HTTP)
fetch("http://insecure.example.com/data");

// RULE: suspicious dynamic function execution
const fn = new Function("return process.env")();
fn();
