# Photo Gallery & Portfolio

A professional photo gallery and portfolio application built with Next.js 15, TypeScript, and Tailwind CSS. This project is designed for **demoing GitHub Copilot features** in a real-world, component-driven Next.js application. The included demos showcase how Copilot can assist with code generation, refactoring, UI building, and more.

> 🎓 **Jump to the [Fundamentals Labs guide →](labs/README.md)** for the hands-on, multi-language training track.

## Demos

- All demo guides and examples are in the [`demos/`](demos/) folder.
- For more information about each demo, refer to the [README](demos/README.md) file in the `demos/` directory.
- To get started, check out the first demo [`features-demo.md`](demos/features-demo.md) for a walkthrough of gallery features and Copilot capabilities.

### 🎓 Fundamentals Labs (hands-on training)

New to Copilot, or running a **Fundamentals** course? The [`labs/`](labs/README.md) folder is a short-lab track that recreates the same real-world scenario in **TypeScript, Python, Java, and C#**. Each lab is a quick, staged exercise that ends by opening a Pull Request and getting a Copilot review — and leaves you with reusable custom instructions, prompt files, skills, and agents you can take to your own projects.

Start at the [Labs index](labs/README.md), or jump straight to a lab:

| # | Lab | Time | You'll practice |
| - | --- | ---- | --------------- |
| 0 | [Setup](labs/00-setup.md) | ~5 min | Sign-in, modes, `/` `#` `@`, model picker |
| 1 | [Personalize & Standardize](labs/01-personalize-and-standardize/README.md) | ~30 min | Custom instructions, prompt files, skills, agents, chat sharing |
| 2 | [Core Development](labs/02-core-development/README.md) | ~40 min | Ask/`/explain`, `#codebase`, inline & Next Edit Suggestions, Plan & Agent modes |
| 3 | [Unit Testing](labs/03-unit-testing/README.md) | ~22 min | `/tests`, Agent mode, `/fix`, coverage prompts |
| 4 | [Reviewing Changes](labs/04-reviewing-changes/README.md) | ~18 min | Inline review, Source Control review, commit-message generation, Copilot PR review |
| 5 | [Debug, Document & Delegate](labs/05-debug-document-delegate/README.md) | ~22 min | `/fix`, `/doc`, MCP issue creation, Cloud Agent |

Each lab (1–5) has a track for every language — TypeScript, Python, Java, and C# — plus per-language starter code for Labs 2–5:

- [`labs/starter/python`](labs/starter/python/README.md)
- [`labs/starter/java`](labs/starter/java/README.md)
- [`labs/starter/csharp`](labs/starter/csharp/README.md)

### Demo Tracks

Latest recommended guides (Option 2):

- [Features Demo (Option 2)](demos/features-demo-option-2.md)
- [Engineering Practices Demo (Option 2)](demos/engineering-practices-option-2.md)
- [Customize Copilot Demo (Option 2)](demos/customize-copilot-option-2.md)
- [Cloud Agent Demo (Option 2)](demos/cloud-agent-option-2.md)

Original guides:

- [Features Demo](demos/features-demo.md)
- [Engineering Practices Demo](demos/engineering-practices.md)
- [Customize Copilot Demo](demos/customize-copilot.md)
- [Copilot Spaces Demo](demos/copilot-spaces.md)
- [Cloud Agent Demo](demos/cloud-agent.md)

### Creating a New Demo

If you want to contribute and create a new demo, follow these steps:

1. Open GitHub Copilot Chat.
2. Type the prompt `/create-copilot-demo` with an explanation of your demo idea.
3. Copilot will generate a new demo file in the `demos/` directory.
4. Fill in remaining sections with detailed instructions, examples, and expected results.

After finishing the demo, don't forget this quick follow-up:

1. Add in the overview, key skills, and demo link to the [demo README](demos/README.md)

## Getting Started

### Technical Requirements

- **Node.js** v18 or newer
- **npm** (or yarn, pnpm, bun)

### Quick Start with GitHub Codespaces

The fastest way to get started is using GitHub Codespaces:

1. Click the **"Code"** button on the GitHub repository page
2. Select the **"Codespaces"** tab
3. Click **"Create codespace on main"** (or your current branch)
4. Wait for the codespace to build and start

The codespace will automatically:
- Install all dependencies (`npm install`)
- Start the development server (`npm run dev`)
- Configure GitHub Copilot and essential VS Code extensions
- Forward port 3000 for the Next.js application

Once ready, you can access the application at the forwarded port URL provided in the terminal.

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ps-copilot-sandbox/copilot-intermediate-gallery-repo.git
   cd copilot-intermediate-gallery-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```bash
src/
├── app/                 # Next.js 15 App Router pages
├── components/          # Reusable React components
├── lib/                 # Utility functions and helpers
demos/                   # Demo guides (intermediate track)
labs/                    # Fundamentals Labs (TypeScript, Python, Java, C#)
└── starter/             # Per-language starter modules used by the labs
```