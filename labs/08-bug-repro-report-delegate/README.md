# Lab 8: Bug Reproduction → Report → Delegate a Fix

**Scenario:** A user reports that the gallery's **"most viewed"** ranking is backwards — it shows the *least*-viewed photos first. As QA, your job isn't to fix it yourself; it's to **reproduce** it precisely, **report** it clearly, and **delegate** the fix to the **Copilot coding agent** — then verify the agent's PR.

This is the final lab in the **QA & Testing track**. It's the QA counterpart to [Lab 5](../05-debug-document-delegate/README.md) (where *you* fixed the bug with `/fix`); here you drive the **reproduce → report → delegate → verify** loop instead.

**Estimated Time:** ~26 minutes

## 🐞 The defect

The `mostViewed` operation is supposed to return the **highest**-viewed photos first, but it returns the lowest. (In Python/Java/C# it's the committed bug in your starter service; in TypeScript you'll reproduce the reported implementation.)

## 🌐 Pick your language

- 👉 [TypeScript / React](typescript.md)
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] **Reproduce** a defect with a minimal **failing test**
- [ ] Write a high-quality **bug report** and a reusable report prompt + issue template
- [ ] **Delegate** the fix to the Copilot coding agent from a GitHub issue
- [ ] **Verify** the agent's PR against your repro
- [ ] **Ship it**: push your repro + artifacts, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Reproduce | Failing repro test | 6 min |
| 2 | Report | `bug-report.prompt.md` + issue template | 6 min |
| 3 | Delegate | Create issue (MCP/Vision) → assign coding agent | 6 min |
| 4 | Verify | Review the agent's PR against your repro | 4 min |
| — | **Ship it** | Push → PR → Copilot review | 4 min |

## 🎁 What you'll take home

- A reusable **`bug-report.prompt.md`** and **`.github/ISSUE_TEMPLATE/bug_report.md`**
- A **regression test** that locks the fix
- Experience delegating a fix to an autonomous agent

## 🚀 Ready?

Open your language track: [TypeScript](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md).

**This is the last lab in the QA track — nice work!**
