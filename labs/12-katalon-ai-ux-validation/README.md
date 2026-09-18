# Lab 12: QA UX Validation in Katalon Studio with the Katalon AI Assistant

**Scenario:** Your QA team uses **Katalon Studio** to validate the **deployed** Photo Gallery
against Jira work items before Production signoff. In this lab you'll use Katalon's built-in,
Copilot-style **Katalon AI Assistant** to turn a work item into test cases, generate the
automation from natural language, run it against the deployed app, catch a defect, and file it —
all focused on the **user experience**, not the source code.

**Estimated Time:** ~60 minutes

> **This lab is code-light and black-box.** You validate a *deployed* URL against acceptance
> criteria. Katalon happens to script in Groovy, but the AI Assistant writes most of it for you and
> the focus is observable UX. **No language picker.**

> ℹ️ **Naming, so nobody is misled:** Katalon Studio's *integrated* AI is the **Katalon AI
> Assistant** (previously **StudioAssist**) — Katalon's own Copilot-style assistant inside the IDE.
> It is **not** GitHub Copilot. It runs on the built-in **Katalon AI Service** (with a Katalon
> Studio Enterprise license) or on **your own provider key** (OpenAI, Azure OpenAI, Google Gemini,
> AWS Bedrock, or an OpenAI-compatible service). This lab uses that assistant as the "Copilot in
> Katalon." Where a step maps to a broader Katalon **True Platform** AI feature (e.g., Test Case
> Generator, Bug Reporter), it's called out.

> 📚 **Sources (verified):** [Katalon AI Assistant Overview](https://docs.katalon.com/katalon-studio/studioassist/studioassist-overview)
> (docs "Last updated: August 2026") and [Katalon AI](https://katalon.com/ai-powered-testing-platform).
> Katalon evolves quickly — confirm shortcuts and feature names against the docs for your installed
> version before delivering.

## 🎫 What you'll validate against

Your "Jira board" is the [`jira-examples/`](../../jira-examples/README.md) folder. This lab uses:

- [GAL-101 · Live search](../../jira-examples/GAL-101-live-search.md) — the happy-path story.
- [GAL-502 · Search XSS](../../jira-examples/GAL-502-bug-search-xss.md) — the planted **defect** to catch.
- [GAL-104 · Pagination](../../jira-examples/GAL-104-pagination-infinite-scroll.md) — the take-home.

## What You'll Learn
By the end of this lab, you will:
- [ ] Configure the **Katalon AI Assistant** (Katalon AI Service *or* a personal provider key)
- [ ] Use **Ask mode** and **Agent mode** (MCP-powered) to turn a work item into structured test cases
- [ ] Generate Katalon test steps from a natural-language comment with **inline Generate code**
- [ ] Run the check against the **deployed** app and let **AI Self-Healing** absorb locator drift
- [ ] Catch a defect and file it (Katalon **Bug Reporter** → Jira/ADO, or manual)
- [ ] Use **AI Failure Troubleshoot / Root Cause Analyzer**, then produce a Go/No-Go signoff
- [ ] Know the **limits** — AI can hallucinate keywords; a human owns Production signoff

## ⚙️ Setup

### 1. Prerequisites
- **Katalon Studio Enterprise (KSE)** — required to use the built-in **Katalon AI Service** with no
  API key. *Or* Katalon Studio with a **personal API key** from a supported provider configured in
  **Katalon AI Assistant Preferences**. (Per the docs, log in via **cloud authentication**;
  License Server logins don't support the AI Assistant.)
- The Photo Gallery **deployed** to a test environment. Set a target URL you'll reuse:
  ```text
  BASE_URL = https://<your-deployed-gallery>      # staging / UAT
  ```
  > 🛟 **No deployment for the class?** Serve a local production build as a stand-in:
  > `npm run build && npm start` → `BASE_URL = http://localhost:3000`.

### 2. Open the assistant
The **Katalon AI Assistant** panel opens automatically on the right when Katalon Studio starts.
Otherwise click the **Katalon AI Assistant** icon in the **main toolbar**, or press **`Ctrl`+`Shift`+`N`** (Windows) /
**`^`+`⌥`+`N`** (macOS).

### 3. (Recommended) Enable MCP servers for Agent mode
Agent mode acts through **MCP servers**. Built-in: *Katalon MCP*, *Katalon Studio MCP*, *Katalon
True Platform MCP*. For this scenario, also consider the external servers the docs list:
- **Atlassian MCP** — lets the assistant **fetch the Jira requirement** directly.
- **Chrome DevTools MCP** — lets the assistant **interact with the web page** under test.

> **✅ Checkpoint:** The AI Assistant panel is open, a provider is configured (Katalon AI Service or
> your key), and you can send a message in **Ask mode** and get a reply.

## 🧩 The stages

| Stage | Focus | Katalon feature | ~Time |
| ----- | ----- | --------------- | ----- |
| 1 🎯 | Work item → test cases | Ask/Agent mode (+ Atlassian MCP), Test Case Generator | 12 min |
| 2 🎯 | Generate the UX steps | Inline **Generate code** in the Script tab | 12 min |
| 3 🎯 | Run vs. acceptance criteria | Execution + **AI Self-Healing** | 12 min |
| 4 🎯 | Catch & file the defect (GAL-502) | **Bug Reporter** (Jira/ADO) or manual | 12 min |
| 5 🧗 | Diagnose & sign off | **AI Failure Troubleshoot / Root Cause Analyzer** | 12 min |
| — | **Ship it** | Attach report + defect to the work item | — |

---

## 🎯 Stage 1: Turn the work item into test cases (12 min)

Open [GAL-101](../../jira-examples/GAL-101-live-search.md). In the **Katalon AI Assistant**:

- **Ask mode** (paste the criteria):
  > "Here are the acceptance criteria for GAL-101 (live gallery search). Produce a set of **manual
  > test cases** for validating the deployed UX: happy path, plus edge cases (empty query,
  > whitespace-only, no-match, share-URL-then-reload). For each, give steps and the **observable**
  > expected result. Don't assume implementation details."

- **Agent mode + Atlassian MCP** (if configured): point the assistant at the ticket and ask it to
  generate structured test cases directly — mirroring Katalon's *Test Case Generator* use case
  ("turn a Jira/ADO ticket into test cases"). Review and refine what it drafts.

> **✅ Checkpoint:** You have structured test cases covering every GAL-101 scenario **plus** at least
> two edge cases, each with an observable expected result.

---

## 🎯 Stage 2: Generate the UX automation steps (12 min)

Katalon generates better code when the project is prepared. Per the docs, **first**:
1. Capture the elements you'll use (search box, a photo card) in the **Object Repository**.
2. Define any **variables** (e.g., `searchTerm = "portrait"`, `BASE_URL`).
3. List each action step with its target object.

Create a test case, switch to the **Script** tab, type a comment describing the flow, select it, and
press **`Ctrl`+`Alt`+`C`** (Windows) / **`^`+`⌥`+`C`** (macOS) to **Generate code**:

```groovy
// Open BASE_URL/gallery, type searchTerm into the "Search photos" box,
// verify a matching photo card is visible and a non-matching one is not,
// then confirm the URL contains the query after a reload.
```

Use **`Ctrl`+`Alt`+`E`** / **`^`+`⌥`+`E`** (**Explain code**) on anything you don't recognize.

> ⚠️ **Review before you run.** The docs warn the assistant can **hallucinate non-existent built-in
> keywords**. Verify each generated keyword exists and points at real Object Repository entries.

> **✅ Checkpoint:** A test case whose generated steps open the deployed gallery, search, and assert
> visible/hidden cards — reviewed by you, referencing real test objects.

---

## 🎯 Stage 3: Run against the acceptance criteria (12 min)

Run the test case against `BASE_URL`. Compare each result to GAL-101's criteria and record Pass/Fail.

- If a locator breaks because the deployed UI shifted, **AI Self-Healing** can detect and fix broken
  element locators **during execution** — note when it engages (self-healed locators still deserve a
  human glance).
- Re-run the edge cases (empty / whitespace / no-match / reload).

> **✅ Checkpoint:** A Pass/Fail verdict per GAL-101 scenario from a real run against the deployed
> app, with any self-healing events noted.

---

## 🎯 Stage 4: Catch and file the defect (12 min)

Now validate [GAL-502](../../jira-examples/GAL-502-bug-search-xss.md). Add a step (or a new test case)
that enters the search value `<img src=x onerror=alert(1)>` and a normal matching term, then observe
whether anything abnormal happens on screen (a script/alert, broken rendering). Judge only
observable behavior — if the experience is unsafe or broken, it **fails** GAL-502.

File the defect:
- **Katalon Bug Reporter** (True Platform): generates a detailed defect report from the failure and
  can file to **Jira or Azure DevOps** in one click. Review the AI-drafted report before submitting.
- **No Bug Reporter?** Use the manual [templates/manual-test-case.md](templates/manual-test-case.md)
  defect section, or the report template from
  [Lab 11](../11-qa-ux-validation/templates/bug-report.md).

> **✅ Checkpoint:** A filed (or drafted) **Critical** defect for GAL-502 with user-visible repro
> steps and evidence.

---

## 🧗 Stage 5 (Challenge): Diagnose and sign off (12 min)

Make a test fail (the GAL-502 step, or a deliberately wrong assertion) and run it. Then:

<details><summary>💡 Stuck? Reveal a hint</summary>

> - Use **AI Failure Troubleshoot** on the failed test case to get a plain-language diagnosis, and/or
>   **Root Cause Analyzer** to pinpoint the underlying cause and suggested fix.
> - In the HTML/email report, **AI Failure Analysis** reads the stack trace and explains the failure.
> - Then assemble a **QA validation report** (reuse
>   [Lab 11's template](../11-qa-ux-validation/templates/qa-validation-report.md)): per-ticket
>   Pass/Fail, the linked defect, and a **Go / No-Go** recommendation with a **human QA lead** as the
>   approver of record. GAL-101 Pass + GAL-502 Fail ⇒ **No-Go** until fixed.

</details>

> **✅ Checkpoint:** An AI-assisted failure diagnosis plus a completed signoff report ending in an
> explicit, human-approved Go/No-Go.

---

## 🚀 Ship it

QA attaches **evidence to the work item**:
1. Save your test cases, run report, and validation report as artifacts.
2. File the GAL-502 defect on the ticket (Bug Reporter one-click, or manual).
3. Post a concise QA status: what was validated, the verdict, and the blocking defect.

## ✅ Completion Checklist

- [ ] Configured the Katalon AI Assistant (Katalon AI Service or personal key)
- [ ] Generated structured test cases from GAL-101 (+ edge cases)
- [ ] Generated and **reviewed** UX automation steps via inline Generate code
- [ ] Ran against the **deployed** app; noted any AI Self-Healing
- [ ] Caught GAL-502 and filed a defect (Bug Reporter or manual)
- [ ] Used AI Failure Troubleshoot / Root Cause Analyzer and produced a **Go/No-Go** report

## 🏁 What's Next?

You've run the QA gate inside Katalon Studio: **work item → AI-generated test cases → deployed run →
defect → signoff**, with the Katalon AI Assistant doing the heavy lifting and a human owning the
decision.

### 🌟 Take-home challenge

Validate [GAL-104 · Pagination](../../jira-examples/GAL-104-pagination-infinite-scroll.md) in Katalon —
including the edge case that clicking **"Load More Photos" twice quickly must not duplicate a card**. Try
Katalon's **Visual Tester** to check the grid renders correctly, and add the result to your report.

> **Guardrails (from Katalon's own docs):** the assistant may generate **non-existent built-in
> keywords** — always review before running; complex scenarios may need Groovy debugging skills; and
> AI output (including a Go/No-Go) is **advisory** — a human QA lead owns Production signoff. See
> [FACILITATOR.md](FACILITATOR.md).
