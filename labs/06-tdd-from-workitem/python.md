# Lab 6 · Python Track — TDD from a Work Item

**Work item:** Implement **US-142 "Most liked" photos** (see the [lab overview](README.md)) — **test-first**. You'll add `most_liked` to `GalleryService` using red-green-refactor.

**Estimated Time:** ~28 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-6-tdd
cd labs/starter/python
pip install pytest   # if not already installed
```

## ✅ Definition of Done
```bash
pytest   # all green, including the new most_liked tests
```
- [ ] `most_liked(limit)` returns the top *limit* by likes, highest first (**AC1**).
- [ ] Ties break by `id` ascending (**AC2**).
- [ ] `limit <= 0` returns `[]` (**AC3**).
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
Here is work item US-142 (paste ACs). List the pytest test cases I should write for a new `GalleryService.most_liked(limit)` method, including edge cases. Don't write code yet — just the test list.
```

**✅ Checkpoint:** An ordered list of cases mapping to AC1–AC4.

---

## 🎯 Stage 2: Red — write the tests first (6 min)

**1.** Open [labs/starter/python/gallery/service.py](../starter/python/gallery/service.py) to see the `Photo` fields and the constructor (it accepts a custom photo list — handy for tie tests).

**2.** In `tests/test_service.py` (create the `tests/` folder if needed), ask Copilot to write **only the tests** for `most_liked` from your Stage 1 list — calling a method that doesn't exist yet.

**3.** Run them and confirm they **fail**:
```bash
pytest -k most_liked
```

> 🔴 A failing test (here, `AttributeError: no attribute 'most_liked'`) is exactly what you want first.

**✅ Checkpoint:** Tests for AC1–AC4 exist and are red.

---

## 🎯 Stage 3: Green — implement minimally (6 min)

In **Agent** mode:
```markdown
Implement `most_liked(self, limit: int) -> list[Photo]` in gallery/service.py to make the failing tests pass: sort by likes descending, break ties by id ascending, return [] when limit <= 0. Follow our python.instructions.md. Don't change the tests.
```
Run `pytest` until **green**.

**✅ Checkpoint:** All `most_liked` tests pass.

---

## 🧗 Stage 4 (Challenge): Refactor behind the tests (4 min)

**Your goal:** Improve the implementation **without changing behavior** — the tests are your safety net (e.g., a clean sort key, a docstring, no duplication with `most_viewed`).

**Done when:**
- [ ] You made at least one readability/structure improvement.
- [ ] `pytest` is still green after every change.

<details><summary>💡 Stuck? Reveal a hint</summary>

Both `most_viewed` and `most_liked` sort-then-slice — ask Copilot to "extract a shared private helper without changing behavior; keep tests green."

</details>

---

## 🧗 Stage 5 (Challenge): Capture the workflow (4 min)

**Your goal:** Create `.github/prompts/workitem-to-tests.prompt.md` that turns any pasted work item into a pytest test list.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`agent: 'ask'`, `description`).
- [ ] Outputs an ordered **test list** (no implementation) mapping each AC to tests.
- [ ] Reminds the author to cover happy path, boundaries, and each criterion.

<details><summary>💡 Stuck? Reveal a hint</summary>

Create it via `/prompts` → **New Prompt** (or `/create-prompt`). Body: "Given a work item, list pytest cases mapping each acceptance criterion to tests, including edge cases. Output only the list."

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
