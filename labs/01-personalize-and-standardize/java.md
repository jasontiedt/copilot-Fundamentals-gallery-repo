# Lab 1 · Java Track — Personalize & Standardize Copilot

Make Copilot write code the way **your team** writes it. In this track you'll tailor Copilot for a Java service that models the same **photo gallery** domain, and walk away with a reusable customization pack.

**Estimated Time:** ~30 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-1-personalize
```

> This track's code lives under `labs/starter/java/` (you'll expand it in Lab 2). In Lab 1 you're building configuration that will apply to that code — so nothing needs to exist yet.

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
  Be concise. Prefer modern Java 17+ (records, var, streams). Show a short code sample before a long explanation.
  ```

**2. Model picker:** In VS Code Copilot Chat, open the model dropdown and note which models are available. You'll compare two later.

**3. Usage:** Check your premium request usage at [https://github.com/settings/copilot/features](https://github.com/settings/copilot/features) so you know what a "premium request" costs.

**✅ Checkpoint:** You have personal instructions saved and know where your usage lives.

---

## 🎯 Stage 2: Repository standards (6 min)

**Goal:** Make Copilot follow *your* project's conventions automatically.

**1. Read what already exists.** Open [.github/copilot-instructions.md](../../.github/copilot-instructions.md). This repo-wide file is injected into Copilot's context for this workspace. Even though it describes the TypeScript app, notice *how* it encodes standards — that's the pattern you'll copy for Java.

**2. See it in action.** In Copilot Chat (Ask mode), run:
```markdown
What makes a well-structured Java service class? Answer in this repo's style of documenting standards.
```

**3. Add a *scoped* instructions file.** Scoped instructions apply only to files matching a glob. Create:

`.github/instructions/java.instructions.md`
```markdown
---
applyTo: "**/*.java"
---
# Java conventions

- Target Java 17+; use `record` types for immutable data/DTOs.
- Favor constructor injection; keep classes final unless designed for extension.
- Use `Optional` for absent return values — never return `null` from public APIs.
- Prefer the Streams API for transformations; avoid raw types and use generics.
- Throw specific exceptions; validate arguments with `Objects.requireNonNull`.
- Javadoc every public type and method with a one-line summary.
- Name booleans `isX`/`hasX`; follow standard camelCase/PascalCase conventions.
```

> 💡 **Shortcut:** Type `/init` in chat to generate workspace instructions, or select **Configure Chat** (⚙) → **Generate Instructions**. Trim the result to taste.

**✅ Checkpoint:** Editing a `.java` file, ask Copilot to "add a method" and confirm it uses `Optional`, Javadoc, and no raw types.

---

## 🎯 Stage 3: A reusable prompt file (5 min)

**Goal:** Capture a task you repeat into a one-command **prompt file**.

**1. Study an example.** Open [.github/prompts/generate-new-ui.prompt.md](../../.github/prompts/generate-new-ui.prompt.md) and note its frontmatter (`agent`, `description`, `tools`) and body. *(That example still uses the older `mode:` key — current VS Code uses `agent:`, and both work.)*

**2. Create your own.** You frequently need immutable domain models with sample data. Create:

`.github/prompts/gallery-model.prompt.md`
```markdown
---
agent: 'agent'
description: 'Scaffold an immutable gallery domain model with sample data (Java)'
tools: ['codebase', 'editFiles']
---

# Generate a gallery domain model (Java)

Create a Java model for a gallery entity under `labs/starter/java/src/main/java/com/example/gallery/`.

## Requirements
- Use a `record` with fields:
  `String id`, `String title`, `List<String> tags`, `int likes`, `Instant createdAt`.
- Validate arguments in a compact constructor (`Objects.requireNonNull`, non-negative likes).
- Add a factory method `List<Entity> mockEntities(int count)` returning realistic data.
- Include Javadoc on the record and factory.

Ask me for the entity name, then generate the file and a short usage example.
```

**3. Run it.** In Chat, type `/gallery-model` and pass a name:
```markdown
/gallery-model an Album entity
```

**✅ Checkpoint:** Copilot generates an immutable `record` + factory in one command.

---

## 🧗 Stage 4 (Challenge): Package a skill (6 min)

> **Training wheels off.** From here on, *you* write the prompts. Try first — reveal a hint only if you're stuck.

**Your goal:** Create a **skill** at `.github/skills/java-testing/SKILL.md` that captures your team's JUnit 5 conventions.

**Use:** Copilot Chat to draft it, then edit to taste. The existing [.github/skills/javascript-typescript-jest/SKILL.md](../../.github/skills/javascript-typescript-jest/SKILL.md) shows the *shape* only.

**Done when your `SKILL.md`:**
- [ ] Has valid frontmatter with `name` and `description`.
- [ ] Specifies JUnit 5 + a fluent assertion library and a test-naming pattern.
- [ ] Recommends `@ParameterizedTest` for table-driven cases.
- [ ] Says to keep unit tests free of I/O and use Arrange–Act–Assert.

**Prove it:** ask Copilot to "write tests for the Album record following our java-testing skill" and confirm it follows your rules.

<details><summary>💡 Stuck? Reveal a starter prompt</summary>

> Create a SKILL.md at `.github/skills/java-testing/` for our JUnit 5 conventions: `@Test`/`@DisplayName`, AssertJ assertions, `should<Expected>_when<Condition>` names, `@ParameterizedTest` for tables, Mockito for collaborators, no I/O, Arrange–Act–Assert. Add `name` and `description` frontmatter.

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

Create it via `/agents` → **New Agent** (or **Configure Chat** ⚙ → **Agents** tab), or just add the file under `.github/agents/`. Reuse the frontmatter keys from `Plan.agent.md` (`name`, `description`, `tools`). In the body: "You are a senior Java reviewer. Do not edit code. Report **Blocking / Suggestions / Nits** with file+line, checked against our instructions."

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
4. **Request a Copilot review:** On the PR page, under **Reviewers**, next to **Copilot**, click **Request**. It usually comments in under a minute, labeling each item **High / Medium / Low**.
5. **Triage** Copilot's comments — resolve, reply, or apply suggestions.

**🎉 Success:** A PR containing your customization pack, reviewed by Copilot.

## ✅ Completion Checklist
- [ ] Saved personal instructions and located usage
- [ ] Read `copilot-instructions.md` and added `instructions/java.instructions.md`
- [ ] Created `prompts/gallery-model.prompt.md` and ran it
- [ ] Created `skills/java-testing/SKILL.md`
- [ ] Created `agents/Reviewer.agent.md` and used it
- [ ] Exported/shared a chat
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Head to **Lab 2: Core Development** — you'll use the prompt file, skill, and Reviewer agent you just built to implement a real feature.

### 🌟 Take-home challenge (do this on your own time)
Recreate this customization pack in **one of your real repositories**:
- Write a `copilot-instructions.md` for that project's stack.
- Add a scoped `.instructions.md` for `**/*.java` (or your hottest file type).
- Turn your team's most-repeated request into a `.prompt.md`.
- Capture one "how we do X" doc as a `SKILL.md`.
- Bonus: wire up an **MCP server** (e.g. the GitHub MCP server) and create an issue from Agent mode.
