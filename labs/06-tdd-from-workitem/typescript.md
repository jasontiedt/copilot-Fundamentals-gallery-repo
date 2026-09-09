# Lab 6 · TypeScript / React Track — TDD from a Work Item

**Work item:** Implement **US-142 "Most liked" photos** (see the [lab overview](README.md)) — **test-first**. You'll add a pure `topByLikes` function to `src/lib/gallery-utils.ts` using red-green-refactor.

**Estimated Time:** ~28 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-6-tdd
```

> **Prerequisite:** A working Vitest setup. If you haven't done [Lab 3](../03-unit-testing/typescript.md), run its **Stage 1** quick setup first (`npm install -D vitest@^2` + the `vitest.config.ts`). You'll also reuse the `gallery-utils.ts` module — create it if it doesn't exist yet.

## ✅ Definition of Done
```bash
npm test   # all green, including the new topByLikes tests
```
- [ ] `topByLikes(photos, n)` returns the top *n* by likes, highest first (**AC1**).
- [ ] Ties break by `id` ascending (**AC2**).
- [ ] `n <= 0` returns `[]` (**AC3**).
- [ ] `n` greater than the list length returns all, ordered (**AC4**).
- [ ] You wrote the **tests before** the implementation.

## What You'll Learn
- [ ] Convert acceptance criteria into a test list
- [ ] Red → Green → Refactor with Copilot
- [ ] Build a reusable work-item-to-tests prompt file

---

## 🎯 Stage 1: Criteria → a test list (5 min)

**Goal:** Let Copilot turn the ticket into concrete cases before you write code.

In **Ask** mode, paste the acceptance criteria and ask:
```markdown
Here is work item US-142 (paste ACs). List the unit test cases I should write for a pure function `topByLikes(photos: Photo[], n: number): Photo[]`, including edge cases. Don't write code yet — just the test list.
```

**✅ Checkpoint:** You have a short, ordered list of test cases mapping to AC1–AC4.

---

## 🎯 Stage 2: Red — write the tests first (6 min)

**Goal:** Encode the criteria as **failing** tests.

**1.** Create `src/lib/gallery-utils.test.ts` (or extend it). Ask Copilot (Edit or Agent mode) to write **only the tests** for `topByLikes` from your Stage 1 list — importing `topByLikes` from `./gallery-utils` even though it doesn't exist yet.

**2.** Run them and confirm they **fail to compile / fail**:
```bash
npm test
```

> 🔴 A failing (or non-compiling) test is the point — it proves the test exercises code that isn't there yet.

**✅ Checkpoint:** Tests exist for AC1–AC4 and are red.

---

## 🎯 Stage 3: Green — implement minimally (6 min)

**Goal:** Write just enough code to pass.

In **Agent** mode:
```markdown
Implement `topByLikes(photos: Photo[], n: number): Photo[]` in src/lib/gallery-utils.ts to make the failing tests pass. Sort by likes descending, break ties by id ascending, return [] when n <= 0. Keep it pure. Don't change the tests.
```
Run `npm test` until **green**.

**✅ Checkpoint:** All `topByLikes` tests pass.

---

## 🧗 Stage 4 (Challenge): Refactor behind the tests (4 min)

**Your goal:** Improve the implementation **without changing behavior** — the tests are your safety net. Ideas: extract a comparator, add JSDoc, remove duplication.

**Done when:**
- [ ] You made at least one readability/structure improvement.
- [ ] `npm test` is still green after every change.

<details><summary>💡 Stuck? Reveal a hint</summary>

Select `topByLikes` and ask Copilot to "refactor for readability without changing behavior; keep all tests passing," then re-run `npm test`.

</details>

---

## 🧗 Stage 5 (Challenge): Capture the workflow (4 min)

**Your goal:** Create `.github/prompts/workitem-to-tests.prompt.md` that turns any pasted work item into a test list — so your team TDDs consistently.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`agent: 'ask'`, `description`).
- [ ] Takes a work item / acceptance criteria and outputs an ordered **test list** (no implementation).
- [ ] Reminds the author to cover happy path, boundaries, and each acceptance criterion.

<details><summary>💡 Stuck? Reveal a hint</summary>

Create it via `/prompts` → **New Prompt** (or `/create-prompt`). Body: "Given a work item, list unit test cases mapping each acceptance criterion to one or more tests, including edge cases. Output only the list."

</details>

---

## 🚀 Ship it: PR + Copilot review (3 min)

1. **Stage & commit** — generate the message with Copilot.
2. **Push:** `git push -u origin USERNAME/lab-6-tdd`
3. **Open a PR**, then under **Reviewers**, next to **Copilot**, click **Request**. Triage its comments.

**🎉 Success:** A feature built test-first, in a reviewed PR.

## ✅ Completion Checklist
- [ ] Derived a test list from the ACs
- [ ] Wrote failing tests first (red)
- [ ] Implemented to green
- [ ] Refactored with tests green
- [ ] Created `workitem-to-tests.prompt.md`
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 7: E2E UI Testing with Playwright + MCP**.

### 🌟 Take-home challenge (do this on your own time)
Pick a real ticket from your backlog and drive it entirely with TDD: derive the test list, go red → green → refactor, and open a PR. Notice how the tests shape a cleaner design.
