# Lab 11: QA UX Validation Against Work Items

**Scenario:** You're on the **QA team**. Development is done and the build is **deployed** to a test environment. Before you sign off for Production, you validate the *user experience* against the acceptance criteria in each Jira work item. You never touch the source code — you drive the **deployed app as a black box**. In this lab you'll use **GitHub Copilot** (Agent mode) with the **Playwright MCP** browser as your QA co-pilot: read a ticket, walk the deployed flow, capture evidence, file any defects, and produce a **Go / No-Go signoff package**.

**Estimated Time:** ~60 minutes

> **This lab is deliberately code-free.** QA here validates *behavior a user can observe*, not the implementation. There is **no language picker** — the gallery happens to be built in TypeScript, but nothing you do depends on that.

> **Recommended prerequisite:** [Lab 7 (E2E Playwright + MCP)](../07-e2e-playwright/README.md) so the Playwright MCP browser is already configured. Not required — a fallback is included.

## 🎫 What you'll validate against

Your "Jira board" is the [`jira-examples/`](../../jira-examples/README.md) folder in this repo. This lab uses:

- [GAL-101 · Live search](../../jira-examples/GAL-101-live-search.md) — the happy-path story you validate.
- [GAL-502 · Search XSS](../../jira-examples/GAL-502-bug-search-xss.md) — a planted **defect** you must catch.
- [GAL-104 · Pagination](../../jira-examples/GAL-104-pagination-infinite-scroll.md) — the take-home challenge.

## What You'll Learn
By the end of this lab, you will:
- [ ] Turn a work item's acceptance criteria into a **manual QA checklist** with Copilot
- [ ] Have Copilot **drive the deployed app** via the Playwright MCP browser and report Pass/Fail with evidence
- [ ] Catch a real, user-visible **defect** and file a structured bug report
- [ ] Assemble a **QA validation report** with a Go / No-Go recommendation (a human approves)
- [ ] Understand **what Copilot can and cannot see** in a browser, and where a human must stay in the loop

## ⚙️ Setup — point at the deployed app

QA validates a **deployed environment**, not a local build. Set your target URL once and reuse it in every prompt.

```text
BASE_URL = https://<your-deployed-gallery>     # e.g. a staging / UAT environment
```

> 🛟 **No deployed environment for the class?** Use a local production build as a stand-in:
> ```bash
> npm run build && npm start     # serves a production build at http://localhost:3000
> # Then use BASE_URL = http://localhost:3000
> ```

Create a branch to hold your QA artifacts (report + any defects you write up):

```bash
git checkout main
git pull
git checkout -b USERNAME/lab-11-qa-ux-validation
```

**Enable the Playwright MCP browser.** If you completed [Lab 7](../07-e2e-playwright/README.md), this is already configured. Otherwise create `.vscode/mcp.json`:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Open `.vscode/mcp.json` and click **Start** on the server, then **Allow** it. In the **Chat** view, set the mode dropdown to **Agent**, open the **Tools** (🔧) picker, and confirm the Playwright browser tools are listed.

> 🛟 **No MCP available?** Run `npx playwright codegen <BASE_URL>/gallery` to record a session you can narrate to Copilot, or drive the browser yourself and paste screenshots into Copilot Chat. See [FACILITATOR.md](FACILITATOR.md).

> **✅ Checkpoint:** In the Chat view with the mode set to **Agent**, ask Copilot to *"open `BASE_URL`/gallery in the Playwright MCP browser and describe what a user sees."* You get a description of the gallery page.

## 🧩 The stages

| Stage | Focus | QA deliverable | ~Time |
| ----- | ----- | -------------- | ----- |
| 1 🎯 | Ticket → UX checklist | A checklist from GAL-101's acceptance criteria | 10 min |
| 2 🎯 | Copilot walks the deployed flow | Pass/Fail notes + screenshots | 15 min |
| 3 🎯 | Catch the defect (GAL-502) | A filed bug report | 15 min |
| 4 🧗 | Assemble the signoff package | A completed validation report | 10 min |
| 5 🧗 | *(Bonus, optional)* Capture a repeatable script | A saved regression flow | 10 min |
| — | **Ship it** | Attach report + defects to the ticket | — |

---

## 🎯 Stage 1: Turn the ticket into a QA checklist (10 min)

Open [GAL-101 · Live search](../../jira-examples/GAL-101-live-search.md) and read the **Acceptance criteria** and **User experience** sections. Then, in Copilot **Ask** or **Agent** mode:

> **Prompt:**
> "Read jira-examples/GAL-101-live-search.md. Produce a numbered **manual QA checklist** a tester can follow against a deployed site, derived only from its acceptance criteria and UX notes. Then add edge cases QA should also check that aren't spelled out: empty query, whitespace-only query, no-match query, and share-the-URL-then-reload. For each item, state the **observable expected result** (what a user would see) — not any implementation detail."

Review the output. Every acceptance-criteria scenario in the ticket should map to at least one checklist line.

> **✅ Checkpoint:** You have a numbered checklist covering all five GAL-101 scenarios **plus** at least two extra edge cases, each written as an observable outcome.

---

## 🎯 Stage 2: Copilot walks the deployed flow (15 min)

Now let Copilot drive the **deployed** app and validate against your checklist. In **Agent mode**:

> **Prompt:**
> "Using the Playwright MCP browser, open `BASE_URL`/gallery. Perform the QA checklist from Stage 1 for GAL-101. For **each** acceptance-criteria scenario, report **Pass** or **Fail** describing only what a user would observe — the on-screen "Showing X of Y photos" count, which cards are visible or hidden, and the URL after searching and reloading. Take a **screenshot** as evidence for each scenario. Do **not** read or reference source code; judge the deployed experience as a black box."

Watch how Copilot navigates, types into the **Search photos** box, and reports back. Spot-check one or two results yourself in a real browser — QA always verifies the co-pilot.

> **✅ Checkpoint:** You have a Pass/Fail line for every GAL-101 scenario, each backed by a screenshot, based purely on observable behavior.

---

## 🎯 Stage 3: Catch the defect (15 min)

Development shipped a flaw. Validate [GAL-502 · Search XSS](../../jira-examples/GAL-502-bug-search-xss.md) — a **user-visible security/UX failure**. In **Agent mode**:

> **Prompt:**
> "As a user on `BASE_URL`/gallery, enter the search value `<img src=x onerror=alert(1)>` and also a normal term that would surface a matching photo. Observe whether anything abnormal happens on screen — a script running, an alert dialog, broken rendering. Judge only what is **observable**. If the experience is broken or unsafe, it **fails** GAL-502."

If it fails (it should), have Copilot draft the defect:

> **Prompt:**
> "Using the template in templates/bug-report.md, write up this defect: severity, environment (`BASE_URL`), user-visible reproduction steps, expected vs actual behavior, and reference a screenshot as evidence. Keep it to observable behavior a non-technical stakeholder can follow."

> **✅ Checkpoint:** You have a filed bug report identifying the issue as **Critical**, with reproducible, user-facing steps and an evidence screenshot.

---

## 🧗 Stage 4 (Challenge): Assemble the signoff package (10 min)

This is the deliverable that gates Production. Your goal: a **completed validation report** for GAL-101 and GAL-502 using [templates/qa-validation-report.md](templates/qa-validation-report.md), ending in a **Go / No-Go** recommendation — with a **human QA lead** as the named approver.

<details><summary>💡 Stuck? Reveal a hint</summary>

> "Fill templates/qa-validation-report.md for this validation session covering GAL-101 and GAL-502. Include: a criteria table (scenario → Pass/Fail → evidence link) for each ticket, a defects section referencing the bug I filed, and a final **Go / No-Go** recommendation. Make clear that Copilot's recommendation is advisory and the human QA lead is the approver of record. Do not sign off on my behalf."

</details>

> **✅ Checkpoint:** A completed report with per-ticket Pass/Fail tables, the linked defect, and an explicit **Go / No-Go** line naming a human approver. (GAL-101 passing + GAL-502 failing should make this a **No-Go** until the defect is fixed.)

---

## 🧗 Stage 5 (Challenge, optional): Capture a repeatable flow (10 min)

*This stage is for automation-curious QA and is **not** required for signoff.* Manual validation you did today can become a repeatable check tomorrow.

<details><summary>💡 Stuck? Reveal a hint</summary>

> "From the GAL-101 flow you just validated, produce a plain-language, step-by-step **regression script** (open URL → search 'portrait' → confirm the matching card shows and a non-matching card doesn't → confirm the XSS payload renders inert) that another tester — or a future automation engineer — could replay against any `BASE_URL`. Save it as e2e-notes.md in my branch. Do not modify the application source."

</details>

> **✅ Checkpoint:** A saved, environment-agnostic regression flow another person could replay. No application source was touched.

---

## 🚀 Ship it

QA doesn't open a code PR — you **attach evidence to the work item**:

1. Save your **validation report**, **bug report(s)**, and any screenshots into your branch (e.g., a `qa-artifacts/` folder) and commit them.
2. In a real workflow, attach the report and file the defect on the actual Jira ticket. Here, you can push the branch and open a PR titled *"QA validation — GAL-101 / GAL-502"* so a reviewer can see your evidence.
3. Ask Copilot to **summarize the session** for the ticket comment: *"Draft a concise QA status comment: what was validated, the verdict, and the blocking defect."*

## ✅ Completion Checklist

- [ ] Built a UX checklist from GAL-101's acceptance criteria (+ edge cases)
- [ ] Had Copilot drive the **deployed** app and report Pass/Fail with screenshots
- [ ] Caught the GAL-502 defect and filed a structured bug report
- [ ] Produced a validation report with a **Go / No-Go** recommendation and a human approver
- [ ] (Optional) Saved a repeatable regression flow
- [ ] Attached evidence to the work item / PR

## 🏁 What's Next?

You've run the full QA gate: **read the ticket → validate the deployed UX → capture evidence → recommend Go/No-Go**, with Copilot accelerating the busywork and a human owning the decision.

Want the same QA workflow in a different toolchain? **[Lab 12](../12-katalon-ai-ux-validation/README.md)** runs it inside **Katalon Studio** with the built-in Katalon AI Assistant.

### 🌟 Take-home challenge

Validate [GAL-104 · Pagination](../../jira-examples/GAL-104-pagination-infinite-scroll.md) against the deployed app — including the tricky edge case in its acceptance criteria: **clicking "Load More Photos" twice quickly must not duplicate any card**. File a defect if you can make a photo appear twice, and add the result to your validation report.

> **What Copilot can't do for you:** subjective look-and-feel, pixel spacing, and brand/visual polish still need human eyes (optionally aided by a screenshot + a vision model). And Copilot's Go/No-Go is **advisory** — Production signoff is a human decision. See [FACILITATOR.md](FACILITATOR.md) for more.
