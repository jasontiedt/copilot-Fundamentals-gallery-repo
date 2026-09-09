# Lab 2 · Java Track — Core Development

**Feature:** Implement `GalleryService.getPhotoDetail` in the starter module. Right now it throws `UnsupportedOperationException`. You'll make it return a real, formatted detail view — the Java equivalent of the app's "photo detail" screen.

**Estimated Time:** ~40 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-2-core-dev
cd labs/starter/java
```

## ✅ Definition of Done
```bash
mvn -q compile exec:java   # should also print a detail block without errors
```
- [ ] `getPhotoDetail("4")` returns a **multi-line string** with title, photographer, tags, and likes/downloads/views.
- [ ] An **unknown id** throws `NoSuchElementException` (not `UnsupportedOperationException`).
- [ ] `App` prints the detail for one photo.
- [ ] Code follows your Lab 1 `java.instructions.md` (Optional/streams, Javadoc).

## What You'll Learn
- [ ] Explore code with Ask, `/explain`, and `#codebase`
- [ ] Use inline & Next Edit Suggestions
- [ ] Plan before implementing
- [ ] Implement with Agent mode + your Lab 1 artifacts
- [ ] Verify by running and ship a reviewed PR

---

## 🎯 Stage 1: Understand the code (6 min)

**1.** Open [labs/starter/java/src/main/java/com/example/gallery/GalleryService.java](../starter/java/src/main/java/com/example/gallery/GalleryService.java). Read the `getPhotoDetail` stub and the `Photo` record.

**2.** Select the `getPhotoDetail` method, open Chat (Ask mode), and run:
```markdown
/explain
```

**3.** Ask with codebase context:
```markdown
#codebase What accessors does the `Photo` record expose, and how is `GalleryService` constructed? What should `getPhotoDetail` return and how should it handle an unknown id?
```

**✅ Checkpoint:** You know the record accessors and the intended return/error behavior.

---

## 🎯 Stage 2: Move fast with inline suggestions (8 min)

**1.** Delete the `throw new UnsupportedOperationException(...)` line. Add an intent comment and pause for inline suggestions:
```java
// Find the photo by id with a stream, then build a multi-line detail string.
```
**2.** Start typing and let Copilot complete the lookup, e.g.:
```java
Photo photo = photos.stream().filter(p -> p.id().equals(photoId)).findFirst()
```
Accept with `Tab`, then use **Next Edit Suggestions** to handle the empty case and the formatting.

**✅ Checkpoint:** You have a stream lookup and the start of a formatted string.

---

## 🧗 Stage 3 (Challenge): Plan the rest (6 min)

> **Your turn to prompt.** You've seen the mechanics — now drive Plan mode yourself.

**Your goal:** Use **Plan mode** to produce an ordered plan to implement `getPhotoDetail` in `GalleryService.java`: find the photo by id with the Streams API, throw `NoSuchElementException` if absent, otherwise return a multi-line detail (title, photographer, tags, likes/downloads/views), and update `App.java` to print the detail for photo "4".

**Done when:**
- [ ] You wrote your own Plan-mode prompt (no copy/paste from earlier stages).
- [ ] The plan covers the success path, the missing-id error, and the `App.java` update.
- [ ] It references following your `java.instructions.md` (Optional, Javadoc).

<details><summary>💡 Stuck? Reveal a hint</summary>

Describe the method contract as bullets: stream lookup → `Optional.orElseThrow` if not found → return a multi-line String. Add "follow our java.instructions.md" and "update App.java to print detail for '4'."

</details>

---

## 🧗 Stage 4 (Challenge): Implement with Agent mode (12 min)

**Your goal:** Switch to **Agent** mode and implement your plan across `GalleryService.java` and `App.java`. Your `java.instructions.md` applies automatically to `.java` files.

**Done when:**
- [ ] You wrote your own Agent prompt to implement the plan.
- [ ] `getPhotoDetail` returns the multi-line detail and throws `NoSuchElementException` for an unknown id.
- [ ] It uses `Optional.orElseThrow` and keeps its Javadoc.
- [ ] You reviewed each edit (**Keep**/**Undo**) and `App` calls the method.

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask Agent to "implement the approved plan for getPhotoDetail in GalleryService.java and update App.java," then verify against the Definition of Done at the top.

</details>

---

## 🎯 Stage 5: Verify & iterate (5 min)

1. Run it:
   ```bash
   mvn -q compile exec:java
   ```
2. Temporarily call `getPhotoDetail("999")` to confirm you get a `NoSuchElementException`, then remove the temporary call.
3. If anything's off, select the code and use `/fix`, or switch to your **Reviewer** agent from Lab 1 and ask it to review.

**✅ Checkpoint:** All Definition-of-Done items pass.

---

## 🚀 Ship it: PR + Copilot review (5 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:**
   ```bash
   git push -u origin USERNAME/lab-2-core-dev
   ```
3. **Open a Pull Request**, **request a Copilot review**, and **triage** its comments.

**🎉 Success:** A finished feature in a PR reviewed by Copilot.

## ✅ Completion Checklist
- [ ] Explored the stub with `/explain` and `#codebase`
- [ ] Accepted inline suggestions for the stream lookup
- [ ] Drafted the change in Plan mode
- [ ] Implemented the method + `App` in Agent mode
- [ ] Verified success and error paths
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 3: Unit Testing** — you'll test the method you just wrote.

### 🌟 Take-home challenge (do this on your own time)
Add a `search(String query)` convenience method and a command-line argument to `App` that prints the detail for a given id. Plan it, implement it in Agent mode, and open a PR.
