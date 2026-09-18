# Facilitator Guide — Lab 11: QA UX Validation Against Work Items

This guide is for the **instructor**. It covers setup, timing, answer keys, and the discussion
points that make this lab land. The lab is intentionally **black-box and code-free** — attendees
validate a *deployed* experience against Jira work items and never edit source.

## 🎯 Learning outcomes

Attendees leave able to: read acceptance criteria → drive a deployed app with Copilot + Playwright
MCP → capture Pass/Fail evidence → file a defect → produce a Go/No-Go signoff, and articulate the
limits of AI-assisted QA.

## 🧰 Pre-flight (do this before the session)

1. **Choose the target environment** and give every attendee the same `BASE_URL`:
   - *Preferred:* a shared **staging/UAT** deployment of the gallery.
   - *Fallback:* local production build — `npm run build && npm start` → `http://localhost:3000`.
2. **Playwright MCP:** confirm the Playwright MCP server is configured in VS Code (Lab 7 sets this
   up via `.vscode/mcp.json`). Have the fallback ready (below) for anyone without it.
3. **Seed data:** ensure the environment has photos whose titles/tags/photographers make GAL-101's
   search cases meaningful (e.g., a "Portrait Study" and a "Sunset Landscape").
4. **GAL-502 defect:** this lab assumes the deployed build still contains the search-highlight XSS.
   If your environment has already fixed it, either point at an unpatched build **or** tell
   attendees to treat Stage 3 as "confirm the fix" (a Pass) and file no defect.
5. **Credentials:** if the environment needs a login, distribute a **test account**. Never route
   real secrets through chat — attendees type credentials directly into the browser.

## ⏱️ Timing (≈60 min)

| Segment | Time | Notes |
| ------- | ---- | ----- |
| Framing + setup | 8 min | What Copilot can/can't see; confirm everyone can open `BASE_URL` |
| Stage 1 — checklist | 10 min | Watch for checklists that drift into implementation detail — redirect to *observable* outcomes |
| Stage 2 — walk the flow | 15 min | Have one attendee share their screen while Copilot drives |
| Stage 3 — catch the defect | 15 min | The "aha" moment; make sure everyone files a real bug |
| Stage 4 — signoff | 10 min | Emphasize the human-approver line |
| Wrap + take-home | 2 min | Assign GAL-104 pagination challenge |

Stage 5 is optional overflow for fast finishers or automation-curious testers.

## ✅ Answer key

- **GAL-101** should **Pass** on a healthy deployed build (search filters, count updates, clearing
  restores, `?q=` in the URL survives reload). If it fails, the environment/data is misconfigured —
  check seeding.
- **GAL-502** should **Fail** — the `<img src=x onerror=alert(1)>` payload executes / shows an alert
  when highlighted. Every attendee should file a **Critical** defect. This guarantees each person
  practices the full "found a bug" path.
- **Signoff verdict:** GAL-101 Pass + GAL-502 Fail ⇒ **No-Go** until the defect is fixed. A report
  that says "Go" is a coaching moment about blocking severities.
- **GAL-104 (take-home):** the duplicate-card-on-rapid-"Load More Photos" edge case is the one to probe.

## 🛟 Fallbacks & troubleshooting

- **No Playwright MCP tools available:** attendees can still do Stages 1, 3 (manually in a browser),
  and 4. For Copilot-driven navigation, `npx playwright codegen BASE_URL/gallery` records a session
  they can narrate to Copilot. The signoff artifact matters more than the automation.
- **Non-deterministic agent runs:** if Copilot's browser steps vary, that's expected — reinforce that
  the durable output is the **report + evidence**, and Stage 5 exists to capture a repeatable flow.
- **Environment down / flaky:** switch the cohort to the local production-build fallback.
- **Attendee edits source code:** gently redirect — QA validates the deployed black box; code changes
  belong to the dev team and a different lab (see Lab 3/Lab 10).

## 💬 Discussion prompts (use during framing and wrap-up)

- **"What can Copilot *not* see in a browser?"** It reads the accessibility tree, DOM text, and
  screenshots — great for structure, labels, and behavior. It does **not** judge subjective visual
  polish, pixel spacing, or brand feel. Pair it with human eyes or a screenshot + vision model.
- **"Who signs off?"** Copilot's Go/No-Go is **advisory**. A human QA lead owns the Production
  decision — the report must name that person.
- **"Where does this save time?"** Checklist generation, driving repetitive flows, drafting
  consistent bug reports, and assembling the evidence package — not judgment.
- **"How does this scale?"** Today's manual validation becomes tomorrow's regression flow (Stage 5),
  which a dev/automation engineer can later turn into an automated Playwright suite (Lab 7).

## 🔗 Related labs

- [Lab 7 — E2E Playwright + MCP](../07-e2e-playwright/README.md): sets up the browser tooling this lab uses.
- [Lab 8 — Bug Repro → Report → Delegate](../08-bug-repro-report-delegate/README.md): the developer-side counterpart to filing defects.
- [Lab 10 — Local Code Review Agent](../10-local-code-review/README.md): the pre-push quality gate on the dev side.
