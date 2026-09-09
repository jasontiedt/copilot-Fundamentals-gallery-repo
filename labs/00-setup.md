# Lab 0: Setup

A quick, one-time setup so you're ready for every lab that follows.

**Estimated Time:** ~5 minutes

## What You'll Learn
By the end of this lab, you will:
- [ ] Have GitHub Copilot signed in and working in VS Code
- [ ] Know how to create a working branch for a lab
- [ ] Recognize the Copilot **modes** (Ask, Edit, Agent, Plan)
- [ ] Know how to discover slash commands (`/`), context (`#`), and participants (`@`)
- [ ] Know how to switch models

## 🧰 Prerequisites

- **VS Code** 1.99 or later
- **GitHub Copilot** access (Free, Pro, Business, or Enterprise) and the **GitHub Copilot** + **GitHub Copilot Chat** extensions installed
- **Git** installed and configured
- A toolchain for the language track you plan to use in later labs:
  - **TypeScript** → Node.js v18+ and `npm` (the gallery app in this repo)
  - **Python** → Python 3.10+
  - **Java** → JDK 17+ and Maven or Gradle
  - **C#** → .NET SDK 8+

> Lab 0 and Lab 1 only need VS Code + Copilot. You won't need the language SDKs until Lab 2.

## 🔑 Step 1: Sign in to Copilot (2 min)

1. Open this repository in **VS Code**.
2. Click the **GitHub Copilot** icon in the bottom-right **status bar**.
3. If prompted, **Sign in to GitHub** and authorize Copilot.
4. Confirm the status bar icon is **not** crossed out — that means Copilot is active.

**Optional — start the gallery app (TypeScript track):**
```bash
npm install
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000).

## 🌿 Step 2: Create your working branch (1 min)

Every lab starts from an up-to-date `main` on its own branch. Replace `USERNAME` with your GitHub handle:

```bash
git checkout main
git pull
git checkout -b USERNAME/lab-0-setup
```

> You'll create a **new branch per lab** (for example `USERNAME/lab-1-personalize`). This keeps each lab's Pull Request clean.

## 🗺️ Step 3: Take the 60-second tour (2 min)

Open **Copilot Chat** (`Ctrl` + `Alt` + `I` on Windows/Linux, `Cmd` + `Ctrl` + `I` on Mac) and try each of these:

1. **Modes** — Use the **mode picker** at the bottom of the Chat input (in newer builds it's labeled the **agent** picker). Common built-in modes:
   - **Ask** — questions and explanations, no edits
   - **Edit** — targeted edits to files you choose
   - **Agent** — Copilot plans and edits across the workspace and runs tools
   - **Plan** — Copilot drafts a step-by-step plan before any edits

   Custom agents you add (like the **Reviewer** you build in Lab 1) also appear in this picker. The exact list can vary slightly by VS Code version.
2. **Slash commands** — type `/` and scroll the list (e.g. `/explain`, `/tests`, `/fix`, `/doc`).

   ```markdown
   /
   ```
3. **Context** — type `#` to attach context (e.g. `#codebase`, a file, or selection).

   ```markdown
   #
   ```
4. **Participants** — type `@` to see chat participants.

   ```markdown
   @
   ```
5. **Model picker** — use the model dropdown to switch models. Try asking the same question with two different models later on.

**Expected result:** You can open Chat, switch modes, and see the command/context/participant lists.

## ✅ Completion Checklist

- [ ] Copilot is signed in and active in the status bar
- [ ] Created a working branch
- [ ] Located the mode dropdown and identified Ask / Edit / Agent / Plan
- [ ] Viewed `/`, `#`, and `@` menus
- [ ] Found the model picker

## 🚀 What's Next?

You're ready! Continue to **[Lab 1: Personalize & Standardize Copilot](01-personalize-and-standardize/README.md)** and pick your language track.
