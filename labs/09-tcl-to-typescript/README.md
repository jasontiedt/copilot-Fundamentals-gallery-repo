# Lab 9: Migrate Tcl → TypeScript with Copilot

**Scenario:** Your team owns a **legacy Tcl** utility, `gallery_report.tcl`, that still runs in production but nobody wants to maintain it. You've been asked to **reimplement it in TypeScript** — with **identical behavior**. This lab shows how Copilot makes a language migration safe and fast: understand the old code, **de-risk the ambiguous parts by asking the original intent**, plan the port, convert incrementally, and prove **behavior parity**.

This is the **Migration & Modernization** lab — an advanced, single-scenario lab (source: **Tcl**, target: **TypeScript**), so there's no language picker.

**Estimated Time:** ~50 minutes *(advanced)*

## 📦 The project

The "before" code lives in [labs/starter/tcl/](../starter/tcl/README.md):
- `gallery_report.tcl` — loads pipe-delimited photo data and prints reports (`filter`, `search`, `top`, `report`).
- `photos.dat` — sample data.
- A **golden-master** output you'll port against.

**Branch for this lab:**
```bash
git checkout main && git pull
git checkout -b USERNAME/lab-9-tcl-to-typescript
cd labs/starter/tcl
```

> **Running TypeScript here:** this folder is a standalone script, so run your port with `npx tsx gallery_report.ts …` (works on any Node) or `node gallery_report.ts …` on Node 22+.

## ✅ Definition of Done
- [ ] A `gallery_report.ts` with the **same CLI** and **byte-identical output** to the Tcl for `report`, `top`, `search`, and `filter`.
- [ ] The ambiguous `score` truncation is confirmed and preserved (`Math.trunc`).
- [ ] Parity is proven by a test (or an output `diff`).
- [ ] You built a **migration agent** and an **annotate prompt** you can reuse on the next legacy script.

## What You'll Learn
By the end of this lab, you will:
- [ ] Explore unfamiliar legacy code with **Ask mode**, `/explain`, and `#file`
- [ ] Build a **custom agent** that specializes in Tcl→TypeScript migration
- [ ] Create a **prompt file** that annotates Tcl and **asks you when intent is unclear**
- [ ] Produce a **migration plan** with **Plan mode**
- [ ] Convert incrementally with **Agent mode** and prove **behavior parity**
- [ ] **Ship it**: push, open a PR, and get a Copilot review

## 🧩 The stages

| Stage | Focus | Feature | ~Time |
| ----- | ----- | ------- | ----- |
| 1 | Understand | Ask, `/explain`, `#file` | 6 min |
| 2 | Tooling | Build a **migration agent** | 6 min |
| 3 | De-risk | **Annotate prompt** that asks when unsure | 8 min |
| 4 | Plan | **Plan mode** migration plan | 7 min |
| 5 | Baseline | Capture the golden master | 3 min |
| 6 | Convert | Agent mode, incremental port | 10 min |
| 7 | Verify | Behavior parity + `/fix` | 6 min |
| — | **Ship it** | Push → PR → Copilot review | 4 min |

---

## 🎯 Stage 1: Understand the legacy code (6 min)

**Goal:** Get oriented before changing anything.

**1.** Open [labs/starter/tcl/gallery_report.tcl](../starter/tcl/gallery_report.tcl). In **Ask** mode:
```markdown
#file:gallery_report.tcl Explain what this Tcl program does end to end: its subcommands, the data format, and any Tcl idioms (dict, lsort -command, regsub) that won't map 1:1 to TypeScript.
```

**2.** Select the `score` proc and run `/explain`. Notice the integer division — **jot down anything you're unsure about**; you'll resolve it in Stage 3.

**✅ Checkpoint:** You can name the four subcommands and at least two risky idioms.

---

## 🎯 Stage 2: Build a migration agent (6 min)

**Goal:** Create a reusable **custom agent** that specializes in this exact job — and, crucially, **asks instead of guessing**.

Create `.github/agents/tcl-to-typescript.agent.md`:
```markdown
---
name: Tcl to TypeScript Migrator
description: Ports Tcl to behavior-identical TypeScript, asking before guessing
tools: ['search/codebase', 'edit/editFiles', 'search']
---

# Tcl → TypeScript Migrator

You port legacy **Tcl** to idiomatic **TypeScript (Node)** with **identical observable behavior**.

Rules:
- **Preserve behavior exactly**, including integer truncation, sort stability, and output formatting/whitespace.
- Map idioms faithfully: `dict` → object/`Map`, `lsort -command` → `Array.prototype.sort((a, b) => …)` (stable), `regsub -all` → `String.replace(/…/g, …)`, `expr {int(x)/100}` → `Math.trunc(x / 100)`.
- **Never invent behavior.** If a proc's intent is ambiguous, **stop and ask me** a specific question before porting it.
- Keep the **CLI and output byte-identical**. Add tests (Vitest or `node:test`) that compare against the Tcl golden master.
- Work in small steps and explain each mapping decision briefly.
```

Create it via `/agents` → **New Agent** (or **Configure Chat** ⚙ → **Agents** tab), then select **Tcl to TypeScript Migrator** from the mode picker to confirm it loads.

**✅ Checkpoint:** The migrator agent appears in the chat mode picker.

---

## 🎯 Stage 3: De-risk — annotate the Tcl and ask when unsure (8 min)

**Goal:** Before porting, make the legacy code *legible* — and capture the **original intent** of anything ambiguous straight from you (or your teammates).

**1.** Create `.github/prompts/annotate-tcl.prompt.md`:
```markdown
---
agent: 'agent'
description: 'Add explanatory comments to Tcl and ask about anything ambiguous'
tools: ['codebase', 'editFiles']
---

# Annotate legacy Tcl

For the selected Tcl file (or the file I name):
1. Add a concise comment above **each proc** stating its purpose, inputs, and return value.
2. Add short inline comments on any **non-obvious** line (regex, bit/int math, custom sort, upvar).
3. **Do not change behavior** — comments only.
4. Then list every spot whose **intent is unclear or looks intentional-but-surprising**
   (magic numbers, truncation, tie-breaking) and **ask me to confirm what it should do**
   before I rely on it. Number your questions.
```

**2.** Open `gallery_report.tcl`, run `/annotate-tcl`, and **answer its questions**. Expect it to ask about the `score` weights and the `/100` truncation — tell it the truncation is intentional so the TypeScript port matches.

> 💬 This "ask-when-unsure" loop is the difference between a migration that *looks* right and one that *is* right. Your answers become ground truth for the port.

**✅ Checkpoint:** The Tcl is fully commented and you've recorded answers to every ambiguity.

---

## 🎯 Stage 4: Plan the migration (7 min)

**Goal:** Use **Plan mode** to sequence the work.

Switch Chat to **Plan** mode:
```markdown
Create a migration plan to port gallery_report.tcl to a byte-identical gallery_report.ts:
- inventory each proc and its TypeScript target (camelCase),
- an idiom mapping table (Tcl → TypeScript),
- conversion order (leaf helpers first: loadPhotos, normalize, score, then topBy, search, formatReport, then the CLI),
- a parity-test strategy against the golden-master output,
- risks (integer truncation, sort stability, output whitespace/padding).
```

**Reference — common mappings:**

| Tcl | TypeScript |
| --- | ---------- |
| `set x 5` / `proc f {a b}` | `const x = 5;` / `function f(a, b) {}` |
| `dict create/get/set` | object literal / `obj[k]` (or `Map`) |
| `lappend` / `lindex` / `llength` / `lrange` | `.push` / `arr[i]` / `.length` / `.slice` |
| `foreach x $xs {}` | `for (const x of xs) {}` |
| `lsort -command cmp` | `arr.sort((a, b) => …)` *(stable since ES2019)* |
| `split` / `join` | `str.split` / `arr.join` |
| `regexp` / `regsub -all` | `RegExp.test` / `str.replace(/…/g, …)` |
| `expr {int($x)/100}` | `Math.trunc(x / 100)` *(truncates!)* |
| `open`/`gets`/`close` | `fs.readFileSync(p, 'utf8').split('\n')` |
| `switch` / `puts` / `format` | `switch` / `console.log` / template literals + `padEnd`/`padStart` |

**✅ Checkpoint:** An ordered plan you agree with, leaf-helpers-first.

---

## 🎯 Stage 5: Capture the baseline (3 min)

**Goal:** Freeze a golden master so parity is objective.

If you have `tclsh`:
```bash
tclsh gallery_report.tcl photos.dat report > expected_report.txt
tclsh gallery_report.tcl photos.dat top views 3 > expected_top.txt
```
No `tclsh`? Use the golden master in the [starter README](../starter/tcl/README.md).

**✅ Checkpoint:** You have expected output to diff against.

---

## 🧗 Stage 6 (Challenge): Convert incrementally (10 min)

**Your goal:** With the **Tcl to TypeScript Migrator** agent selected and your plan in hand, port the program to `gallery_report.ts` — **leaf helpers first**, checking parity as you go. Don't paste one giant prompt; drive it stage by stage.

**Done when:**
- [ ] `gallery_report.ts` exists with the same subcommands and argument order.
- [ ] Each helper was ported in plan order, and you reviewed every edit.
- [ ] The `score` truncation uses `Math.trunc` (per your Stage 3 answer).

<details><summary>💡 Stuck? Reveal a hint</summary>

Ask the migrator agent, one step at a time: "Port `load_photos` to a `loadPhotos` function matching the data format," then "now `score` (keep integer truncation via `Math.trunc`)," etc. After each, run `npx tsx gallery_report.ts photos.dat report` and compare.

</details>

---

## 🧗 Stage 7 (Challenge): Prove behavior parity (6 min)

**Your goal:** Make the TypeScript output **identical** to the Tcl.

**Done when:**
- [ ] `npx tsx gallery_report.ts photos.dat report` matches the golden master exactly.
- [ ] You have a **parity test** (Vitest / `node:test` comparing outputs, or a committed `diff` check) for `report` and `top views 3`.
- [ ] Any mismatch was fixed with `/fix` (watch for `/` vs `Math.trunc`, `padEnd(22)`/`padStart(5)` widths, tie order).

<details><summary>💡 Stuck? Reveal a hint</summary>

```bash
diff <(npx tsx gallery_report.ts photos.dat report) expected_report.txt && echo PARITY_OK
```
Or ask Copilot to "write a Vitest test that runs both `report` commands via `child_process` and asserts equal output." If padding differs, match the `format "%-22s %5d pts  (%d views)"` widths with `title.padEnd(22)` and `String(score).padStart(5)`.

</details>

---

## 🚀 Ship it: PR + Copilot review (4 min)

1. **Commit** `gallery_report.ts`, your parity test, the annotated Tcl, and the new agent + prompt files (generate the message with Copilot).
2. **Push:** `git push -u origin USERNAME/lab-9-tcl-to-typescript`
3. **Open a PR**, then under **Reviewers**, next to **Copilot**, click **Request**. Ask it specifically to check behavior parity and edge cases. Triage its comments.

**🎉 Success:** A legacy Tcl tool reborn as behavior-identical TypeScript — with reusable migration tooling.

## ✅ Completion Checklist
- [ ] Explained the Tcl with `/explain` and `#file`
- [ ] Built the `tcl-to-typescript.agent.md` migration agent
- [ ] Created `annotate-tcl.prompt.md` and answered its ambiguity questions
- [ ] Produced a migration plan in Plan mode
- [ ] Captured the golden-master baseline
- [ ] Ported to `gallery_report.ts` incrementally
- [ ] Proved parity with a test/diff
- [ ] Opened a PR and got a Copilot review

## 🏁 What's Next?

You've completed the migration lab! Your **migration agent** and **annotate prompt** are portable — drop them into any repo with legacy scripts.

Continue to **[Lab 10: Local Code Review Agent](../10-local-code-review/README.md)** to build a pre-push quality gate of your own.

### 🌟 Take-home challenge (do this on your own time)
Point the same agent + annotate prompt at a **real legacy script** from your world (Tcl, Perl, Bash, or VBScript) and port one module to your target language — proving parity with a golden-master test. Then generalize the agent's rules to your language pair.
