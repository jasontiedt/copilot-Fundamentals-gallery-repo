# Lab 1: Personalize & Standardize Copilot

**Scenario:** You've just joined a team and you want Copilot to write code *the way your team does* — following your naming conventions, your patterns, and your testing style — instead of generic defaults. In this lab you'll turn Copilot from a generic assistant into a **team-aware teammate**, then share that setup so everyone benefits.

This is **Lab 1 for a reason**: the customization files you build here (instructions, prompt files, skills, and a custom agent) are the artifacts you'll *reuse* in every later lab and, more importantly, in your real projects.

**Estimated Time:** ~30 minutes

## 🌐 Pick your language

Do the lab in the language you use at work. The stages are identical; the code and conventions differ.

- 👉 [TypeScript / React](typescript.md)
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] Configure **individual** Copilot settings (personal instructions, model, usage)
- [ ] Create **repository custom instructions** that Copilot follows automatically
- [ ] Add a **scoped** `.instructions.md` file with an `applyTo` glob
- [ ] Author a reusable **prompt file** (`.prompt.md`)
- [ ] Package team knowledge into a **skill** (`SKILL.md`)
- [ ] Build a **custom agent** (`.agent.md`) for a repeatable task
- [ ] **Share** your setup with teammates (chat export/import + shared conversations)
- [ ] **Ship it**: push your branch, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Individual setup | Personal instructions, model picker, usage dashboard | 4 min |
| 2 | Repo standards | `copilot-instructions.md` + scoped `.instructions.md` (`applyTo`) | 6 min |
| 3 | Repeatable prompts | Prompt files (`.prompt.md`) | 5 min |
| 4 | Team knowledge | Skills (`SKILL.md`) | 5 min |
| 5 | Repeatable workflows | Custom agents (`.agent.md`) | 5 min |
| 6 | Sharing | Chat export/import, shared conversations | 3 min |
| — | **Ship it** | Push → PR → Copilot review | 5 min |

## 🎁 What you'll take home

By the end you'll have a portable customization pack you can copy into any repo:

```text
.github/
├── copilot-instructions.md              # updated repo-wide standards
├── instructions/
│   └── <language>.instructions.md        # scoped rules (applyTo)
├── prompts/
│   └── <language>-model.prompt.md         # a reusable generator
├── skills/
│   └── <language>-testing/
│       └── SKILL.md                       # your team's testing conventions
└── agents/
    └── Reviewer.agent.md                  # a repeatable review workflow
```

## 🚀 Ready?

Open your language track and begin:

- [TypeScript / React](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md)

Then head to **Lab 2: Core Development** to put these artifacts to work.
