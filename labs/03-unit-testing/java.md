# Lab 3 · Java Track — Unit Testing

**Goal:** Cover the `GalleryService` you completed in Lab 2 with JUnit 5 tests — including the detail lookup, filtering, and pagination — and catch the planted bug in `mostViewed`.

**Estimated Time:** ~22 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-3-tests
cd labs/starter/java
```

## What You'll Learn
- [ ] Generate JUnit 5 tests with `/tests` and your Lab 1 skill
- [ ] Add edge cases and a reusable prompt file
- [ ] Catch a bug with a test, then ship a reviewed PR

---

## 🎯 Stage 1: Confirm the test runner (4 min)

JUnit 5 is already on the test classpath (see `pom.xml`). Confirm the empty run works:
```bash
mvn -q test
```

**✅ Checkpoint:** Maven runs the (empty) test phase without errors.

---

## 🎯 Stage 2: Generate tests (6 min)

**1.** Open [labs/starter/java/src/main/java/com/example/gallery/GalleryService.java](../starter/java/src/main/java/com/example/gallery/GalleryService.java), select the class, and run:
```markdown
/tests Follow our java-testing skill. Put tests in src/test/java/com/example/gallery/GalleryServiceTest.java using JUnit 5. Cover getPhotoDetail (success and NoSuchElementException), filterPhotos, and getPage.
```

**2.** Run them:
```bash
mvn -q test
```

**✅ Checkpoint:** Green tests for detail, filtering, and pagination.

---

## 🎯 Stage 3: Add the edge cases (4 min)

```markdown
Add edge-case tests to GalleryServiceTest:
- filterPhotos with empty tags and empty query returns all photos,
- a query matching a photographer name,
- getPage beyond the last page returns an empty list,
- getPage with page=0 or perPage=0 returns an empty list.
Use @ParameterizedTest where it reduces duplication.
```
Run `mvn -q test` again.

**✅ Checkpoint:** More tests, still green.

---

## 🧗 Stage 4 (Challenge): Create a reusable prompt file (5 min)

> You built a prompt file in Lab 1 — now build a testing one from scratch.

**Your goal:** Create `.github/prompts/generate-unit-tests.prompt.md` that generates JUnit 5 tests for a selected class in one command.

**Done when your prompt file:**
- [ ] Has valid frontmatter (`agent: 'agent'`, `description`, `tools`).
- [ ] Tells Copilot to follow your `java-testing` skill and mirror the package under `src/test/java` as `<Type>Test`.
- [ ] Requires happy-path, boundary, and each thrown exception.
- [ ] Works when you select a class and run `/generate-unit-tests`.

<details><summary>💡 Stuck? Reveal a hint</summary>

Copy the frontmatter shape from your Lab 1 prompt file. In the body, state the requirements above and end with "ask me for the target file if none is selected, then write the tests and stop."

</details>

---

## 🧗 Stage 5 (Challenge): Catch a bug (3 min)

**Your goal:** Write a test asserting `mostViewed(1)` returns the single highest-viewed photo, run it, and — when it fails from the comparator direction — **quarantine** it so the suite stays green. You'll fix it in Lab 5.

**Done when:**
- [ ] You wrote the test and ran it (and saw it fail).
- [ ] It's annotated disabled with a reason pointing to Lab 5.

<details><summary>💡 Stuck? Reveal a hint</summary>

After it fails, add `@Disabled("bug fixed in Lab 5")` above the test.

</details>

---

## 🚀 Ship it: PR + Copilot review (2 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:** `git push -u origin USERNAME/lab-3-tests`
3. **Open a PR**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** A JUnit suite + reusable prompt file in a reviewed PR.

## ✅ Completion Checklist
- [ ] Confirmed `mvn test` runs
- [ ] Generated tests for the service
- [ ] Added edge-case tests
- [ ] Created `generate-unit-tests.prompt.md`
- [ ] Wrote a disabled test documenting the `mostViewed` bug
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 4: Reviewing Changes**.

### 🌟 Take-home challenge (do this on your own time)
Add JaCoCo to the build and get `GalleryService` to full line coverage. Ask Copilot which branches are uncovered and to write the missing tests.
