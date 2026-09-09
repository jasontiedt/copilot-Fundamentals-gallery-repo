# Lab 7 · TypeScript / React Track — E2E with Playwright + MCP

**Goal:** Write a real-browser E2E test for the gallery's **search & filter** flow — first letting Copilot drive the app via the **Playwright MCP** server, then generating a durable `*.spec.ts`.

**Estimated Time:** ~35 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-7-e2e
```

## ✅ Definition of Done
```bash
npx playwright test
```
- [ ] A passing spec that searches the gallery and asserts the results update.
- [ ] Copilot drove at least one flow live through the **Playwright MCP** server.
- [ ] `.vscode/mcp.json` and the test are committed; the HTML report renders.

## What You'll Learn
- [ ] Configure Playwright + the Playwright MCP server
- [ ] Explore the live app via Copilot in Agent mode
- [ ] Generate, assert, and debug an E2E test

---

## 🎯 Stage 1: Set up Playwright + MCP (8 min)

**1. Start the app** in its own terminal:
```bash
npm install && npm run dev     # http://localhost:3000
```

**2. Install Playwright:**
```bash
npm init playwright@latest -- --quiet   # or: npm i -D @playwright/test && npx playwright install
```

**3. Point tests at the app.** In `playwright.config.ts`, set the base URL (and optionally let Playwright start the app for you):
```ts
export default defineConfig({
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  webServer: { command: 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: true },
});
```

**4. Enable the Playwright MCP server.** Create `.vscode/mcp.json`:
```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```
Open `.vscode/mcp.json`, click **Start** on the server, and **Allow** it. In Copilot Chat (**Agent** mode), open the **tools** picker and confirm the Playwright browser tools are listed.

**✅ Checkpoint:** App is running, Playwright is installed, and the Playwright MCP tools appear in Agent mode.

---

## 🎯 Stage 2: Let Copilot explore the app (6 min)

**Goal:** Watch Copilot operate the real UI through MCP.

In **Agent** mode:
```markdown
Using the Playwright browser tools, open http://localhost:3000/gallery, type "portrait" into the "Search photos" box, and tell me which photo cards remain visible. Then take a snapshot.
```
Copilot navigates, types, and reports what it sees — no code yet.

**✅ Checkpoint:** Copilot filtered the gallery live and described the result.

---

## 🎯 Stage 3: Generate the test (6 min)

**Goal:** Turn the explored flow into a durable spec.

Ask Copilot:
```markdown
Generate a Playwright test at e2e/gallery-search.spec.ts for that flow: go to /gallery, search "portrait", assert the "Portrait Study" card is visible and "Sunset Landscape" is not. Use role/label-based locators (getByLabel('Search photos'), getByRole).
```

> 🛠️ **No MCP?** Use codegen instead: `npx playwright codegen http://localhost:3000/gallery` records your clicks into a spec.

**✅ Checkpoint:** `e2e/gallery-search.spec.ts` exists with resilient locators.

---

## 🎯 Stage 4: Assert, run & inspect (6 min)

1. Run it:
   ```bash
   npx playwright test
   ```
2. Open the report and a trace:
   ```bash
   npx playwright show-report
   ```
3. If a locator is flaky, select the test and use **`/fix`**, or ask Copilot to "prefer `getByRole`/`getByLabel` and add web-first assertions (`await expect(...).toBeVisible()`)."

**✅ Checkpoint:** Green E2E run with an HTML report.

---

## 🧗 Stage 5 (Challenge): Cover another flow (5 min)

**Your goal:** Add a second test **without step-by-step help**. Pick one:
- **Empty state:** search `zzzzz` → **"No photos match your filters"** is visible.
- **Load more:** click **Load More Photos** → the "Showing X of Y" count increases.
- **Detail modal:** click the first **View Details** → the photo's title appears → close it.

**Done when:**
- [ ] A second spec passes with role/label/text locators.
- [ ] You drove or verified it via MCP or the trace viewer.

<details><summary>💡 Stuck? Reveal a hint</summary>

Explore the flow in Agent mode via MCP first ("click Load More Photos and read the 'Showing…' text"), then ask Copilot to generate the spec with `await expect(page.getByText(/Showing/)).toContainText(...)`.

</details>

---

## 🚀 Ship it: PR + Copilot review (4 min)

1. **Commit** your `e2e/` tests + `.vscode/mcp.json` + `playwright.config.ts` (generate the message with Copilot).
2. **Push:** `git push -u origin USERNAME/lab-7-e2e`
3. **Open a PR**, then under **Reviewers**, next to **Copilot**, click **Request**. Triage its comments.

**🎉 Success:** A real-browser E2E suite, driven by Copilot, in a reviewed PR.

## ✅ Completion Checklist
- [ ] Configured Playwright + Playwright MCP
- [ ] Let Copilot explore the live app via MCP
- [ ] Generated the search spec
- [ ] Ran it and viewed the report/trace
- [ ] Added a second flow (challenge)
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 8: Bug Reproduction → Report → Delegate**.

### 🌟 Take-home challenge (do this on your own time)
Build a **`e2e-testing` skill** (`.github/skills/e2e-testing/SKILL.md`) capturing your conventions (role-based locators, web-first assertions, no hard waits), then add visual checks with `await expect(page).toHaveScreenshot()`.
