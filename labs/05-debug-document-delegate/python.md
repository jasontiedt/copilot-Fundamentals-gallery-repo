# Lab 5 · Python Track — Debug, Document & Delegate

**Goal:** Fix the planted `most_viewed` bug guided by your Lab 3 test, document the service, and delegate a follow-up to the Copilot coding agent.

**Estimated Time:** ~22 minutes *(bonus lab)*
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-5-delegate
cd labs/starter/python
```

## What You'll Learn
- [ ] Debug a failing test with `/fix`
- [ ] Document code with `/doc`
- [ ] Delegate a task to the Copilot coding agent and review its PR

---

## 🎯 Stage 1: Debug the real bug (6 min)

**1.** Re-enable the test you quarantined in Lab 3: remove the `@pytest.mark.skip(...)` from the `most_viewed` test in `tests/test_service.py`.

**2.** Run it and watch it fail:
```bash
pytest -k most_viewed
```

**3.** Open [gallery/service.py](../starter/python/gallery/service.py), select `most_viewed`, and use **`/fix`** — describe the bug in your own words and let Copilot propose the correction.

**4.** Re-run `pytest` until everything, including the previously-skipped test, is green.

<details><summary>💡 Stuck? Reveal a hint</summary>

The sort direction is wrong — `most_viewed` should return the *highest* views first. Tell `/fix` exactly that.

</details>

**✅ Checkpoint:** All tests, including the previously-skipped one, are green.

---

## 🧗 Stage 2 (Challenge): Document your work (5 min)

**Your goal:** Use Copilot to document `GalleryService` and produce a short usage snippet — you choose the commands.

**Done when:**
- [ ] The service methods have concise docstrings.
- [ ] You generated a 6–8 line "Using GalleryService" section for the module README.

<details><summary>💡 Stuck? Reveal a hint</summary>

`/doc` documents a selection. Then ask Copilot to "write a 6–8 line usage section showing filter_photos, get_page, get_photo_detail, and most_viewed."

</details>

---

## 🧗 Stage 3 (Challenge): Delegate to the Copilot coding agent (6 min)

**Your goal:** Create a GitHub issue to **add sorting options to `GalleryService`** (newest / most viewed / most liked) with clear acceptance criteria, then hand it to the **Copilot coding agent** and let it open a PR.

**Done when:**
- [ ] An issue exists with a short acceptance-criteria checklist (you wrote it).
- [ ] Copilot is assigned and has started a Pull Request.

<details><summary>💡 Stuck? Reveal a hint</summary>

With the **GitHub MCP server** (Lab 1), ask Agent to "create an issue titled ... with acceptance criteria." No MCP? Create it on github.com → Issues → New issue, then assign **Copilot** as the assignee.

</details>

---

## 🎯 Stage 4: Review the agent's PR (3 min)

1. Open the Pull Request Copilot created.
2. Click **View session** to see how it worked through the task.
3. Review the diff — leave a comment or request a change just like a human PR.

**✅ Checkpoint:** You've reviewed an agent-authored PR.

---

## 🚀 Ship it: your own PR + Copilot review (2 min)

1. **Commit** your bug fix + docs (generate the message with Copilot).
2. **Push:** `git push -u origin USERNAME/lab-5-delegate`
3. **Open a PR**, **request a Copilot review**, and **triage** comments.

**🎉 Success:** You fixed, documented, delegated, and shipped — the full loop.

## ✅ Completion Checklist
- [ ] Re-enabled the test and fixed `most_viewed` with `/fix`
- [ ] Documented the service with `/doc`
- [ ] Created an issue and assigned Copilot
- [ ] Reviewed the agent's PR and session
- [ ] Opened your own PR and got a Copilot review

## 🏁 What's Next?

You've completed the Fundamentals Labs! 🎉 Revisit the **🌟 take-home challenges** at the end of each lab, and start applying your `.github/` customization pack to your real repositories.

### 🌟 Take-home challenge (do this on your own time)
Delegate a real backlog item from one of your projects to the Copilot coding agent. Write a crisp issue with acceptance criteria, assign Copilot, then review and iterate on its PR.
