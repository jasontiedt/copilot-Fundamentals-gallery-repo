# Lab 6 · C# Track — TDD from a Work Item

**Work item:** Implement **US-142 "Most liked" photos** (see the [lab overview](README.md)) — **test-first**. You'll add `MostLiked` to `GalleryService` using red-green-refactor.

**Estimated Time:** ~28 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-6-tdd
cd labs/starter/csharp
```

> **Prerequisite:** The `Gallery.Tests` xUnit project. If you haven't done [Lab 3](../03-unit-testing/csharp.md), run its **Stage 1** to create it (`dotnet new xunit`, add a reference to `Gallery.csproj`, add FluentAssertions).

## ✅ Definition of Done
```bash
dotnet test ../Gallery.Tests   # all green, including the new MostLiked tests
```
- [ ] `MostLiked(limit)` returns the top *limit* by likes, highest first (**AC1**).
- [ ] Ties break by `Id` ascending (**AC2**).
- [ ] `limit <= 0` returns an empty list (**AC3**).
- [ ] `limit` greater than the collection returns all, ordered (**AC4**).
- [ ] You wrote the **tests before** the implementation.

## What You'll Learn
- [ ] Convert acceptance criteria into a test list
- [ ] Red → Green → Refactor with Copilot
- [ ] Build a reusable work-item-to-tests prompt file

---

## 🎯 Stage 1: Criteria → a test list (5 min)

In **Ask** mode, paste the acceptance criteria and ask:
```markdown
Here is work item US-142 (paste ACs). List the xUnit test cases I should write for a new `GalleryService.MostLiked(int limit)` method, including edge cases. Don't write code yet — just the test list.
```

**✅ Checkpoint:** An ordered list of cases mapping to AC1–AC4.

---

## 🎯 Stage 2: Red — write the tests first (6 min)

**1.** Open [labs/starter/csharp/GalleryService.cs](../starter/csharp/GalleryService.cs) to see the `Photo` properties and the constructor (it accepts a custom photo list — handy for tie tests).

**2.** In `../Gallery.Tests/GalleryServiceTests.cs`, ask Copilot to write **only the tests** for `MostLiked` from your Stage 1 list — calling a method that doesn't exist yet.

**3.** Run them and confirm they **fail to compile / fail**:
```bash
dotnet test ../Gallery.Tests --filter MostLiked
```

> 🔴 A compile error for the missing `MostLiked` method is your red state.

**✅ Checkpoint:** Tests for AC1–AC4 exist and are red.

---

## 🎯 Stage 3: Green — implement minimally (6 min)

In **Agent** mode:
```markdown
Implement `IReadOnlyList<Photo> MostLiked(int limit)` in GalleryService.cs to make the failing tests pass: order by Likes descending, then by Id ascending, return an empty list when limit <= 0. Follow our csharp.instructions.md. Don't change the tests.
```
Run `dotnet test ../Gallery.Tests` until **green**.

**✅ Checkpoint:** All `MostLiked` tests pass.

---

## 🧗 Stage 4 (Challenge): Refactor behind the tests (4 min)

**Your goal:** Improve the implementation **without changing behavior** — the tests are your safety net (e.g., a clean LINQ ordering, XML docs, no duplication with `MostViewed`).

**Done when:**
- [ ] You made at least one readability/structure improvement.
- [ ] `dotnet test ../Gallery.Tests` is still green after every change.

<details><summary>💡 Stuck? Reveal a hint</summary>

`MostViewed` and `MostLiked` are near-identical `OrderBy…Take` pipelines — ask Copilot to "extract a shared private helper parameterized by key selector, without changing behavior; keep tests green."

</details>

---

## 🧗 Stage 5 (Challenge): Capture the workflow (4 min)

**Your goal:** Create `.github/prompts/workitem-to-tests.prompt.md` that turns any pasted work item into an xUnit test list.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`agent: 'ask'`, `description`).
- [ ] Outputs an ordered **test list** (no implementation) mapping each AC to tests.
- [ ] Reminds the author to cover happy path, boundaries, and each criterion.

<details><summary>💡 Stuck? Reveal a hint</summary>

Create it via `/prompts` → **New Prompt** (or `/create-prompt`). Body: "Given a work item, list xUnit cases mapping each acceptance criterion to tests, including edge cases. Output only the list."

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
Pick a real ticket from your backlog and drive it entirely with TDD: derive the test list, go red → green → refactor, and open a PR.
