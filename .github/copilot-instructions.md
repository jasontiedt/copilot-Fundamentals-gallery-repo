# Copilot Instructions for the Photo Gallery

## Project Context

- The primary application is a Next.js 15 App Router project using React 19, TypeScript, Tailwind CSS, Jest, and Testing Library.
- Reusable UI belongs in `src/components/`; routes and API handlers belong in `src/app/`; utilities, types, and mock data belong in `src/lib/`.
- The repository also contains language-specific training projects under `labs/starter/`. Follow the conventions and test framework already used by the selected starter.
- Preserve the existing component-driven architecture, strict TypeScript interfaces, mock-data patterns, responsive behavior, and dark-mode styling.

## Implementation Expectations

- Make the smallest change that satisfies the requested behavior and preserve public APIs unless the request requires a contract change.
- Keep business logic in pure utilities or services where practical; keep React components focused on rendering and user interaction.
- Validate inputs at system boundaries such as API handlers, uploads, forms, and public utility functions.
- Prefer explicit failure behavior and specific errors over silent fallback for invalid state.
- Do not mutate caller-owned arrays, objects, props, or mock data.

## Unit Test Coverage

- Add or update unit tests for every behavior change. A change is incomplete when its success path, relevant boundary conditions, and expected failure paths are not exercised.
- Test observable behavior rather than implementation details. Assert returned values, rendered output, state visible to the user, emitted responses, and documented errors.
- Cover every changed branch in utilities, services, API handlers, and state transitions. Use coverage output to find omissions, but do not write low-value assertions solely to increase a percentage.
- Keep tests deterministic and isolated. Do not depend on test order, wall-clock timing, network access, or shared mutable fixtures.
- Use small factories or builders for test data, overriding only fields relevant to the scenario. Reuse the `makePhoto` style from `src/lib/gallery-utils.test.ts`.
- Give tests behavior-oriented names that state the condition and expected outcome. Keep one primary behavior per test.

## Required Edge Cases

For changed behavior, select all applicable cases from this matrix:

- Missing values: `null`, `undefined`, omitted optional fields, and empty strings.
- Empty collections and no-match results.
- Boundary values: zero, one, minimum and maximum accepted values, final partial pages, and values just outside the accepted range.
- Invalid types or malformed payloads at runtime, even when TypeScript types normally prevent them.
- Whitespace, mixed case, Unicode, and special characters in user-entered search or metadata.
- Duplicate values, stable ordering, ties, and missing sort keys.
- Failure paths: unsupported operations, rejected input, not-found records, upload errors, and divide-by-zero or equivalent domain errors.
- Immutability: verify sorting, filtering, and transformations do not modify their inputs.
- Repeated actions and state transitions: retry, reset, clear, cancel, and submitting twice when applicable.

Do not add irrelevant edge cases mechanically. Each case should correspond to a plausible contract, branch, regression, or user action.

## Scenario Coverage by Surface

### TypeScript Utilities

- Use Jest with colocated `*.test.ts` files.
- Prefer table-driven `it.each` cases when several inputs share the same expected behavior.
- Cover normal input, empty or malformed input, boundaries, combined options, no-match results, and input immutability.

### React Components

- Use Testing Library and `@testing-library/user-event`; query by role, accessible name, label, or visible text.
- Cover initial rendering, meaningful user interactions, loading or pending state, empty state, error state, successful completion, and reset or retry behavior where present.
- Assert what a user can observe. Avoid testing hook internals, private functions, CSS implementation details, or snapshots as the only evidence.
- Include accessibility-relevant behavior such as keyboard interaction, focus changes, dialog semantics, and disabled controls when applicable.

### Next.js Routes and API Handlers

- Cover supported methods, valid requests, malformed input, missing required fields, not-found results, downstream failures, and response status/body contracts.
- Mock external boundaries, not the logic under test. Verify that errors do not leak stack traces or sensitive implementation details.

### Python Starters

- Use `pytest`; place tests under `labs/starter/python/tests/` and name them `test_*.py`.
- Use `@pytest.mark.parametrize` for equivalent input cases and fixtures such as `tmp_path` for filesystem behavior.
- Assert specific exception types and meaningful messages for invalid input and failure paths.

### Other Language Starters

- Follow the existing framework for that starter: xUnit for C# and JUnit 5 for Java.
- Mirror the same behavioral matrix: happy path, empty input, boundaries, invalid input, failure paths, and non-mutation where applicable.

## Validation

- Run the narrowest relevant test first, then the broader affected suite.
- For the Next.js application, use `npm test -- --runInBand <test-file>` for a focused check and `npm run test:ci -- --coverage` for the full Jest suite with coverage.
- For the Python starter, run `pytest <test-file>` from `labs/starter/python/`, then `pytest`.
- For Java, run `mvn -q test`; for C#, run `dotnet test` against the relevant test project.
- Report tests that were run and any validation that could not be completed. Do not claim coverage for unexecuted tests.
