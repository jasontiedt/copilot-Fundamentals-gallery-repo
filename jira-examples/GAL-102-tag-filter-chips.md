# GAL-102 · Story · Filter photos with tag chips

| Field | Value |
|-------|-------|
| **Key** | GAL-102 |
| **Type** | Story |
| **Priority** | Medium |
| **Status** | To Do |
| **Epic** | [GAL-100](GAL-100-epic-search-discovery.md) |
| **Sprint** | Sprint 42 |
| **Story points** | 3 |
| **Components** | `app/gallery`, `lib/gallery-utils`, `gallery` |
| **Labels** | filter, tags, frontend |
| **Reporter** | P. Okafor |
| **Assignee** | Unassigned |

## User story

> **As a** visitor browsing themes
> **I want** to click tag chips to narrow the grid
> **so that** I can see only photos that match the themes I care about.

## Background

`filterPhotos` accepts a `tags` array and matches **any** provided tag, case-insensitively. This
story surfaces the available tags as toggleable chips and feeds selected tags into that filter.

## User experience

- A horizontal, wrapping row of tag chips derived from the visible dataset.
- Clicking a chip toggles it **on/off**; multiple chips combine as OR (match any).
- Active chips are visually distinct and expose `aria-pressed`.
- A **Clear tags** control appears when at least one chip is active.
- Tag selection combines with the GAL-101 search query (AND across filter types).

### Simulated wireframe

```text
Tags:  [ landscape* ] [ portrait ] [ city* ] [ night ] [ studio ]   Clear tags
                *active
┌──────┐ ┌──────┐ ┌──────┐
│ IMG  │ │ IMG  │ │ IMG  │   ← photos tagged landscape OR city
└──────┘ └──────┘ └──────┘
```

## Simulated attachments

- `tag-chips-row.png` — chip row with active/inactive/hover states.
- `tag-chips-wrap-mobile.png` — chip wrapping behavior on a 375px viewport.

## Architecture

```mermaid
flowchart LR
  Chips[Tag chip row] -->|selectedTags[]| State[state in page.tsx]
  Search[query] --> State
  State -->|filterPhotos tags + searchQuery| Utils[lib/gallery-utils.ts]
  Utils --> Grid[GalleryGrid.tsx]
```

**Files affected**

- `src/app/gallery/page.tsx` — chip state, derive unique tags, combine with query.
- `src/components/gallery/` — a small presentational `TagChips` component.

## Acceptance criteria

```gherkin
Scenario: Toggle a single tag
  When I click the "landscape" chip
  Then only photos tagged "landscape" (any case) are shown
  And the chip shows aria-pressed="true"

Scenario: Multiple tags are OR
  When I activate "landscape" and "city"
  Then photos tagged landscape OR city are shown

Scenario: Tags combine with search (AND)
  Given the search box contains "john"
  When I activate the "city" chip
  Then only city photos by a photographer matching "john" are shown

Scenario: Clear tags
  Given two chips are active
  When I click "Clear tags"
  Then no chips are active and the grid reflects only the search query

Scenario: No tags in dataset
  Given no visible photo has tags
  Then the tag row is not rendered
```

## Test notes

- Utility behavior for `tags` is already covered; focus component tests on chip toggling,
  `aria-pressed`, OR-combination, and the empty-tags render guard.

## Definition of done

- [ ] Chips derived from data, toggle OR-combine, and clear.
- [ ] Combines correctly with search query.
- [ ] Accessible pressed state; component tests green.

## Activity

- **2026-01-28** — Groomed to 3 points; depends on GAL-101 landing first.
