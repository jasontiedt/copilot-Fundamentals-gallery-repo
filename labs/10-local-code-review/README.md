# Lab 10: Local Code Review Agent

**Scenario:** A Copilot PR review is great — but it only runs *after* you've pushed, once a teammate's attention has already shifted to your diff. In this lab you'll package your team's review knowledge into two focused **skills** (security, test coverage) and a read-only **Local Reviewer** agent that runs *before* you ever commit or push. Bake in a real risk, catch it yourself, fix it, and only ship once your own gate says you're ready.

**Estimated Time:** ~28 minutes

> **Recommended prerequisite:** [Lab 1](../01-personalize-and-standardize/README.md) (agent & skill basics) and [Lab 4](../04-reviewing-changes/README.md) (review fundamentals). Not required, but this lab builds directly on both.

## 🌐 Pick your language

- 👉 [TypeScript / React](typescript.md)
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] Package a security checklist into a `code-review-security` **skill**
- [ ] Package a test-coverage checklist into a `code-review-coverage` **skill**
- [ ] Build a read-only **Local Reviewer** agent that consults both and returns a ship/no-ship verdict
- [ ] Run it on a real diff *before* committing, fix what it flags, and get a clean pass
- [ ] Compare your local verdict against the cloud Copilot PR review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Make a diff | A realistic change with a hidden risk | 4 min |
| 2 | Security lens | `code-review-security` skill | 5 min |
| 3 | Coverage lens | `code-review-coverage` skill | 5 min |
| 4 | The gate | `Local Reviewer` agent (read-only + verdict) | 5 min |
| 5 | Run the gate | Fail → fix → pass, before you push | 5 min |
| — | **Ship it** | Push → PR → Copilot review → compare | 4 min |

## 🎁 What you'll take home

- `.github/skills/code-review-security/SKILL.md` and `.github/skills/code-review-coverage/SKILL.md`
- `.github/agents/local-reviewer.agent.md` — a read-only pre-push gate you can run on any diff
- A verified habit: review locally, fix, *then* push

## 🚀 Ready?

Open your language track: [TypeScript](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md).
