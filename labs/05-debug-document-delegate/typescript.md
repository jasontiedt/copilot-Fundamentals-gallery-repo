# Lab 5 · TypeScript / React Track — Debug, Document & Delegate

**Goal:** Fix a real sort bug guided by a test, document your gallery utilities, and delegate a follow-up to the Copilot coding agent.

**Estimated Time:** ~22 minutes *(bonus lab)*
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-5-delegate
```

## What You'll Learn
- [ ] Debug a failing test with `/fix`
- [ ] Document code with `/doc`
- [ ] Delegate a task to the Copilot coding agent and review its PR

---

## 🎯 Stage 1: Debug a real bug (6 min)

**Goal:** Make a "top viewed" helper, then use Copilot to debug it.

**1.** In Agent mode, ask Copilot to add `topByViews(photos: Photo[], n: number): Photo[]` to `src/lib/gallery-utils.ts` (returns the n most-viewed photos, highest first) **and** a Vitest test asserting the first result is the highest-viewed photo.

**2.** Run `npm test`, then practice the debug loop **in your own words**:
- If the test fails, select the function and use **`/fix`** with your own one-line description of what's wrong.
- If it passes first try, flip the sort to ascending on purpose, watch it fail, read Copilot's explanation, then `/fix` it back.

**✅ Checkpoint:** `topByViews` is correct and its test is green.

---

## 🧗 Stage 2 (Challenge): Document your work (5 min)

**Your goal:** Use Copilot to document your gallery utilities and produce a short usage snippet — you choose the commands.

**Done when:**
- [ ] Each exported function has concise JSDoc.
- [ ] You generated a 6–8 line "Gallery utils" usage section for a README.

<details><summary>💡 Stuck? Reveal a hint</summary>

`/doc` documents a selection. Then ask Copilot to "write a 6–8 line usage section showing how to import and call filterPhotos, paginate, and topByViews."

</details>

---

## 🧗 Stage 3 (Challenge): Delegate to the Copilot coding agent (6 min)

**Your goal:** Create a GitHub issue for a **sort dropdown** feature (newest / most viewed / most liked) with clear acceptance criteria, then hand it to the **Copilot coding agent** and let it open a PR.

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

1. **Commit** your `topByViews` + docs (generate the message with Copilot).
2. **Push:** `git push -u origin USERNAME/lab-5-delegate`
3. **Open a PR**, **request a Copilot review**, and **triage** comments.

**🎉 Success:** You fixed, documented, delegated, and shipped — the full loop.

## ✅ Completion Checklist
- [ ] Built `topByViews` and fixed it with `/fix`
- [ ] Documented the utilities with `/doc`
- [ ] Created an issue and assigned Copilot
- [ ] Reviewed the agent's PR and session
- [ ] Opened your own PR and got a Copilot review

## 🏁 What's Next?

You've completed the Fundamentals Labs! 🎉 Revisit the **🌟 take-home challenges** at the end of each lab, and start applying your `.github/` customization pack to your real repositories.

### 🌟 Take-home challenge (do this on your own time)
Delegate a real backlog item from one of your projects to the Copilot coding agent. Write a crisp issue with acceptance criteria, assign Copilot, then review and iterate on its PR.
