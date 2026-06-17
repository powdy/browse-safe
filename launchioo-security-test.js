// launchioo-security-test.js

// Should trigger console.log rule
console.log("Debug output");

// Should trigger debugger rule
debugger;

// Should trigger eval rule
eval("console.log('danger')");

// Should trigger innerHTML rule
document.body.innerHTML = "<div>Unsafe HTML</div>";

// Should trigger secret detection
const apiKey = "sk_live_123456789abcdef";

// Should trigger GitHub token detection
const githubToken = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";

// Should trigger JWT detection
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCJ9.signature";

export default function test() {
  return true;
}
