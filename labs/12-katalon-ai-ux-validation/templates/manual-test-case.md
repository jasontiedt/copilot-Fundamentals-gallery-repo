# Manual Test Case — <GAL-XXX> · <title>

> Use this to capture the test cases the Katalon AI Assistant drafts, before (or instead of)
> automating them. Keep expected results **observable** — what a user sees on the deployed app.

## Header

| Field | Value |
|-------|-------|
| **Work item** | `GAL-…` |
| **Environment (BASE_URL)** | `https://…` |
| **Build / version** | `<build id or tag>` |
| **Author** | `<your name>` |
| **AI-assisted?** | Katalon AI Assistant (Ask / Agent mode) — reviewed by author |

## Test cases

### TC-1 — <happy path name>

| # | Step (user action) | Expected (observable) |
|---|--------------------|-----------------------|
| 1 | Go to `BASE_URL`/gallery | The gallery grid renders |
| 2 | Type `<term>` in the "Search photos" box | Only matching cards remain; count updates |
| 3 | Reload the page | The query persists in the URL; same results |

**Result:** ✅ Pass / ❌ Fail — `<notes>`

### TC-2 — <edge case: empty / whitespace / no-match>

| # | Step | Expected (observable) |
|---|------|-----------------------|
| 1 | `<action>` | `<what a user should see>` |

**Result:** ✅ Pass / ❌ Fail — `<notes>`

_(Add TC-3, TC-4 … for remaining edge and negative cases.)_

## Defect (if any)

| Field | Value |
|-------|-------|
| **Summary** | `<user-facing description>` |
| **Severity** | Critical / Major / Minor |
| **Steps to reproduce** | `1… 2… 3…` |
| **Expected vs actual** | `<per the work item>` / `<what happened>` |
| **Evidence** | `<screenshot / report link>` |
| **Filed via** | Katalon Bug Reporter (Jira/ADO) / manual |

## Notes for automation

- Objects to capture in the **Object Repository:** `<search box, photo card, …>`
- Variables to define: `<BASE_URL, searchTerm, …>`
- Keywords the assistant proposed that you **verified exist**: `<list>`
