# Lab 4 · Java Track — Reviewing Changes

**Goal:** Practice Copilot-assisted review end to end, from inline hints to a Pull Request review — using the gallery starter service.

**Estimated Time:** ~18 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-4-review
cd labs/starter/java
```

## What You'll Learn
- [ ] Inline review, Source Control review, commit-message generation
- [ ] Request a Copilot PR review and triage it
- [ ] Capture review standards as reusable artifacts

---

## 🎯 Stage 1: Make something to review (3 min)

Give yourself a small, realistic diff. In Agent mode:
```markdown
In GalleryService.java, add a `count()` method that returns the number of photos, with a one-line Javadoc. Follow our java.instructions.md.
```
Accept the change.

**✅ Checkpoint:** You have an unstaged change in `GalleryService.java`.

---

## 🎯 Stage 2: Inline review (3 min)

1. **Select** the code you just added.
2. **Right-click the selection → Copilot → Review and Comment** (the menu may read **Generate Code → Review**). Comments appear inline and in the **Comments** panel.
3. Read the inline comments; **accept** or **discard** each.

**✅ Checkpoint:** You've seen Copilot's inline feedback on your selection.

---

## 🎯 Stage 3: Review the whole change in Source Control (4 min)

1. Open the **Source Control** view.
2. Hover **Changes** → click **Code Review - Changes** (the review icon).

   ![Code review button](../../demos/images/code-review.png)
3. Copilot's comments appear inline and in the **Problems** tab. Address anything worthwhile.
4. Optional: switch Chat to your **Reviewer** agent from Lab 1 and ask:
   ```markdown
   Review my staged changes against our instructions.
   ```

**✅ Checkpoint:** You compared the built-in review with your custom Reviewer agent.

---

## 🎯 Stage 4: Commit, push & get a Copilot PR review (5 min)

1. **Stage** your changes.
2. In the commit box, click **Generate Commit Message with Copilot**, review, and **Commit**.
3. **Push:**
   ```bash
   git push -u origin USERNAME/lab-4-review
   ```
4. **Open a Pull Request.**
5. Under **Reviewers**, next to **Copilot**, click **Request**. When it finishes, **triage** each comment (labeled **High / Medium / Low**) — resolve, reply, or click **Apply suggestion**.

**✅ Checkpoint:** Your PR has Copilot review comments and you've actioned them.

---

## 🧗 Stage 5 (Challenge): Standardize reviews (4 min)

> **Your turn.** Turn everything you noticed in Stages 2–4 into reusable standards — you write them.

**Your goal:** Create two **take-home artifacts** so every future review is consistent:
1. `.github/pull_request_template.md`
2. `.github/instructions/code-review.instructions.md` (scoped with `applyTo` for `**/*.java`)

**Done when:**
- [ ] The PR template prompts for *what/why*, *how to test*, and a review checklist.
- [ ] The review instructions capture what *your* reviewer (and Reviewer agent) should look for.
- [ ] Both reflect the real feedback you saw in Stages 2–4 — not a generic copy.

**🎉 Success:** Commit these two files to your PR and you're done.

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask Copilot: "Draft a concise PR template and a `code-review.instructions.md` (applyTo `**/*.java`) that checks no null from public APIs (Optional), specific exceptions, records for immutable data, Streams over loops, and JUnit 5 coverage." Then trim to your team's reality.

</details>

## ✅ Completion Checklist
- [ ] Created a change and used inline review
- [ ] Ran a Source Control review
- [ ] Generated a commit message
- [ ] Got a Copilot review on a PR and triaged it
- [ ] Added a PR template + review instructions

## 🏁 What's Next?

Continue to **Lab 5: Debug, Document & Delegate**.

### 🌟 Take-home challenge (do this on your own time)
Enable **Copilot code review** as an automatic reviewer on one of your real repositories (repo/org settings), then open a PR and compare its automated feedback to your team's checklist.
