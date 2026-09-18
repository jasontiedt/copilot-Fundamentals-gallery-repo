# GAL-301 · Story · Admin dashboard stats grid

| Field | Value |
|-------|-------|
| **Key** | GAL-301 |
| **Type** | Story |
| **Priority** | Medium |
| **Status** | To Do |
| **Epic** | — |
| **Sprint** | Sprint 45 |
| **Story points** | 3 |
| **Components** | `app/admin`, `ui/stats`, `lib/gallery-utils` |
| **Labels** | admin, dashboard, frontend |
| **Reporter** | S. Ito (Product) |
| **Assignee** | Unassigned |

## User story

> **As an** admin
> **I want** a stats grid summarizing the catalog
> **so that** I can see totals and top performers at a glance.

## Background

`calculateGalleryStats(photos)` already returns `totalPhotos`, `totalLikes`, `totalDownloads`,
`totalViews`, `mostPopularTag`, and `topPhotographer`, counting tags case-insensitively, trimming
photographer names, and safely ignoring `null` entries. This story renders those into `StatsGrid`.

## User experience

- Four metric cards (photos, likes, downloads, views) plus highlights for most popular tag and
  top photographer.
- Colors follow the existing `StatsGrid` palette (`blue | green | purple | orange`).
- Zero-data state shows zeros and "—" for the highlight fields (never a crash).

### Simulated wireframe

```text
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Photos     │ │ Likes      │ │ Downloads  │ │ Views      │
│    24      │ │   1,203    │ │    311     │ │  18,540    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
Most popular tag: nature   ·   Top photographer: Ann
```

## Simulated attachments

- `admin-stats-grid.png` — populated grid, light + dark.
- `admin-stats-empty.png` — zeroed state with "—" highlights.

## Architecture

```mermaid
flowchart LR
  Data[photos] --> Stats[calculateGalleryStats]
  Stats --> Grid[StatsGrid in ui/stats]
  Grid --> Admin[app/admin/page.tsx]
```

**Files affected**

- `src/app/admin/page.tsx` — compose stats into the grid.
- `src/components/ui/stats/` — reuse `StatsGrid`.

## Acceptance criteria

```gherkin
Scenario: Populated stats
  Given a non-empty catalog
  Then totals match the sum of likes, downloads, and views
  And most popular tag and top photographer are shown

Scenario: Case-insensitive tag aggregation
  Given tags "Nature", "nature", and "NATURE"
  Then they count as one tag "nature"

Scenario: Empty catalog
  Given no photos
  Then all totals read 0 and highlights read "—" without error

Scenario: Null entries are ignored
  Given the array contains a null entry
  Then totals are computed from valid entries without throwing
```

## Test notes

- Utility behavior is already covered in `gallery-utils.test.ts`; add component tests for the
  populated grid, the empty/zero state, and the "—" highlight fallback.

## Definition of done

- [ ] Stats grid wired via `calculateGalleryStats`.
- [ ] Empty and null-safe rendering.
- [ ] Component tests green.

## Activity

- **2026-02-10** — Small; good onboarding ticket.
