# Lab 3 · Python Track — Unit Testing

**Goal:** Cover the `GalleryService` you completed in Lab 2 with `pytest` tests — including the detail lookup, filtering, and pagination — and catch the planted bug in `most_viewed`.

**Estimated Time:** ~22 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-3-tests
cd labs/starter/python
```

## What You'll Learn
- [ ] Generate `pytest` tests with `/tests` and your Lab 1 skill
- [ ] Add edge cases and a reusable prompt file
- [ ] Catch a bug with a test, then ship a reviewed PR

---

## 🎯 Stage 1: Set up the test runner (4 min)

```bash
pip install pytest
```
Create the tests folder:
```bash
mkdir -p tests
```

**✅ Checkpoint:** `pytest` is installed and `tests/` exists.

---

## 🎯 Stage 2: Generate tests (6 min)

**1.** Open [labs/starter/python/gallery/service.py](../starter/python/gallery/service.py), select the class, and run:
```markdown
/tests Follow our python-testing skill. Put tests in labs/starter/python/tests/test_service.py using pytest. Cover get_photo_detail (success and KeyError), filter_photos, and get_page.
```

**2.** Run them:
```bash
pytest
```

**✅ Checkpoint:** Green tests for detail, filtering, and pagination.

---

## 🎯 Stage 3: Add the edge cases (4 min)

```markdown
Add edge-case tests to tests/test_service.py:
- filter_photos with no tags and empty query returns all photos,
- a query matching a photographer name,
- get_page beyond the last page returns [],
- get_page with page=0 or per_page=0 returns [].
```
Run `pytest` again.

**✅ Checkpoint:** More tests, still green.

---

## 🧗 Stage 4 (Challenge): Create a reusable prompt file (5 min)

> You built a prompt file in Lab 1 — now build a testing one from scratch.

**Your goal:** Create `.github/prompts/generate-unit-tests.prompt.md` that generates pytest tests for a selected module in one command.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`mode: 'agent'`, `description`, `tools`).
- [ ] Tells Copilot to follow your `python-testing` skill and put tests under `tests/` named `test_*.py`.
- [ ] Requires happy-path, boundary, and each raised exception.
- [ ] Works when you select a module and run `/generate-unit-tests`.

<details><summary>💡 Stuck? Reveal a hint</summary>

Copy the frontmatter shape from your Lab 1 prompt file. In the body, state the requirements above and end with "ask me for the target file if none is selected, then write the tests and stop."

</details>

---

## 🧗 Stage 5 (Challenge): Catch a bug (3 min)

**Your goal:** Write a test asserting `most_viewed(1)` returns the single highest-viewed photo, run it, and — when it fails from the sort-direction bug — **quarantine** it so the suite stays green. You'll fix it in Lab 5.

**Done when:**
- [ ] You wrote the test and ran it (and saw it fail).
- [ ] It's marked skipped with a reason pointing to Lab 5.

<details><summary>💡 Stuck? Reveal a hint</summary>

After it fails, add `@pytest.mark.skip(reason="bug fixed in Lab 5")` above the test.

</details>

---

## 🚀 Ship it: PR + Copilot review (2 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:** `git push -u origin USERNAME/lab-3-tests`
3. **Open a PR**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** A pytest suite + reusable prompt file in a reviewed PR.

## ✅ Completion Checklist
- [ ] Installed pytest and generated tests
- [ ] Added edge-case tests
- [ ] Created `generate-unit-tests.prompt.md`
- [ ] Wrote a skipped test documenting the `most_viewed` bug
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 4: Reviewing Changes**.

### 🌟 Take-home challenge (do this on your own time)
Add `pytest --cov` (via `pytest-cov`) and get `gallery/service.py` to 100% line coverage. Ask Copilot which lines are uncovered and to write the missing tests.
