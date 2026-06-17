// launchioo-security-smoke-test.js

console.log("debug: starting test"); // LOW violation

function test() {
  debugger; // MEDIUM violation

  eval("console.log('this is unsafe')"); // CRITICAL violation

  const apiKey = "sk_live_1234567890_SECRET"; // CRITICAL violation

  const githubToken = "ghp_abcdefghijklmnopqrstuvwxyz123456"; // CRITICAL violation

  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token"; // CRITICAL violation

  document.body.innerHTML = "<h1>Unsafe HTML injection</h1>"; // HIGH violation

  console.log("finished test"); // LOW violation
}

test();
