# Jira Examples — Photo Gallery & Portfolio

A library of **20 robust, real-world Jira tickets** modeled on the Photo Gallery & Portfolio
application in this repository. Each ticket is a self-contained work item you can hand to
an engineer (or to Copilot in the TDD-from-work-item and bug-repro labs) and start building.

Every ticket includes:

- **Metadata table** — key, type, priority, status, epic link, sprint, points, components, labels.
- **User story** — `As a … I want … so that …`.
- **User experience notes** — behavior, states, and a simulated ASCII wireframe.
- **Simulated attachments** — image filenames a real ticket would carry, with descriptions.
- **Architecture** — a Mermaid diagram and the concrete files/modules affected.
- **Acceptance criteria** — Gherkin `Given/When/Then` scenarios, including edge cases.
- **Definition of Done** and a short **activity log**.

> The `GAL-` project key, sprint names, and people are fictional. File paths reference the
> real app (`src/…`) and the language starters (`labs/starter/…`) so tickets stay actionable.

## Index

| Key | Type | Priority | Summary |
|-----|------|----------|---------|
| [GAL-100](GAL-100-epic-search-discovery.md) | Epic | High | Search & Discovery experience |
| [GAL-200](GAL-200-epic-upload-pipeline.md) | Epic | High | Upload pipeline modernization |
| [GAL-101](GAL-101-live-search.md) | Story | High | Live search filtering on the gallery page |
| [GAL-102](GAL-102-tag-filter-chips.md) | Story | Medium | Filter photos with tag chips |
| [GAL-103](GAL-103-sort-photos.md) | Story | Medium | Sort photos by likes, title, or recency |
| [GAL-104](GAL-104-pagination-infinite-scroll.md) | Story | High | Paginated "load more" gallery |
| [GAL-105](GAL-105-photo-detail-lightbox.md) | Story | High | Photo detail lightbox modal |
| [GAL-106](GAL-106-photo-comments.md) | Story | Medium | Comments on a photo |
| [GAL-107](GAL-107-like-photo-optimistic.md) | Story | Medium | Like a photo with optimistic UI |
| [GAL-201](GAL-201-drag-drop-upload.md) | Story | High | Drag-and-drop multi-file upload |
| [GAL-202](GAL-202-client-image-validation.md) | Story | High | Client-side image validation & preview |
| [GAL-203](GAL-203-upload-progress-retry.md) | Story | Medium | Upload progress and retry |
| [GAL-301](GAL-301-admin-stats-grid.md) | Story | Medium | Admin dashboard stats grid |
| [GAL-302](GAL-302-photographer-leaderboard.md) | Story | Low | Photographer leaderboard |
| [GAL-401](GAL-401-dark-mode-persistence.md) | Story | Low | Persist dark-mode preference |
| [GAL-402](GAL-402-gallery-keyboard-a11y.md) | Story | High | Keyboard-accessible gallery grid |
| [GAL-403](GAL-403-empty-loading-error-states.md) | Story | Medium | Consistent empty / loading / error states |
| [GAL-501](GAL-501-bug-most-viewed.md) | Bug | High | `most_viewed` returns the wrong photo |
| [GAL-502](GAL-502-bug-search-xss.md) | Bug | Critical | Stored XSS via unescaped search highlight |
| [GAL-601](GAL-601-spike-responsive-images.md) | Spike | Medium | Evaluate responsive images / CDN strategy |

## Suggested pairings with the labs

- **Lab 06 (TDD from a work item):** [GAL-107](GAL-107-like-photo-optimistic.md), [GAL-103](GAL-103-sort-photos.md).
- **Lab 08 (Bug repro → report → delegate):** [GAL-501](GAL-501-bug-most-viewed.md), [GAL-503 pattern](GAL-104-pagination-infinite-scroll.md).
- **Lab 10 (Local code review / security):** [GAL-502](GAL-502-bug-search-xss.md).
