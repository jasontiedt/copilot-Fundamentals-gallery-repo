# QA Validation Report — <Feature / Release>

> Fill one report per validation session. QA validates the **deployed** experience against the
> work item's acceptance criteria. Copilot may draft this report; a **human QA lead approves it**.

## Session details

| Field | Value |
|-------|-------|
| **Environment (BASE_URL)** | `https://…` |
| **Build / version under test** | `<build id or tag>` |
| **Tester** | `<your name>` |
| **Date** | `YYYY-MM-DD` |
| **Work items validated** | `GAL-…`, `GAL-…` |
| **Tools** | Copilot (Agent mode) + Playwright MCP browser |

## Per-ticket results

### `<GAL-XXX>` — `<title>`

| # | Acceptance-criteria scenario | Expected (observable) | Result | Evidence |
|---|------------------------------|-----------------------|--------|----------|
| 1 | `<scenario>` | `<what a user should see>` | ✅ Pass / ❌ Fail | `screenshot-01.png` |
| 2 | | | | |
| 3 | | | | |

**Edge cases checked:** `<empty / whitespace / no-match / reload / …>`

**Notes:** `<anything a screenshot can't convey — subjective UX, visual polish concerns>`

_(Repeat the table above for each additional work item.)_

## Defects found

| Defect | Severity | Work item | Status | Link |
|--------|----------|-----------|--------|------|
| `<short title>` | Critical / Major / Minor | `GAL-…` | Open | `qa-artifacts/bug-…md` |

## Human-in-the-loop notes

- Items that need **human visual judgment** (not decidable from the a11y tree/screenshots):
  `<list, e.g., spacing, color, brand feel>`
- Areas **not covered** this session and why: `<e.g., performance, cross-browser, mobile>`

## Recommendation

> Copilot's recommendation is **advisory**. Production signoff is a human decision.

- **Recommendation:** ⬜ Go  ⬜ **No-Go**  ⬜ Go with conditions
- **Rationale:** `<e.g., GAL-101 passes; GAL-502 fails with a Critical XSS defect — blocking>`
- **Conditions to clear (if any):** `<defects that must be fixed and re-validated>`

## Approval (human)

| Role | Name | Decision | Date |
|------|------|----------|------|
| QA Lead (approver of record) | `<name>` | ⬜ Approved ⬜ Rejected | `YYYY-MM-DD` |
