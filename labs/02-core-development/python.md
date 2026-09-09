# Lab 2 · Python Track — Core Development

**Feature:** Implement `GalleryService.get_photo_detail` in the starter module. Right now it's a stub that raises `NotImplementedError`. You'll make it return a real, formatted detail view — the Python equivalent of the app's "photo detail" screen.

**Estimated Time:** ~40 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-2-core-dev
cd labs/starter/python
```

## ✅ Definition of Done
```bash
python main.py   # should also print a detail block without errors
```
- [ ] `get_photo_detail("4")` returns a **multi-line string** with title, photographer, tags, and likes/downloads/views.
- [ ] An **unknown id** raises `KeyError` (not `NotImplementedError`).
- [ ] `main.py` prints the detail for one photo.
- [ ] Code follows your Lab 1 `python.instructions.md` (type hints, docstring).

## What You'll Learn
- [ ] Explore code with Ask, `/explain`, and `#codebase`
- [ ] Use inline & Next Edit Suggestions
- [ ] Plan before implementing
- [ ] Implement with Agent mode + your Lab 1 artifacts
- [ ] Verify by running and ship a reviewed PR

---

## 🎯 Stage 1: Understand the code (6 min)

**1.** Open [labs/starter/python/gallery/service.py](../starter/python/gallery/service.py). Read the `get_photo_detail` stub and the `Photo` model in [models.py](../starter/python/gallery/models.py).

**2.** Select the `get_photo_detail` method, open Chat (Ask mode), and run:
```markdown
/explain
```

**3.** Ask with codebase context:
```markdown
#codebase What fields does `Photo` have, and how is `GalleryService` constructed? What should `get_photo_detail` return and how should it handle an unknown id?
```

**✅ Checkpoint:** You know the `Photo` fields and the intended return/error behavior.

---

## 🎯 Stage 2: Move fast with inline suggestions (8 min)

**1.** Delete the `raise NotImplementedError(...)` line. Replace the docstring's TODO with an intent line and pause for inline suggestions:
```python
# Find the photo by id, then build a multi-line detail string.
```
**2.** Start typing and let Copilot complete the lookup, e.g.:
```python
photo = next((p for p in self._photos if p.id == photo_id), None)
```
Accept with `Tab`, then use **Next Edit Suggestions** to move to the formatting and the error case.

**✅ Checkpoint:** You have a lookup and the start of a formatted string from inline suggestions.

---

## 🧗 Stage 3 (Challenge): Plan the rest (6 min)

> **Your turn to prompt.** You've seen the mechanics — now drive Plan mode yourself.

**Your goal:** Use **Plan mode** to produce an ordered plan to implement `get_photo_detail` in `gallery/service.py`: look up the photo by id, raise `KeyError` if missing, otherwise return a multi-line detail (title, photographer, tags, likes/downloads/views), and update `main.py` to print the detail for photo "4".

**Done when:**
- [ ] You wrote your own Plan-mode prompt (no copy/paste from earlier stages).
- [ ] The plan covers the success path, the missing-id error, and the `main.py` update.
- [ ] It references following your `python.instructions.md` (type hints, docstring).

<details><summary>💡 Stuck? Reveal a hint</summary>

Describe the method contract as bullets: lookup → raise `KeyError` if not found → return a multi-line string. Add "follow our python.instructions.md" and "update main.py to print detail for '4'."

</details>

---

## 🧗 Stage 4 (Challenge): Implement with Agent mode (12 min)

**Your goal:** Switch to **Agent** mode and implement your plan across `service.py` and `main.py`. Your `python.instructions.md` applies automatically to `.py` files.

**Done when:**
- [ ] You wrote your own Agent prompt to implement the plan.
- [ ] `get_photo_detail` returns the multi-line detail and raises `KeyError` for an unknown id.
- [ ] The method keeps its type hints and docstring.
- [ ] You reviewed each edit (**Keep**/**Undo**) and `main.py` calls the method.

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask Agent to "implement the approved plan for get_photo_detail in service.py and update main.py," then verify against the Definition of Done at the top.

</details>

---

## 🎯 Stage 5: Verify & iterate (5 min)

1. Run it:
   ```bash
   python main.py
   ```
2. Try the error path in a quick REPL or add a temporary call for id `"999"` and confirm you get a `KeyError`. Remove the temporary call afterward.
3. If anything's off, select the code and use `/fix`, or switch to your **Reviewer** agent from Lab 1 and ask it to review.

**✅ Checkpoint:** All Definition-of-Done items pass.

---

## 🚀 Ship it: PR + Copilot review (5 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:**
   ```bash
   git push -u origin USERNAME/lab-2-core-dev
   ```
3. **Open a Pull Request**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** A finished feature in a PR reviewed by Copilot.

## ✅ Completion Checklist
- [ ] Explored the stub with `/explain` and `#codebase`
- [ ] Accepted inline suggestions for the lookup
- [ ] Drafted the change in Plan mode
- [ ] Implemented the method + `main.py` in Agent mode
- [ ] Verified success and error paths
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 3: Unit Testing** — you'll test the method you just wrote.

### 🌟 Take-home challenge (do this on your own time)
Add a `search(query: str) -> list[Photo]` convenience method and a `--detail <id>` command-line flag to `main.py`. Plan it, implement it in Agent mode, and open a PR.
