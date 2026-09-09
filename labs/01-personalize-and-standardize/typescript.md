# Lab 1 · TypeScript / React Track — Personalize & Standardize Copilot

Make Copilot write code the way **your team** writes it. In this track you'll tailor Copilot for the **Photo Gallery & Portfolio** app (Next.js 15 + TypeScript + Tailwind) and walk away with a reusable customization pack.

**Estimated Time:** ~30 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-1-personalize
```

## What You'll Learn
- [ ] Set **personal instructions**, pick a model, and check your usage
- [ ] Read the repo's **custom instructions** and add a **scoped** `.instructions.md`
- [ ] Create a reusable **prompt file**
- [ ] Package testing conventions into a **skill**
- [ ] Build a **custom agent** for code review
- [ ] **Share** your setup and **ship** a PR reviewed by Copilot

---

## 🎯 Stage 1: Individual setup (4 min)

**Goal:** Tune Copilot for *you* before you tune it for the team.

**1. Personal instructions** (apply to *all* your Copilot chats, everywhere):
- Go to [https://github.com/copilot](https://github.com/copilot)
- Click your avatar (bottom-left) → **Personal instructions**
- Add something that reflects how you like answers, for example:
  ```markdown
  Be concise. Prefer TypeScript with explicit types. Show a short code sample before a long explanation.
  ```

**2. Model picker:** In VS Code Copilot Chat, open the model dropdown and note which models are available. You'll compare two later.

**3. Usage:** Check your premium request usage at [https://github.com/settings/copilot/features](https://github.com/settings/copilot/features) so you know what a "premium request" costs.

**✅ Checkpoint:** You have personal instructions saved and know where your usage lives.

---

## 🎯 Stage 2: Repository standards (6 min)

**Goal:** Make Copilot follow this project's conventions automatically.

**1. Read what already exists.** Open [.github/copilot-instructions.md](../../.github/copilot-instructions.md). This repo-wide file is injected into Copilot's context for this workspace. Notice the sections on component patterns, styling, and TypeScript usage.

**2. See it in action.** In Copilot Chat (Ask mode), run:
```markdown
Following this repo's conventions, how should I structure a new stats card component?
```
Notice how the answer echoes the `SectionContainer` / dark-mode / Tailwind patterns from the instructions file.

**3. Add a *scoped* instructions file.** Repo-wide instructions apply everywhere; **scoped** instructions apply only to files matching a glob. Create a new file:

`.github/instructions/typescript.instructions.md`
```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---
# TypeScript & React conventions

- Use function components with a typed `Props` interface (no `React.FC`).
- Prefer `type`/`interface` over inline object types for props.
- Co-locate a component's types in the same file and export both.
- Use `clsx`/template literals for conditional Tailwind classes; always include dark-mode variants.
- Handle loading and empty states explicitly in data-driven components.
- Name event handlers `handleX`; name booleans `isX`/`hasX`.
```

> 💡 **Shortcut:** Open Chat → gear icon → **Generate Instructions** to have Copilot draft a starting point from your codebase, then trim it.

**✅ Checkpoint:** Editing a `.tsx` file, ask Copilot to "add a prop" and confirm it follows your scoped rules.

---

## 🎯 Stage 3: A reusable prompt file (5 min)

**Goal:** Capture a task you repeat into a one-command **prompt file**.

**1. Study an example.** Open [.github/prompts/generate-new-ui.prompt.md](../../.github/prompts/generate-new-ui.prompt.md) and note the frontmatter (`mode`, `description`, `tools`).

**2. Create your own.** You frequently need typed domain models with matching mock data. Create:

`.github/prompts/gallery-model.prompt.md`
```markdown
---
mode: 'agent'
description: 'Scaffold a typed gallery domain model with matching mock data'
tools: ['codebase', 'editFiles']
---

# Generate a gallery domain model

Create a TypeScript model for a gallery entity in `src/lib/`.

## Requirements
- Export an `interface` for the entity with explicit field types.
- Fields: `id: string`, `title: string`, `tags: string[]`, `likes: number`, `createdAt: string` (ISO).
- Add a typed factory `createMock<Entity>(count: number)` that returns realistic sample data.
- Match the style of the existing `src/lib/mock-photo-data.ts`.
- Include JSDoc on the exported interface.

Ask me for the entity name, then generate the file and a short usage example.
```

**3. Run it.** In Chat, type `/gallery-model` and pass a name:
```markdown
/gallery-model an Album entity
```

**✅ Checkpoint:** Copilot generates a typed model + mock factory in one command.

---

## 🧗 Stage 4 (Challenge): Package a skill (6 min)

> **Training wheels off.** From here on, *you* write the prompts. Try first — reveal a hint only if you're stuck.

**Your goal:** Create a **skill** at `.github/skills/typescript-testing/SKILL.md` that captures your team's React component-testing conventions.

**Use:** Copilot Chat to draft it, then edit to taste. The existing [.github/skills/javascript-typescript-jest/SKILL.md](../../.github/skills/javascript-typescript-jest/SKILL.md) shows the *shape* only.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Says where tests live and how they're named.
- [ ] Prefers accessible queries and `userEvent` over implementation details.
- [ ] Lists the minimum cases every component test should cover.

**Prove it:** ask Copilot to "write a test for FeatureCard following our testing skill" and confirm it obeys your rules.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/typescript-testing/` for our React Testing Library conventions: co-located `*.test.tsx`, query by role/label/text, use `userEvent`, assert user-visible behavior, and always cover render + empty/loading + one interaction. Add `name` and `description` frontmatter.

</details>

---

## 🧗 Stage 5 (Challenge): Build a custom agent (6 min)

**Your goal:** Create a **Reviewer** agent at `.github/agents/Reviewer.agent.md` that reviews changes against your instructions and **never edits code**.

**Use:** [.github/agents/Plan.agent.md](../../.github/agents/Plan.agent.md) as a reference for the file *shape* only — write your own behavior.

**Done when your agent:**
- [ ] Has frontmatter with `name`, `description`, and `tools`.
- [ ] Tells the model to review (not edit) and to group findings by severity.
- [ ] References your `copilot-instructions.md` / scoped instructions.
- [ ] Shows up in the Chat mode dropdown and returns a checklist when run on a change.

<details><summary>💡 Stuck? Reveal a hint</summary>

Reuse the frontmatter keys from `Plan.agent.md` (`name`, `description`, `tools`, optional `focusArea`). In the body: "You are a senior reviewer for a Next.js + TypeScript + Tailwind app. Do not edit code. Report **Blocking / Suggestions / Nits** with file+line, checked against our instructions."

</details>

---

## 🎯 Stage 6: Share with your team (3 min)

**Goal:** Spread good prompts so the whole team levels up.

**1. Export a chat:** `Ctrl/Cmd + Shift + P` → **Chat: Export Chat…** → save the `.json`. Share it in a PR or chat.

**2. Import a chat:** `Ctrl/Cmd + Shift + P` → **Chat: Import Chat…** to load a teammate's successful conversation.

**3. Shared conversations (github.com):** At [https://github.com/copilot](https://github.com/copilot), start a chat, click **Share**, and copy the link. Manage them via avatar → **Manage shared conversations**.

**✅ Checkpoint:** You exported one chat and know how to share on github.com.

---

## 🚀 Ship it: PR + Copilot review (5 min)

You just created real, reusable files. Ship them like production work.

1. **Stage & commit** — in Source Control, stage your new `.github/**` files, then hover the message box → **Generate Commit Message with Copilot** → commit.
2. **Push** your branch:
   ```bash
   git push -u origin USERNAME/lab-1-personalize
   ```
3. **Open a Pull Request** (VS Code GitHub PR extension, or the link Git prints in the terminal).
4. **Request a Copilot review:** On the PR page, in **Reviewers**, add **Copilot**. Wait for it to comment.
5. **Triage** Copilot's comments — resolve, reply, or apply suggestions.

**🎉 Success:** A PR containing your customization pack, reviewed by Copilot.

## ✅ Completion Checklist
- [ ] Saved personal instructions and located usage
- [ ] Read `copilot-instructions.md` and added `instructions/typescript.instructions.md`
- [ ] Created `prompts/gallery-model.prompt.md` and ran it
- [ ] Created `skills/typescript-testing/SKILL.md`
- [ ] Created `agents/Reviewer.agent.md` and used it
- [ ] Exported/shared a chat
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Head to **Lab 2: Core Development** — you'll use the prompt file, skill, and Reviewer agent you just built to implement a real feature.

### 🌟 Take-home challenge (do this on your own time)
Recreate this customization pack in **one of your real repositories**:
- Write a `copilot-instructions.md` for that project's stack.
- Add a scoped `.instructions.md` for its hottest file type.
- Turn your team's most-repeated request into a `.prompt.md`.
- Capture one "how we do X" doc as a `SKILL.md`.
- Bonus: wire up an **MCP server** (e.g. the GitHub MCP server) and create an issue from Agent mode.
