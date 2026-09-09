# Lab 6: Test-Driven Development from a Work Item

**Scenario:** A ticket lands in your sprint. Instead of coding first and testing later, you'll practice **test-driven development (TDD)** — turn the acceptance criteria into tests, watch them fail (**red**), implement just enough to pass (**green**), then **refactor** with the tests as a safety net. Copilot accelerates every step.

This is the first lab in the **QA & Testing track** (Labs 6–8). It builds directly on [Lab 3: Unit Testing](../03-unit-testing/README.md).

**Estimated Time:** ~28 minutes

## 📋 The work item

> ### US-142 — "Most liked" photos
> **As a** gallery visitor, **I want** to see the most-liked photos **so that** I can quickly find popular content.
>
> **Acceptance criteria**
> - **AC1** — Returns the top *N* photos ordered by likes, highest first.
> - **AC2** — Ties are broken by `id` (ascending) for stable ordering.
> - **AC3** — A limit of `0` or negative returns an empty list.
> - **AC4** — A limit larger than the collection returns all photos, still ordered.

You'll implement this as a new `mostLiked` operation — **tests first**.

## 🌐 Pick your language

- 👉 [TypeScript / React](typescript.md)
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] Turn a work item's **acceptance criteria into a test list** with Ask mode
- [ ] Write **failing tests first** (red)
- [ ] Implement to **green** with Agent mode
- [ ] **Refactor** safely behind passing tests
- [ ] Package the workflow into a reusable **prompt file**
- [ ] **Ship it**: push, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Criteria → tests | Ask mode | 5 min |
| 2 | Red | Write failing tests | 6 min |
| 3 | Green | Implement with Agent mode | 6 min |
| 4 | Refactor | Improve behind tests | 4 min |
| 5 | Reuse | `workitem-to-tests.prompt.md` | 4 min |
| — | **Ship it** | Push → PR → Copilot review | 3 min |

## 🎁 What you'll take home

- Muscle memory for **red-green-refactor** with Copilot
- A reusable **`workitem-to-tests.prompt.md`** that converts any ticket into a test list

## 🚀 Ready?

Open your language track: [TypeScript](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md). Then continue to **Lab 7: E2E UI Testing**.
