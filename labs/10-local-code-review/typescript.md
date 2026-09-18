# Lab 10 · TypeScript / React Track — Local Code Review Agent

**Goal:** Package your team's review knowledge into two focused **skills** and a read-only **Local Reviewer** agent, then use it as a pre-push gate on a real diff — catching a security smell and a test-coverage gap before anyone else sees your branch.

**Estimated Time:** ~28 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-10-local-review
```

> **Recommended prerequisite:** [Lab 1](../01-personalize-and-standardize/typescript.md) (agent & skill basics) and [Lab 4](../04-reviewing-changes/typescript.md) (review fundamentals). Not required, but this lab builds directly on both.

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
In src/lib/gallery-utils.ts, add an exported function `highlightMatch(text: string, query: string): string` that wraps every case-insensitive match of `query` inside `text` with <mark> tags and returns the result as an HTML string. Then update GalleryGrid.tsx to highlight the search query inside each photo's title, rendering the result with dangerouslySetInnerHTML. Follow our typescript.instructions.md. Don't add tests yet — that's for a later stage.
```
Accept the change.

> 💭 `highlightMatch("Sunset Landscape", "sun")` should return `"<mark>Sun</mark>set Landscape"`. Photo titles come from what a photographer uploads, and the search query is live keystrokes from the search box on the gallery page — neither is safe to treat as trusted HTML. Keep that in mind for Stage 2.

**✅ Checkpoint:** `gallery-utils.ts` has a new `highlightMatch` export (no tests yet), and `GalleryGrid.tsx` renders it with `dangerouslySetInnerHTML`.

---

## 🧗 Stage 2 (Challenge): Package a security review skill (5 min)

> **Training wheels off.** From here on, *you* write the prompts. Try first — reveal a hint only if you're stuck.

**Your goal:** Create `.github/skills/code-review-security/SKILL.md` — a checklist Copilot can apply to *any* diff.

**Use:** [.github/skills/javascript-typescript-jest/SKILL.md](../../.github/skills/javascript-typescript-jest/SKILL.md) as a reference for the file *shape* only.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Flags `dangerouslySetInnerHTML` / `innerHTML` / `eval` fed by user-controllable input (search boxes, uploaded titles/tags, query params) as **Blocking**.
- [ ] Flags hard-coded secrets/tokens and missing input validation at a trust boundary as **Blocking**.
- [ ] Lists a couple of **Suggestion**-level items (e.g., unescaped input in logs, broad `catch` blocks that swallow errors).
- [ ] Tells the reviewer to cite `file:line` and propose the safe alternative, not just name the problem.

**Prove it:** with the skill saved, ask Copilot (default Agent mode) to `Review my unstaged changes for security issues`, and confirm it calls out the `dangerouslySetInnerHTML` call the way your skill describes.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/code-review-security/` for reviewing diffs for security issues: flag `dangerouslySetInnerHTML`/`innerHTML`/`eval` fed by any user-controllable value (search input, uploaded content, query params) without sanitizing first, hard-coded secrets/tokens, and missing validation at trust boundaries as Blocking; unescaped input in logs and broad catch blocks as Suggestion. Require file:line and a suggested fix for every finding. Add `name` and `description` frontmatter.

</details>

**✅ Checkpoint:** The skill exists and explicitly calls out unsanitized HTML rendering.

---

## 🧗 Stage 3 (Challenge): Package a test-coverage review skill (5 min)

**Your goal:** Create `.github/skills/code-review-coverage/SKILL.md` that turns "always include unit tests… include edge cases involving null, point of failure, and unexpected input" (from our [copilot-instructions.md](../../.github/copilot-instructions.md)) into something Copilot *checks for* in review, not just something it writes.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Flags a new exported function/component with no test file or test case as **Blocking**.
- [ ] Flags missing edge cases — `null`/`undefined`/empty input, boundary values, an invalid-input case — as **Suggestion**.
- [ ] Flags a changed function whose existing tests weren't updated for the new branch.
- [ ] Tells the reviewer to name the missing case and propose the input → expected output, not just say "add more tests."

**Prove it:** ask Copilot to `Review my unstaged changes for test coverage`, and confirm it flags the untested `highlightMatch`.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/code-review-coverage/` for reviewing diffs for test coverage: flag any new exported function/component/method with no accompanying Jest/RTL test as Blocking; flag missing null/empty/boundary/invalid-input cases and untested failure paths as Suggestion; flag tests that assert on implementation details instead of behavior. For each finding, require a specific proposed test case (input → expected output). Add `name` and `description` frontmatter.

</details>

**✅ Checkpoint:** The skill exists and explicitly calls out null/boundary/invalid-input cases.

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

Create it via `/agents` → **New Agent** (or **Configure Chat** ⚙ → **Agents** tab), or add the file directly under `.github/agents/`. Give it `tools: ['search/codebase', 'search']` — deliberately no `editFiles`. In the body: "You are a senior TypeScript/React reviewer running a pre-push gate on this developer's local, uncommitted changes. Never edit files. Check the diff against the `code-review-security` and `code-review-coverage` skills and any scoped instructions. Report Blocking / Suggestions / Nits with file:line and a fix. End with one verdict line: ✅ Ready to push, or 🚫 Not ready — N blocking item(s)."

</details>

**✅ Checkpoint:** Selecting **Local Reviewer** in the mode picker and asking it to review returns grouped findings and a verdict line.

---

## 🎯 Stage 5: Run the gate before you push (5 min)

**Goal:** Use your own tooling on your own risky diff.

**1.** Switch Chat to **Local Reviewer** and ask:
```markdown
Review my unstaged changes and give me a verdict.
```
Expect at least one **Blocking** item on the `dangerouslySetInnerHTML` call, and another on the missing tests for `highlightMatch`. The verdict should read `🚫 Not ready`.

**2. Fix the security finding** — the safest fix isn't escaping the HTML string, it's not building one at all:
```markdown
Refactor highlightMatch so GalleryGrid no longer needs dangerouslySetInnerHTML. Return an array of segments (text + isMatch) that React can render directly, wrapping matches in a <mark> element. Keep matching case-insensitive and escape any regex special characters in the query.
```

**3. Fix the coverage finding** — add tests:
```markdown
Add a describe('highlightMatch', ...) block to gallery-utils.test.ts covering: no query, no match, a single match, multiple matches, case-insensitivity, and a query containing regex special characters like "(" or ".".
```
Run them:
```bash
npm test
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
- [ ] Created a diff with a real `dangerouslySetInnerHTML` risk and no tests
- [ ] Built `skills/code-review-security/SKILL.md`
- [ ] Built `skills/code-review-coverage/SKILL.md`
- [ ] Built `agents/local-reviewer.agent.md` (read-only, verdict line)
- [ ] Got a `🚫 Not ready` verdict, then fixed both findings
- [ ] Got a `✅ Ready to push` verdict before pushing
- [ ] Opened a PR and compared it against the Copilot cloud review

## 🏁 What's Next?

You've built a personal pre-push quality gate. If you haven't yet, explore the **[QA & Testing track](../06-tdd-from-workitem/README.md)** or the **[Migration lab](../09-tcl-to-typescript/README.md)**.

### 🌟 Take-home challenge (do this on your own time)
- Add a third skill (performance, accessibility, or your team's top recurring PR comment) and wire it into your **Local Reviewer**.
- Drop `code-review-security/SKILL.md`, `code-review-coverage/SKILL.md`, and `local-reviewer.agent.md` into a real repository and run the gate on your next real change.
