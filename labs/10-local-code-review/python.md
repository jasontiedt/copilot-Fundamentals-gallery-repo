# Lab 10 · Python Track — Local Code Review Agent

**Goal:** Package your team's review knowledge into two focused **skills** and a read-only **Local Reviewer** agent, then use it as a pre-push gate on a real diff — catching a path-traversal smell and a test-coverage gap before anyone else sees your branch.

**Estimated Time:** ~28 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-10-local-review
cd labs/starter/python
```

> **Recommended prerequisite:** [Lab 1](../01-personalize-and-standardize/python.md) (agent & skill basics), [Lab 3](../03-unit-testing/python.md) (pytest is set up), and [Lab 4](../04-reviewing-changes/python.md) (review fundamentals). Not required, but this lab builds directly on all three. No `tests/` folder yet? Repeat [Lab 3, Stage 1](../03-unit-testing/python.md#-stage-1-set-up-the-test-runner-4-min) first.

## What You'll Learn
- [ ] Package a security checklist into a `code-review-security` skill
- [ ] Package a test-coverage checklist into a `code-review-coverage` skill
- [ ] Build a read-only **Local Reviewer** agent that consults both and gives a ship/no-ship verdict
- [ ] Run it on a real diff *before* committing, fix what it flags, and get a clean pass
- [ ] Compare your local verdict to the cloud Copilot PR review

---

## 🎯 Stage 1: Make something worth reviewing (4 min)

**Goal:** Give yourself a realistic diff with a real risk baked in — not a toy example.

In **Agent mode**:
```markdown
In gallery/service.py, add a method `export_photographer_report(self, photographer_name: str, output_dir: str = "reports") -> str` that filters photos by photographer_name (reuse filter_photos), writes a plain-text report (title, likes, views per photo) to a file at os.path.join(output_dir, photographer_name + ".txt"), and returns the path written. Follow our python.instructions.md. Don't add tests yet — that's for a later stage.
```
Accept the change.

> 💭 `photographer_name` is arbitrary text a caller supplies — nothing stops it from containing `../` segments. Keep that in mind for Stage 2.

**✅ Checkpoint:** `service.py` has a new `export_photographer_report` method (no tests yet) that builds its output path directly from `photographer_name`.

---

## 🧗 Stage 2 (Challenge): Package a security review skill (5 min)

> **Training wheels off.** From here on, *you* write the prompts. Try first — reveal a hint only if you're stuck.

**Your goal:** Create `.github/skills/code-review-security/SKILL.md` — a checklist Copilot can apply to *any* diff.

**Use:** [.github/skills/javascript-typescript-jest/SKILL.md](../../.github/skills/javascript-typescript-jest/SKILL.md) as a reference for the file *shape* only.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Flags file paths built with `os.path.join`/`open()` from caller-supplied input without confirming the resolved path stays inside the intended directory (path traversal) as **Blocking**.
- [ ] Flags `eval`/`exec`/`pickle.loads` on untrusted input, hard-coded secrets, and missing input validation at a trust boundary as **Blocking**.
- [ ] Lists a couple of **Suggestion**-level items (e.g., unredacted input in logs, bare `except:` blocks that swallow errors).
- [ ] Tells the reviewer to cite `file:line` and propose the safe alternative, not just name the problem.

**Prove it:** with the skill saved, ask Copilot (default Agent mode) to `Review my unstaged changes for security issues`, and confirm it calls out the unsanitized path in `export_photographer_report`.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/code-review-security/` for reviewing diffs for security issues: flag file paths built from caller-supplied input (os.path.join/open) without confirming the resolved path stays inside the intended directory as Blocking, alongside eval/exec/pickle.loads on untrusted data, hard-coded secrets, and missing validation at trust boundaries; unredacted input in logs and bare except blocks as Suggestion. Require file:line and a suggested fix for every finding. Add `name` and `description` frontmatter.

</details>

**✅ Checkpoint:** The skill exists and explicitly calls out unsanitized file-path construction.

---

## 🧗 Stage 3 (Challenge): Package a test-coverage review skill (5 min)

**Your goal:** Create `.github/skills/code-review-coverage/SKILL.md` that turns "always include unit tests… include edge cases involving null, point of failure, and unexpected input" (from our [copilot-instructions.md](../../.github/copilot-instructions.md)) into something Copilot *checks for* in review, not just something it writes.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Flags a new public function/method with no test file or test case as **Blocking**.
- [ ] Flags missing edge cases — empty/`None` input, boundary values, an invalid-input case — as **Suggestion**.
- [ ] Flags a changed function whose existing tests weren't updated for the new branch.
- [ ] Tells the reviewer to name the missing case and propose the input → expected output, not just say "add more tests."

**Prove it:** ask Copilot to `Review my unstaged changes for test coverage`, and confirm it flags the untested `export_photographer_report`.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/code-review-coverage/` for reviewing diffs for test coverage: flag any new public function/method with no accompanying pytest test as Blocking; flag missing empty/None/boundary/invalid-input cases and untested failure paths (raised exceptions) as Suggestion; flag tests that assert on implementation details instead of behavior. For each finding, require a specific proposed test case (input → expected output). Add `name` and `description` frontmatter.

</details>

**✅ Checkpoint:** The skill exists and explicitly calls out None/boundary/invalid-input cases.

---

## 🧗 Stage 4 (Challenge): Build the Local Reviewer agent (5 min)

**Your goal:** Create `.github/agents/local-reviewer.agent.md` — a **read-only** agent that runs both skills against your local diff and ends with a ship/no-ship verdict.

**Use:** [.github/agents/Plan.agent.md](../../.github/agents/Plan.agent.md) as a reference for the file *shape* only — write your own behavior.

**Done when your agent:**
- [ ] Has frontmatter with `name`, `description`, and `tools` — **no** edit tool.
- [ ] Tells the model to review the current diff (staged + unstaged) against both `code-review-*` skills and any scoped `.instructions.md`.
- [ ] Groups findings as **Blocking / Suggestions / Nits**, each with `file:line` and a fix.
- [ ] Ends every response with a one-line verdict: `✅ Ready to push` or `🚫 Not ready — N blocking item(s)`.
- [ ] Shows up in the Chat mode dropdown.

<details><summary>💡 Stuck? Reveal a hint</summary>

Create it via `/agents` → **New Agent** (or **Configure Chat** ⚙ → **Agents** tab), or add the file directly under `.github/agents/`. Give it `tools: ['search/codebase', 'search']` — deliberately no `editFiles`. In the body: "You are a senior Python reviewer running a pre-push gate on this developer's local, uncommitted changes. Never edit files. Check the diff against the `code-review-security` and `code-review-coverage` skills and any scoped instructions. Report Blocking / Suggestions / Nits with file:line and a fix. End with one verdict line: ✅ Ready to push, or 🚫 Not ready — N blocking item(s)."

</details>

**✅ Checkpoint:** Selecting **Local Reviewer** in the mode picker and asking it to review returns grouped findings and a verdict line.

---

## 🎯 Stage 5: Run the gate before you push (5 min)

**Goal:** Use your own tooling on your own risky diff.

**1.** Switch Chat to **Local Reviewer** and ask:
```markdown
Review my unstaged changes and give me a verdict.
```
Expect at least one **Blocking** item on the unsanitized path in `export_photographer_report`, and another on the missing tests. The verdict should read `🚫 Not ready`.

**2. Fix the security finding:**
```markdown
Harden export_photographer_report: reject a photographer_name containing path separators or "..", then confirm the resolved absolute path stays inside output_dir (os.path.realpath plus a containment check) before writing. Raise ValueError for an invalid name.
```

**3. Fix the coverage finding** — add tests:
```markdown
Add tests to tests/test_service.py for export_photographer_report: a normal photographer name writes a file under output_dir (use the tmp_path fixture), an unknown photographer still writes an (empty) report, and a name containing "../" or a path separator raises ValueError. Use @pytest.mark.parametrize for the invalid names.
```
Run them:
```bash
pytest
```

**4.** Ask your **Local Reviewer** again:
```markdown
Review my unstaged changes again and give me a verdict.
```

**✅ Checkpoint:** The verdict reads `✅ Ready to push`.

---

## 🚀 Ship it: PR + compare reviews (4 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:**
   ```bash
   git push -u origin USERNAME/lab-10-local-review
   ```
3. **Open a Pull Request** and, under **Reviewers**, request **Copilot**.
4. **Compare:** did the cloud review catch anything your **Local Reviewer** missed? Did it agree on the same Blocking item? Note the difference — local review is a fast first pass, not a replacement for it.

**🎉 Success:** A PR that was already clean by the time a human (or Copilot) looked at it.

## ✅ Completion Checklist
- [ ] Created a diff with a real path-traversal risk and no tests
- [ ] Built `skills/code-review-security/SKILL.md`
- [ ] Built `skills/code-review-coverage/SKILL.md`
- [ ] Built `agents/local-reviewer.agent.md` (read-only, verdict line)
- [ ] Got a `🚫 Not ready` verdict, then fixed both findings
- [ ] Got a `✅ Ready to push` verdict before pushing
- [ ] Opened a PR and compared it against the Copilot cloud review

## 🏁 What's Next?

You've built a personal pre-push quality gate. If you haven't yet, explore the **[QA & Testing track](../06-tdd-from-workitem/README.md)**, the **[QA Signoff lab](../11-qa-ux-validation/README.md)** (validate the deployed UX against work items), or the **[Migration lab](../09-tcl-to-typescript/README.md)**.

### 🌟 Take-home challenge (do this on your own time)
- Add a third skill (performance, accessibility, or your team's top recurring PR comment) and wire it into your **Local Reviewer**.
- Drop `code-review-security/SKILL.md`, `code-review-coverage/SKILL.md`, and `local-reviewer.agent.md` into a real repository and run the gate on your next real change.
