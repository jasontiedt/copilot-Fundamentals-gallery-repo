# Lab 3: Unit Testing

**Scenario:** You just built the photo detail feature. Now **lock in its behavior with tests** so it can't silently break — and let Copilot do the heavy lifting. You'll also discover that a good test can catch a **real bug** hiding in the starter code.

**Estimated Time:** ~22 minutes

> **Prerequisite:** Finish [Lab 2](../02-core-development/README.md). You'll test the code you wrote and use the **testing skill** you created in Lab 1.

## 🌐 Pick your language

- 👉 [TypeScript / React](typescript.md)
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] Generate tests with `/tests` (and Agent mode), guided by your Lab 1 testing skill
- [ ] Add **edge cases** Copilot missed
- [ ] Package testing into a reusable **`generate-unit-tests.prompt.md`**
- [ ] Use a test to **catch a real bug** (and quarantine it for Lab 5)
- [ ] Run tests and fix failures with `/fix`
- [ ] **Ship it**: push, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Test runner | Set up / confirm the test tooling | 4 min |
| 2 | Generate tests | `/tests`, testing skill | 6 min |
| 3 | Edge cases | Prompting for missing cases | 4 min |
| 4 | Reuse | Create `generate-unit-tests.prompt.md` | 4 min |
| 5 | Catch a bug | A failing test on `most_viewed` (quarantine it) | 2 min |
| — | **Ship it** | Push → PR → Copilot review | 2 min |

## 🎁 What you'll take home

- A working test suite for the gallery logic
- A reusable **`generate-unit-tests.prompt.md`** prompt file
- The habit of writing a test that proves a bug exists

## 🚀 Ready?

Open your language track: [TypeScript](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md). Then continue to **Lab 4: Reviewing Changes**.
