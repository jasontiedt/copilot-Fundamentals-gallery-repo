---
name: typescript-testing
description: 'Use when writing or reviewing React component tests with TypeScript and React Testing Library, including queries, user interactions, and required state coverage.'
---

# TypeScript React Testing

## File Organization

- Co-locate each component test with the component it covers.
- Name component test files `*.test.tsx`.

## Testing Conventions

- Query elements by accessible role, label, or visible text.
- Use `userEvent` for user interactions.
- Assert user-visible behavior instead of implementation details.

## Required Coverage

Every component test suite must cover:

- The default render state.
- Empty and loading states when the component supports them.
- At least one user interaction and its visible outcome.