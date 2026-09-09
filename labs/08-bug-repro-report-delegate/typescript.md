# Lab 8 · TypeScript / React Track — Bug Reproduction → Report → Delegate

**Goal:** Reproduce the reported "most viewed is backwards" defect with a failing test, write a crisp bug report, and delegate the fix to the **Copilot coding agent** — then verify its PR.

**Estimated Time:** ~26 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-8-bug-repro
```

> **Prerequisite:** A working Vitest setup (see [Lab 3](../03-unit-testing/typescript.md) Stage 1) and a `src/lib/gallery-utils.ts` module.

## ✅ Definition of Done
- [ ] A **failing** test that reproduces the wrong ordering.
- [ ] A committed `bug-report.prompt.md` + `.github/ISSUE_TEMPLATE/bug_report.md`.
- [ ] A GitHub issue assigned to the Copilot coding agent.
- [ ] You reviewed the agent's PR and confirmed your repro test passes there.

## What You'll Learn
- [ ] Reproduce a defect with a minimal failing test
- [ ] Generate a structured bug report and reusable templates
- [ ] Delegate a fix to the coding agent and verify it

---

## 🎯 Stage 1: Reproduce it (6 min)

**Goal:** Prove the bug with a test — the most valuable thing QA can attach to a report.

**1.** The reported (buggy) implementation looks like this. Add it to `src/lib/gallery-utils.ts`:
```ts
// Reported implementation — ranking is backwards.
export function topByViews(photos: Photo[], n: number): Photo[] {
  return [...photos].sort((a, b) => a.views - b.views).slice(0, n);
}
```

**2.** Ask Copilot (Ask/Edit mode) to write a **failing** test in `src/lib/gallery-utils.test.ts` asserting the *intended* behavior:
```markdown
Write a Vitest test asserting topByViews returns the HIGHEST-viewed photo first for a small fixture. Don't fix the function — the test should fail.
```

**3.** Run it and capture the failure:
```bash
npm test
```

**✅ Checkpoint:** A red test that clearly shows expected-vs-actual ordering.

---

## 🎯 Stage 2: Report it (6 min)

**Goal:** Turn the repro into a report anyone can act on — and make it repeatable.

**1. Reusable prompt file** — create `.github/prompts/bug-report.prompt.md`:
```markdown
---
agent: 'ask'
description: 'Draft a structured bug report from a failing test or repro steps'
---

# Draft a bug report

From the selected failing test (or the repro steps I provide), write a bug report with:
- **Title** (concise, specific)
- **Severity** (High/Medium/Low) with a one-line justification
- **Steps to reproduce** (numbered)
- **Expected vs Actual**
- **Evidence** (the failing assertion / a screenshot placeholder)
- **Suggested area** (file/function likely at fault)
Keep it under ~15 lines.
```

**2. Issue template** — create `.github/ISSUE_TEMPLATE/bug_report.md`:
```markdown
---
name: Bug report
about: Report a defect
title: "[Bug] "
labels: bug
---

## Summary

## Steps to reproduce
1.

## Expected vs Actual

## Evidence

## Severity
```

**3.** Select your failing test and run `/bug-report` to generate the write-up.

**✅ Checkpoint:** A structured bug report generated from your repro.

---

## 🧗 Stage 3 (Challenge): Delegate the fix (6 min)

**Your goal:** File the issue and hand the fix to the **Copilot coding agent** — you won't fix it yourself.

**Done when:**
- [ ] A GitHub issue exists from your bug report (include the repro).
- [ ] The **Copilot coding agent** is assigned and has started a PR.

<details><summary>💡 Stuck? Reveal a hint</summary>

With the **GitHub MCP server**, ask Agent mode to "create an issue titled … with these steps/expected/actual." No MCP? Create it on github.com → **Issues → New issue** (your template appears). For a UI defect you can drag a **screenshot** into chat (Vision) so Copilot describes it. Then open the issue and **assign Copilot**.

</details>

---

## 🎯 Stage 4: Verify the agent's PR (4 min)

1. Open the pull request the coding agent created. Click **View session** to see how it diagnosed and fixed the bug.
2. Confirm it made the ranking descending and that **your repro test now passes** on its branch.
3. Comment like any human review — approve, or request a change if the fix is incomplete.

**✅ Checkpoint:** The agent's PR fixes the bug and your test is green there.

---

## 🚀 Ship it: your repro + artifacts (4 min)

Your PR contains the **repro test + report templates** (not the fix — the agent owns that).

1. **Commit** the failing repro test, `bug-report.prompt.md`, and the issue template.
2. **Push:** `git push -u origin USERNAME/lab-8-bug-repro`
3. **Open a PR**, then under **Reviewers**, next to **Copilot**, click **Request**. Triage its comments.

**🎉 Success:** You reproduced, reported, delegated, and verified — the full QA loop.

## ✅ Completion Checklist
- [ ] Wrote a failing repro test
- [ ] Created `bug-report.prompt.md` + issue template and generated a report
- [ ] Filed an issue and assigned the coding agent
- [ ] Verified the agent's PR against your repro
- [ ] Opened your own PR and got a Copilot review

## 🏁 What's Next?

You've finished the **QA & Testing track**! Revisit the take-home challenges and start applying these artifacts to your real repositories.

### 🌟 Take-home challenge (do this on your own time)
Wire up **automatic Copilot code review** on a real repo and file a real bug via your issue template — then let the coding agent propose the fix while you focus on verifying the regression test.
