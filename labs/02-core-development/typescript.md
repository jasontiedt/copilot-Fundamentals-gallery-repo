# Lab 2 · TypeScript / React Track — Core Development

**Feature:** Complete the **photo detail modal** in the gallery. Right now, clicking **View Details** opens a modal that only says *"Photo details and larger view would be implemented here."* You'll make it real and polished.

**Estimated Time:** ~40 minutes
**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-2-core-dev
npm install && npm run dev   # http://localhost:3000/gallery
```

## ✅ Definition of Done
Open the gallery, hover a photo, and click **View Details**:
- [ ] The modal shows **real details** — photographer, all tags, and likes/downloads/views (not the placeholder sentence).
- [ ] Pressing **Escape** closes the modal.
- [ ] Clicking the **backdrop** (outside the modal content) closes it.
- [ ] The page **cannot scroll** while the modal is open.

## What You'll Learn
- [ ] Explore code with Ask, `/explain`, and `#codebase`
- [ ] Use inline & Next Edit Suggestions
- [ ] Plan before implementing
- [ ] Implement with Agent mode + your Lab 1 artifacts
- [ ] Verify in the browser and ship a reviewed PR

---

## 🎯 Stage 1: Understand the code (6 min)

**Goal:** Know exactly what you're changing before you change it.

**1.** Open [src/components/gallery/GalleryGrid.tsx](../../src/components/gallery/GalleryGrid.tsx). Find the `selectedPhoto` state and the block that starts at the comment `{/* Photo Detail Modal - Placeholder for future implementation */}`.

**2.** Select the modal JSX, open Chat (Ask mode), and run:
```markdown
/explain
```

**3.** Ask a scoping question with codebase context:
```markdown
#codebase How does `selectedPhoto` get set and cleared, and where is the modal rendered? What would I need to change to show real photo details and close on Escape/backdrop?
```

**✅ Checkpoint:** You can name the state, the open/close handlers, and the exact JSX to change.

---

## 🎯 Stage 2: Move fast with inline suggestions (8 min)

**Goal:** Let Copilot draft the small pieces as you type.

**1.** Just above the `return`, add an intent comment and pause for a suggestion:
```tsx
// Close the modal on Escape and lock body scroll while a photo is selected
```
Copilot should suggest a `useEffect`. Accept with `Tab`. (If nothing appears, start typing `useEffect(() => {` and pause.)

> You'll need `useEffect` imported. Copilot's **Next Edit Suggestions** will often offer to update the import — accept it, or add `import { useState, useEffect } from 'react';`.

**2.** Use **Next Edit Suggestions** (the arrow/tab prompts that jump you to the next likely edit) to move from the effect to the modal markup.

**✅ Checkpoint:** You have a working Escape handler and body-scroll lock accepted from inline suggestions.

---

## 🧗 Stage 3 (Challenge): Plan the rest (6 min)

> **Your turn to prompt.** You've seen the mechanics — now drive Plan mode yourself.

**Your goal:** Use **Plan mode** to produce an ordered plan for the *remaining* modal work: show real details for `selectedPhoto`, close on backdrop click (but not when clicking inside the content), and keep the Escape + scroll-lock behavior — without touching unrelated components.

**Done when:**
- [ ] You wrote your own Plan-mode prompt (no copy/paste from earlier stages).
- [ ] The plan is ordered, scoped to `GalleryGrid.tsx`, and preserves existing styling/dark mode.
- [ ] You answered any clarifying questions Copilot asked.

<details><summary>💡 Stuck? Reveal a hint</summary>

Name the file, list the three behaviors as numbered outcomes, and add a constraint like "keep existing Tailwind/dark-mode classes; don't change unrelated components."

</details>

---

## 🧗 Stage 4 (Challenge): Implement with Agent mode (12 min)

**Your goal:** Switch to **Agent** mode and implement your plan. Your scoped `instructions/typescript.instructions.md` from Lab 1 applies automatically to `.tsx` files — lean on it.

**Done when:**
- [ ] You wrote your own Agent prompt to implement the plan.
- [ ] Backdrop click closes the modal; clicks inside the content do **not** (think `stopPropagation`).
- [ ] The modal shows photographer, all tags, and likes/downloads/views in the existing styles.
- [ ] You reviewed each edit (**Keep**/**Undo**) and no unrelated files changed.

<details><summary>💡 Stuck? Reveal a hint</summary>

Tell Agent to "implement the approved plan in GalleryGrid.tsx," and be explicit about the backdrop-vs-content click behavior and which `Photo` fields to render. Then verify against the Definition of Done.

</details>

---

## 🎯 Stage 5: Verify & iterate (5 min)

**Goal:** Prove it works and fix anything rough.

1. In the browser at [http://localhost:3000/gallery](http://localhost:3000/gallery), click **View Details** and test all four Definition-of-Done items.
2. If something's off, select the code and use `/fix`, or ask:
   ```markdown
   Clicking inside the modal content still closes it. Fix the event handling so only backdrop clicks close it.
   ```
3. Optional: switch to your **Reviewer** agent from Lab 1 and ask it to review your changes.

**✅ Checkpoint:** All four Definition-of-Done boxes pass.

---

## 🚀 Ship it: PR + Copilot review (5 min)

1. **Stage & commit** — generate the commit message with Copilot.
2. **Push:**
   ```bash
   git push -u origin USERNAME/lab-2-core-dev
   ```
3. **Open a Pull Request.**
4. **Request a Copilot review** (Reviewers → Copilot) and **triage** its comments.

**🎉 Success:** A finished, polished feature in a PR reviewed by Copilot.

## ✅ Completion Checklist
- [ ] Explored the modal code with `/explain` and `#codebase`
- [ ] Accepted inline suggestions for Escape + scroll lock
- [ ] Drafted the change in Plan mode
- [ ] Implemented backdrop-close + real details in Agent mode
- [ ] Verified all four Definition-of-Done items in the browser
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

Continue to **Lab 3: Unit Testing** — you'll test the behavior you just built.

### 🌟 Take-home challenge (do this on your own time)
Add **keyboard navigation** to the modal: arrow keys move to the previous/next photo without closing it, and focus is trapped inside the modal for accessibility. Plan it, implement it in Agent mode, and open a PR.
