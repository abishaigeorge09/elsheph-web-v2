/* E2E checks for the form API routes against a running server.
   Usage: node scripts/test-forms.mjs [baseUrl]                            */
const base = process.argv[2] ?? "http://localhost:3000";
const old = Date.now() - 10_000;
const marker = `E2E-${Date.now()}`;

async function post(path, body) {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data = {};
  try {
    data = await res.json();
  } catch {}
  return { status: res.status, data };
}

const results = [];
function check(name, cond, detail) {
  results.push({ name, pass: cond, detail });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
}

/* 1. Valid contact submission → accepted (insert path exercised for real). */
let r = await post("/api/contact", {
  name: "Form Test",
  email: "test@example.com",
  message: `Automated end-to-end check ${marker}. Safe to delete.`,
  company: "",
  startedAt: old,
});
check("contact: valid accepted", r.status === 200 && r.data.ok === true, JSON.stringify(r.data));

/* 2. Honeypot filled → quiet 200, nothing stored (endpoint lies to bots). */
r = await post("/api/contact", {
  name: "Bot",
  email: "bot@example.com",
  message: "I am definitely human, here is my very long message.",
  company: "TotallyRealCo",
  startedAt: old,
});
check("contact: honeypot quietly swallowed", r.status === 200 && r.data.ok === true);

/* 3. Sub-3s submission → quiet 200, nothing stored. */
r = await post("/api/contact", {
  name: "Fast Bot",
  email: "fast@example.com",
  message: "Filled the whole form in under a second somehow.",
  company: "",
  startedAt: Date.now(),
});
check("contact: too-fast quietly swallowed", r.status === 200 && r.data.ok === true);

/* 4. Invalid email → 400 with a usable message. */
r = await post("/api/contact", {
  name: "Human",
  email: "not-an-email",
  message: "A perfectly reasonable message that is long enough.",
  company: "",
  startedAt: old,
});
check("contact: invalid email rejected", r.status === 400 && !!r.data.error, JSON.stringify(r.data));

/* 5. Valid university submission → accepted. */
r = await post("/api/university", {
  name: "Form Test",
  email: "test@example.com",
  university: "Test University",
  role: "Faculty Member",
  message: `Automated end-to-end check ${marker}. Safe to delete.`,
  company: "",
  startedAt: old,
});
check("university: valid accepted", r.status === 200 && r.data.ok === true, JSON.stringify(r.data));

/* 6. University honeypot → quiet 200. */
r = await post("/api/university", {
  name: "Bot",
  email: "bot@example.com",
  university: "Bot U",
  role: "Student",
  message: "Definitely a real inquiry from a real person here.",
  company: "spam",
  startedAt: old,
});
check("university: honeypot quietly swallowed", r.status === 200 && r.data.ok === true);

const failed = results.filter((x) => !x.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed. Marker: ${marker}`);
process.exit(failed ? 1 : 0);
