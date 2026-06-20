// LOW SEVERITY

console.log("Debug log left in production");

const unusedVariable = "not used anywhere";


// MEDIUM SEVERITY

debugger;

console.trace("Tracing execution");


// FIXME: remove before production
// TODO: replace temporary implementation


// CRITICAL SEVERITY

eval("console.log('unsafe')");

const apiKey = "sk_live_12345678901234567890";

const githubToken = "ghp_123456789012345678901234567890123456";

const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.signature";


// Command injection example

const { exec } = require("child_process");

const userInput = process.argv[2];

exec("ping " + userInput);


// Weak crypto

const crypto = require("crypto");

crypto.createHash("md5").update("password").digest("hex");

crypto.createHash("sha1").update("password").digest("hex");


// HIGH SEVERITY

document.body.innerHTML =
  "<div>" + userInput + "</div>";

document.write(userInput);

element.insertAdjacentHTML(
  "beforeend",
  userInput
);


// Insecure HTTP

fetch("http://api.example.com/user-data");


// Weak randomness

Math.random();


// Fake auth bypass

const isAdmin = true;

if (isAdmin) {
  console.log("Access granted");
}
