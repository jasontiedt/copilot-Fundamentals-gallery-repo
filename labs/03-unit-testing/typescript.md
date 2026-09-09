# Lab 3 · TypeScript / React Track — Unit Testing

**Goal:** Add a fast unit-test setup and cover the gallery's filtering and pagination logic. The app currently has **no test runner**, so you'll add one with Copilot's help — a realistic "day one on a new repo" task.

**Estimated Time:** ~25 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-3-tests
```

## What You'll Learn
- [ ] Set up **Vitest** in a Next.js/TypeScript project
- [ ] Extract testable logic and generate tests with `/tests`
- [ ] Add edge cases and a reusable prompt file
- [ ] Catch a bug with a test, then ship a reviewed PR

---

## 🎯 Stage 1: Set up the test runner (5 min)

**Goal:** Get a working `npm test` for pure-function unit tests. The steps below are known-good for this Next.js 15 + Tailwind v4 project — two version/config details matter, so they're spelled out.

**1.** Install Vitest, pinned to **v2** (matches this repo's `@types/node@^20`):
```bash
npm install -D vitest@^2
```
> If you see an `ERESOLVE` peer-dependency error, append `--legacy-peer-deps`. (Bare `npm i -D vitest` may pull a newer major that wants a newer `@types/node`.)

**2.** Add a `"test"` script to `package.json`:
```json
"scripts": {
  "test": "vitest run"
}
```

**3.** Create `vitest.config.ts` in the project root. The `css.postcss` override stops Vitest from loading this repo's Tailwind PostCSS config (which Vite can't parse) during pure-logic tests:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  css: { postcss: { plugins: [] } },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

**4.** Confirm it runs:
```bash
npm test   # no tests yet — should report "No test files found"
```

> 💡 Prefer to let Copilot do it? Ask Agent mode to *"set up Vitest v2 with a node-environment `vitest.config.ts` that disables PostCSS, and add a `test` script"* — then verify with the steps above.

**✅ Checkpoint:** `npm test` runs Vitest (even with zero tests).

---

## 🎯 Stage 2: Make the logic testable & generate tests (6 min)

**Goal:** Pull the filter/pagination logic into a pure module and test it.

**1.** In Agent mode:
```markdown
Extract the photo filtering and pagination logic from src/components/gallery/GalleryGrid.tsx into a new pure module `src/lib/gallery-utils.ts` with:
- `filterPhotos(photos: Photo[], opts: { tags?: string[]; query?: string }): Photo[]`
- `paginate<T>(items: T[], page: number, perPage: number): T[]`  // 1-indexed
Do not change GalleryGrid's behavior yet — just add the reusable functions and export them.
```

**2.** Open `src/lib/gallery-utils.ts`, then generate tests. Select the file and run:
```markdown
/tests Follow our typescript-testing skill. Put tests in src/lib/gallery-utils.test.ts using Vitest, with descriptive names.
```

**3.** Run them:
```bash
npm test
```

**✅ Checkpoint:** Green tests for `filterPhotos` and `paginate`.

---

## 🎯 Stage 3: Add the edge cases (4 min)

**Goal:** Cover what Copilot's first pass missed.

Ask in Chat:
```markdown
Add edge-case tests to gallery-utils.test.ts:
- empty tags and empty query returns all photos,
- a query that matches a photographer name,
- page beyond the last page returns an empty array,
- perPage of 0 or a page of 0 returns an empty array.
```
Run `npm test` again.

**✅ Checkpoint:** More tests, still green.

---

## 🧗 Stage 4 (Challenge): Create a reusable prompt file (5 min)

> You built a prompt file in Lab 1 — now build a testing one from scratch.

**Your goal:** Create `.github/prompts/generate-unit-tests.prompt.md` that generates Vitest tests for a selected module in one command.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`agent: 'agent'`, `description`, `tools`).
- [ ] Tells Copilot to follow your `typescript-testing` skill and place tests as `<name>.test.ts`.
- [ ] Requires happy-path, boundary, and one edge case per exported function.
- [ ] Works when you select a file and run `/generate-unit-tests`.

<details><summary>💡 Stuck? Reveal a hint</summary>

Copy the frontmatter shape from your Lab 1 prompt file. In the body, state the requirements above and end with "ask me for the target file if none is selected, then write the tests and stop."

</details>

---

## 🧗 Stage 5 (Challenge): Catch a bug (3 min)

**Your goal:** Write a test that encodes the *intended* "top by views" behavior (highest-viewed photo first). If it fails because of a sort-direction bug, **quarantine** it so the suite stays green — you'll fix it in Lab 5.

**Done when:**
- [ ] You wrote the test and ran it.
- [ ] If it fails, it's marked skipped with a comment pointing to Lab 5.

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask Copilot to add a test asserting the highest-viewed photo sorts first, then use `it.skip(...)` with a `// enable in Lab 5` comment if it fails.

</details>

---

## 🚀 Ship it: PR + Copilot review (2 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:** `git push -u origin USERNAME/lab-3-tests`
3. **Open a PR**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** A test suite + reusable prompt file in a reviewed PR.

## ✅ Completion Checklist
- [ ] Set up Vitest and `npm test`
- [ ] Extracted `gallery-utils.ts` and generated tests
- [ ] Added edge-case tests
- [ ] Created `generate-unit-tests.prompt.md`
- [ ] Wrote a (skipped) test that documents a bug
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 4: Reviewing Changes**.

### 🌟 Take-home challenge (do this on your own time)
Add **React Testing Library** and write a component test for the photo detail modal from Lab 2: it opens on "View Details", closes on Escape, and shows the photographer. Use your `typescript-testing` skill.
