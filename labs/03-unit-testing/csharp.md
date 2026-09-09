# Lab 3 · C# Track — Unit Testing

**Goal:** Cover the `GalleryService` you completed in Lab 2 with xUnit tests — including the detail lookup, filtering, and pagination — and catch the planted bug in `MostViewed`.

**Estimated Time:** ~22 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-3-tests
cd labs/starter/csharp
```

## What You'll Learn
- [ ] Generate xUnit tests with `/tests` and your Lab 1 skill
- [ ] Add edge cases and a reusable prompt file
- [ ] Catch a bug with a test, then ship a reviewed PR

---

## 🎯 Stage 1: Set up the test project (5 min)

Ask Copilot Chat (Agent mode) — or run it yourself:
```markdown
Create an xUnit test project named Gallery.Tests next to the csharp starter, referencing Gallery.csproj, using FluentAssertions.
```
Equivalent commands:
```bash
dotnet new xunit -o ../Gallery.Tests
dotnet add ../Gallery.Tests reference Gallery.csproj
dotnet add ../Gallery.Tests package FluentAssertions
dotnet test ../Gallery.Tests
```

**✅ Checkpoint:** `dotnet test` runs the empty project successfully.

---

## 🎯 Stage 2: Generate tests (6 min)

**1.** Open [labs/starter/csharp/GalleryService.cs](../starter/csharp/GalleryService.cs), select the class, and run:
```markdown
/tests Follow our csharp-testing skill. Put tests in ../Gallery.Tests/GalleryServiceTests.cs using xUnit + FluentAssertions. Cover GetPhotoDetail (success and KeyNotFoundException), FilterPhotos, and GetPage.
```

**2.** Run them:
```bash
dotnet test ../Gallery.Tests
```

**✅ Checkpoint:** Green tests for detail, filtering, and pagination.

---

## 🎯 Stage 3: Add the edge cases (4 min)

```markdown
Add edge-case tests to GalleryServiceTests:
- FilterPhotos with no tags and empty query returns all photos,
- a query matching a photographer name,
- GetPage beyond the last page returns an empty list,
- GetPage with page=0 or perPage=0 returns an empty list.
Use [Theory] with [InlineData] where it reduces duplication.
```
Run `dotnet test ../Gallery.Tests` again.

**✅ Checkpoint:** More tests, still green.

---

## 🧗 Stage 4 (Challenge): Create a reusable prompt file (5 min)

> You built a prompt file in Lab 1 — now build a testing one from scratch.

**Your goal:** Create `.github/prompts/generate-unit-tests.prompt.md` that generates xUnit tests for a selected class in one command.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`mode: 'agent'`, `description`, `tools`).
- [ ] Tells Copilot to follow your `csharp-testing` skill, name the class `<Type>Tests`, and use FluentAssertions.
- [ ] Requires happy-path, boundary, and each thrown exception.
- [ ] Works when you select a class and run `/generate-unit-tests`.

<details><summary>💡 Stuck? Reveal a hint</summary>

Copy the frontmatter shape from your Lab 1 prompt file. In the body, state the requirements above and end with "ask me for the target file if none is selected, then write the tests and stop."

</details>

---

## 🧗 Stage 5 (Challenge): Catch a bug (3 min)

**Your goal:** Write a test asserting `MostViewed(1)` returns the single highest-viewed photo, run it, and — when it fails from the sort direction — **quarantine** it so the suite stays green. You'll fix it in Lab 5.

**Done when:**
- [ ] You wrote the test and ran it (and saw it fail).
- [ ] It's marked skipped with a reason pointing to Lab 5.

<details><summary>💡 Stuck? Reveal a hint</summary>

After it fails, add `[Fact(Skip = "bug fixed in Lab 5")]` to the test.

</details>

---

## 🚀 Ship it: PR + Copilot review (2 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:** `git push -u origin USERNAME/lab-3-tests`
3. **Open a PR**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** An xUnit suite + reusable prompt file in a reviewed PR.

## ✅ Completion Checklist
- [ ] Created the xUnit test project
- [ ] Generated tests for the service
- [ ] Added edge-case tests
- [ ] Created `generate-unit-tests.prompt.md`
- [ ] Wrote a skipped test documenting the `MostViewed` bug
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 4: Reviewing Changes**.

### 🌟 Take-home challenge (do this on your own time)
Add Coverlet (`coverlet.collector`) and produce a coverage report. Ask Copilot which lines are uncovered and to write the missing tests to reach full coverage.
