# Lab 2 · C# Track — Core Development

**Feature:** Implement `GalleryService.GetPhotoDetail` in the starter module. Right now it throws `NotImplementedException`. You'll make it return a real, formatted detail view — the C# equivalent of the app's "photo detail" screen.

**Estimated Time:** ~40 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-2-core-dev
cd labs/starter/csharp
```

## ✅ Definition of Done
```bash
dotnet run   # should also print a detail block without errors
```
- [ ] `GetPhotoDetail("4")` returns a **multi-line string** with title, photographer, tags, and likes/downloads/views.
- [ ] An **unknown id** throws `KeyNotFoundException` (not `NotImplementedException`).
- [ ] `Program.cs` prints the detail for one photo.
- [ ] Code follows your Lab 1 `csharp.instructions.md` (nullable, XML docs).

## What You'll Learn
- [ ] Explore code with Ask, `/explain`, and `#codebase`
- [ ] Use inline & Next Edit Suggestions
- [ ] Plan before implementing
- [ ] Implement with Agent mode + your Lab 1 artifacts
- [ ] Verify by running and ship a reviewed PR

---

## 🎯 Stage 1: Understand the code (6 min)

**1.** Open [labs/starter/csharp/GalleryService.cs](../starter/csharp/GalleryService.cs). Read the `GetPhotoDetail` stub and the `Photo` record.

**2.** Select the `GetPhotoDetail` method, open Chat (Ask mode), and run:
```markdown
/explain
```

**3.** Ask with codebase context:
```markdown
#codebase What properties does the `Photo` record expose, and how is `GalleryService` constructed? What should `GetPhotoDetail` return and how should it handle an unknown id?
```

**✅ Checkpoint:** You know the record properties and the intended return/error behavior.

---

## 🎯 Stage 2: Move fast with inline suggestions (8 min)

**1.** Replace the `throw new NotImplementedException(...)` expression body with a block body (`{ }`). Add an intent comment and pause for inline suggestions:
```csharp
// Find the photo by id with LINQ, then build a multi-line detail string.
```
**2.** Start typing and let Copilot complete the lookup, e.g.:
```csharp
var photo = _photos.FirstOrDefault(p => p.Id == photoId);
```
Accept with `Tab`, then use **Next Edit Suggestions** to handle the null case and the formatting.

**✅ Checkpoint:** You have a LINQ lookup and the start of a formatted string.

---

## 🧗 Stage 3 (Challenge): Plan the rest (6 min)

> **Your turn to prompt.** You've seen the mechanics — now drive Plan mode yourself.

**Your goal:** Use **Plan mode** to produce an ordered plan to implement `GetPhotoDetail` in `GalleryService.cs`: find the photo by id with LINQ, throw `KeyNotFoundException` if missing, otherwise return a multi-line detail (title, photographer, tags, likes/downloads/views), and update `Program.cs` to print the detail for photo "4".

**Done when:**
- [ ] You wrote your own Plan-mode prompt (no copy/paste from earlier stages).
- [ ] The plan covers the success path, the missing-id error, and the `Program.cs` update.
- [ ] It references following your `csharp.instructions.md` (nullable, XML docs).

<details><summary>💡 Stuck? Reveal a hint</summary>

Describe the method contract as bullets: LINQ lookup → throw `KeyNotFoundException` if not found → return an interpolated multi-line string. Add "follow our csharp.instructions.md" and "update Program.cs to print detail for '4'."

</details>

---

## 🧗 Stage 4 (Challenge): Implement with Agent mode (12 min)

**Your goal:** Switch to **Agent** mode and implement your plan across `GalleryService.cs` and `Program.cs`. Your `csharp.instructions.md` applies automatically to `.cs` files.

**Done when:**
- [ ] You wrote your own Agent prompt to implement the plan.
- [ ] `GetPhotoDetail` returns the multi-line detail and throws `KeyNotFoundException` for an unknown id.
- [ ] Nullable handling and XML docs are intact.
- [ ] You reviewed each edit (**Keep**/**Undo**) and `Program.cs` calls the method.

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask Agent to "implement the approved plan for GetPhotoDetail in GalleryService.cs and update Program.cs," then verify against the Definition of Done at the top.

</details>

---

## 🎯 Stage 5: Verify & iterate (5 min)

1. Run it:
   ```bash
   dotnet run
   ```
2. Temporarily call `GetPhotoDetail("999")` to confirm you get a `KeyNotFoundException`, then remove the temporary call.
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
- [ ] Accepted inline suggestions for the LINQ lookup
- [ ] Drafted the change in Plan mode
- [ ] Implemented the method + `Program.cs` in Agent mode
- [ ] Verified success and error paths
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 3: Unit Testing** — you'll test the method you just wrote.

### 🌟 Take-home challenge (do this on your own time)
Add a `Search(string query)` convenience method and a command-line argument to `Program.cs` that prints the detail for a given id. Plan it, implement it in Agent mode, and open a PR.
