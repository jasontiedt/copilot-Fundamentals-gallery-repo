# Facilitator Guide — Lab 12: QA UX Validation in Katalon Studio

For the **instructor**. This lab teaches QA teams to validate a **deployed** app against Jira work
items using **Katalon Studio's built-in Katalon AI Assistant** (its Copilot-style assistant,
formerly StudioAssist). It is code-light and black-box — the focus is user experience.

> All Katalon feature claims below are drawn from the
> [Katalon AI Assistant Overview](https://docs.katalon.com/katalon-studio/studioassist/studioassist-overview)
> (docs "Last updated: August 2026") and the [Katalon AI platform page](https://katalon.com/ai-powered-testing-platform).
> **Re-verify against the docs for the version you install** — Katalon ships fast and renames features.

## 🎯 Naming: set expectations up front

Attendees may expect literal **GitHub Copilot** inside Katalon. Clarify in the first two minutes:

- Katalon Studio's integrated assistant is the **Katalon AI Assistant** (was **StudioAssist**).
- It runs on the **Katalon AI Service** (needs a **KSE** license) **or** a **personal provider key**
  (OpenAI, Azure OpenAI, Google Gemini, AWS Bedrock, or OpenAI-compatible).
- It is a Copilot-*style* assistant, not the GitHub Copilot product. Everything in this lab uses the
  Katalon assistant.

## 🧰 Pre-flight (before the session)

1. **Licensing/accounts:** ensure each attendee has **KSE** (built-in AI Service) **or** a configured
   personal API key. Remind them to **log in via cloud authentication** — the docs state License
   Server logins don't support the AI Assistant.
2. **Katalon version:** install a version at/after your target. Response streaming needs **11.4.0+**;
   Agent mode/MCP needs a current provider **API version** (legacy versions won't call MCP tools).
3. **Deployed target:** publish the gallery to staging/UAT and distribute one `BASE_URL`. Fallback:
   local production build (`npm run build && npm start` → `http://localhost:3000`).
4. **MCP (optional but recommended):** pre-enable **Atlassian MCP** (fetch Jira requirements) and
   **Chrome DevTools MCP** (interact with the page). If you can't, Stages 1–4 still work via Ask mode
   and manual authoring.
5. **Object Repository prep:** the docs are explicit — generated scripts fail when objects/variables
   are undefined. Pre-capture the **Search photos** box and a photo card, and define `BASE_URL` /
   `searchTerm`, or budget class time for it in Stage 2.
6. **GAL-502 defect:** assumes the deployed build still contains the search-highlight XSS. If it's
   already fixed in your environment, treat Stage 4 as "confirm the fix" (a Pass, no defect filed).

## ⏱️ Timing (≈60 min)

| Segment | Time | Notes |
| ------- | ---- | ----- |
| Framing + naming + setup | 8 min | The Copilot-vs-Katalon-AI clarification; confirm the assistant answers in Ask mode |
| Stage 1 — test cases | 12 min | Ask mode works for everyone; Agent+Atlassian MCP is the "wow" if configured |
| Stage 2 — generate steps | 12 min | Enforce Object Repository prep first; stress **review before run** |
| Stage 3 — run | 12 min | Point out AI Self-Healing when a locator drifts |
| Stage 4 — defect | 12 min | Everyone files one; Bug Reporter → Jira/ADO or manual |
| Stage 5 + wrap | 4 min | Failure Troubleshoot / Root Cause Analyzer, then the signoff verdict |

## ✅ Answer key

- **GAL-101** should **Pass** on a healthy deployed build. If it fails, check seeded data (need a
  clearly matching and a clearly non-matching photo, e.g., "Portrait Study" vs "Sunset Landscape").
- **GAL-502** should **Fail** — the payload executes/opens an alert when highlighted. Every attendee
  files a **Critical** defect.
- **Signoff:** GAL-101 Pass + GAL-502 Fail ⇒ **No-Go** until the defect is fixed and re-validated.

## 🛟 Troubleshooting (mapped to Katalon's documented issues)

- **Assistant unavailable:** not on KSE, or logged in via License Server → upgrade / use cloud auth.
- **Agent mode not calling MCP tools:** legacy provider API version → update the API version.
- **Error `{"code":8}` (Katalon AI Service):** input too large / usage limit → clear the conversation,
  disable auto-include project context, or split the prompt.
- **`Session not active` / `invalid_grant`:** logged in on multiple devices → log out everywhere, back in.
- **Generated script fails immediately:** undefined objects/variables → capture objects, define
  variables, list steps (Stage 2 prep) before regenerating.

## 💬 Discussion prompts

- **"AI can hallucinate keywords."** The docs call this out explicitly. Reinforce the habit: review
  every generated keyword and locator before running. This is a QA lab — verification is the point.
- **"Who signs off?"** Katalon's own messaging: *humans are accountable for every release; AI
  decisions must be explainable.* The Go/No-Go is advisory; a human QA lead approves.
- **"Where's the time saved?"** Ticket-to-test-cases (Katalon cites 30–60 min → under 2 min), step
  generation, self-healing maintenance, and AI-drafted defect reports — not judgment or signoff.
- **Katalon AI Assistant vs. GitHub Copilot + Playwright (Lab 11):** same QA philosophy (black-box,
  deployed, evidence-driven, human-approved), different toolchain. Discuss when each fits a team.

## 🔗 Related

- [Lab 11 — QA UX Validation (Copilot + Playwright MCP)](../11-qa-ux-validation/README.md): the same
  scenario in VS Code with GitHub Copilot; reuse its report/bug templates here.
- [jira-examples/](../../jira-examples/README.md): the work items validated in both labs.
