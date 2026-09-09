# Lab 7: End-to-End UI Testing with Playwright + Playwright MCP

**Scenario:** Unit tests prove the logic; **end-to-end (E2E) tests prove the app works for a real user**. You'll test the running Photo Gallery in a real browser with **Playwright**, and use the **Playwright MCP server** so Copilot can *drive the browser itself* — clicking, typing, and observing — then generate a durable test from what it did.

This is the enhanced lab in the **QA & Testing track**. It's the best showcase of Copilot's **Agent mode + MCP + integrated browser** for QA.

**Estimated Time:** ~35 minutes

## 🎬 The app under test

Run the gallery locally (it's the same app for every language track):
```bash
npm install
npm run dev        # http://localhost:3000
```
Real, testable elements you'll use:
- Nav links **Gallery**, **Upload**, **Admin**
- On `/gallery`: a **Search photos** box, a **Filters** button, photo cards with **View Details**, a **Load More Photos** button, and a **"No photos match your filters"** empty state.

## 🔌 What is Playwright MCP?

The **Playwright MCP server** exposes browser-automation tools to Copilot. In **Agent** mode, Copilot can navigate, click, fill forms, and take snapshots of the live app — then write a Playwright test that reproduces the exact flow. You configure it once in `.vscode/mcp.json`.

## 🌐 Pick your language

Playwright has official bindings for all four. The app is identical; only the test runner differs.

- 👉 [TypeScript / React](typescript.md) *(smoothest — native codegen & MCP)*
- 👉 [Python](python.md)
- 👉 [Java](java.md)
- 👉 [C#](csharp.md)

## What You'll Learn
By the end of this lab, you will:
- [ ] Configure the **Playwright MCP server** in VS Code
- [ ] Let Copilot **drive the live app** via MCP in Agent mode
- [ ] **Generate an E2E test** from an explored flow
- [ ] Add assertions and view a **trace / HTML report**
- [ ] **Ship it**: push, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Setup | Playwright + Playwright MCP + app | 8 min |
| 2 | Explore | Agent mode drives the browser (MCP) | 6 min |
| 3 | Generate | Copilot writes the spec | 6 min |
| 4 | Assert & run | Assertions, trace/report | 6 min |
| 5 | Challenge | Cover another flow yourself | 5 min |
| — | **Ship it** | Push → PR → Copilot review | 4 min |

## 🎁 What you'll take home

- A running **Playwright E2E suite** for the gallery
- A committed **`.vscode/mcp.json`** with Playwright MCP
- An **`e2e-testing`** skill capturing your team's E2E conventions

## 🚀 Ready?

Open your language track: [TypeScript](typescript.md) · [Python](python.md) · [Java](java.md) · [C#](csharp.md). Then continue to **Lab 8: Bug Reproduction → Report → Delegate**.
