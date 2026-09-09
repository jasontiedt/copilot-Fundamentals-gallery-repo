# Lab 7 · Java Track — E2E with Playwright + MCP

**Goal:** Write a real-browser E2E test for the gallery's **search & filter** flow with **Playwright for Java** — first letting Copilot drive the app via the **Playwright MCP** server, then generating a durable JUnit test.

**Estimated Time:** ~35 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-7-e2e
```

## ✅ Definition of Done
```bash
mvn test
```
- [ ] A passing test that searches the gallery and asserts the results update.
- [ ] Copilot drove at least one flow live through the **Playwright MCP** server.
- [ ] `.vscode/mcp.json` and the test are committed.

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

**2. Add Playwright for Java.** In a Maven E2E project (you can reuse `labs/starter/java`), add the dependency and install browsers:
```xml
<dependency>
  <groupId>com.microsoft.playwright</groupId>
  <artifactId>playwright</artifactId>
  <version>1.55.0</version>
  <scope>test</scope>
</dependency>
```
```bash
mvn compile
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install chromium"
```

**3. Enable the Playwright MCP server.** Create `.vscode/mcp.json`:
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

In **Agent** mode:
```markdown
Using the Playwright browser tools, open http://localhost:3000/gallery, type "portrait" into the "Search photos" box, and tell me which photo cards remain visible. Then take a snapshot.
```
Copilot navigates, types, and reports what it sees — no code yet.

**✅ Checkpoint:** Copilot filtered the gallery live and described the result.

---

## 🎯 Stage 3: Generate the test (6 min)

Ask Copilot:
```markdown
Generate a JUnit 5 test using Playwright for Java (in src/test/java) for that flow: navigate to http://localhost:3000/gallery, fill the "Search photos" input with "portrait", assert the "Portrait Study" card is visible and "Sunset Landscape" is not. Use getByLabel / getByText locators and assertThat(...).isVisible().
```

**✅ Checkpoint:** The JUnit E2E test exists with resilient locators.

---

## 🎯 Stage 4: Assert, run & inspect (6 min)

1. Run it (app must be running):
   ```bash
   mvn test
   ```
2. For debugging, ask Copilot to enable tracing (`context.tracing().start(...)`) and open the trace with `mvn exec:java ... "show-trace trace.zip"`.
3. If a locator is flaky, select the test and use **`/fix`**, or ask Copilot to "prefer `getByRole`/`getByLabel` and Playwright web-first `assertThat` assertions."

**✅ Checkpoint:** Green E2E run.

---

## 🧗 Stage 5 (Challenge): Cover another flow (5 min)

**Your goal:** Add a second test **without step-by-step help**. Pick one:
- **Empty state:** search `zzzzz` → **"No photos match your filters"** is visible.
- **Load more:** click **Load More Photos** → the "Showing X of Y" count increases.
- **Detail modal:** click the first **View Details** → the photo's title appears → close it.

**Done when:**
- [ ] A second test passes with role/label/text locators.
- [ ] You drove or verified it via MCP or a trace.

<details><summary>💡 Stuck? Reveal a hint</summary>

Explore the flow in Agent mode via MCP first, then ask Copilot to generate the test using `assertThat(page.getByText("No photos match your filters")).isVisible()`.

</details>

---

## 🚀 Ship it: PR + Copilot review (4 min)

1. **Commit** your E2E tests + `.vscode/mcp.json` (generate the message with Copilot).
2. **Push:** `git push -u origin USERNAME/lab-7-e2e`
3. **Open a PR**, then under **Reviewers**, next to **Copilot**, click **Request**. Triage its comments.

**🎉 Success:** A real-browser E2E suite, driven by Copilot, in a reviewed PR.

## ✅ Completion Checklist
- [ ] Configured Playwright + Playwright MCP
- [ ] Let Copilot explore the live app via MCP
- [ ] Generated the search test
- [ ] Ran it and captured a trace
- [ ] Added a second flow (challenge)
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 8: Bug Reproduction → Report → Delegate**.

### 🌟 Take-home challenge (do this on your own time)
Build an **`e2e-testing` skill** (`.github/skills/e2e-testing/SKILL.md`) capturing your conventions (role-based locators, web-first assertions, no hard waits), then run the suite headless in CI.
