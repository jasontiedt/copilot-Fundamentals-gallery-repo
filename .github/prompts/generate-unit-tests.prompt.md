---
agent: 'agent'
description: 'Generate unit tests for newly developed or enhanced TypeScript/React modules following project test conventions'
tools: ['search/codebase', 'edit/editFiles']
-----
agent: 'agent'
description: 'Generate unit tests for newly developed or enhanced TypeScript/React modules following project test conventions'
tools: ['search/codebase', 'edit/editFiles']
---

# Generate Unit Tests for Code Enhancements


## Purpose
Generate comprehensive unit tests for new or modified TypeScript utilities, React components, or data functions following the project's testing conventions. Use this prompt file after completing new feature development to ensure all code enhancements are covered by robust unit tests.

## Project Testing Conventions
- **Testing Framework**: Vitest / Jest with TypeScript.
- **File Suffix & Location**: Co-locate test files next to the code being tested using `<filename>.test.ts` for pure logic/utilities or `<filename>.test.tsx` for React components (e.g., `src/lib/gallery-utils.ts` -> `src/lib/gallery-utils.test.ts`).
- **Test Structure**:
  - Group tests using `describe('<ModuleNameOrComponent>', () => { ... })`.
  - Use descriptive `it('should <expected behavior> when <condition>')` blocks.
  - Follow the **Arrange-Act-Assert** pattern.

## Requirements for Test Generation

### 1. Target Selection
- If a target file or active editor file is selected, generate unit tests for that module.
- If no file is selected, ask: *"Which file or module would you like to generate unit tests for?"*

### 2. Test Coverage Categories
For each exported function, utility, hook, or component in the new/enhanced code, generate test cases for:

- **Happy Path / Standard Usage**:
  - Test valid input parameters and expected return values.
  - Verify standard rendering and state transitions.

- **Boundary Conditions & Limits**:
  - Test empty collections (`[]`), empty strings (`""`), and empty objects (`{}`).
  - Test numeric boundaries (`0`, negative numbers, max values).
  - Test pagination edge cases (e.g., page 0, page beyond total pages, `perPage = 0`).

- **Edge Cases & Failure Points**:
  - `null` and `undefined` parameter handling.
  - Malformed or unexpected data structures.
  - Error handling and thrown exceptions.

- **Async & Dependency Mocking**:
  - Use `async/await` for asynchronous code.
  - Mock external dependencies or imports using module-level mocks.

### 3. Component Test Patterns (React / UI)
- Test user interactions and visual states (loading, empty, error).
- Test conditional Tailwind styling and dark mode variants where applicable.
- Query elements by accessibility roles, labels, or text content.

## Instructions
1. Inspect the target source file and identify all exported functions, hooks, or components.
2. Create or update the adjacent `<filename>.test.ts` or `<filename>.test.tsx` file.
3. Include tests covering standard usage, boundary limits, and edge cases involving `null`, points of failure, or unexpected input.
4. Run `npm test` to verify that all generated tests pass cleanly.



## Purpose
Generate comprehensive unit tests for new or modified TypeScript utilities, React components, or data functions following the project's testing conventions. Use this prompt file after completing new feature development to ensure all code enhancements are covered by robust unit tests.

## Project Testing Conventions
- **Testing Framework**: Vitest / Jest with TypeScript.
- **File Suffix & Location**: Co-locate test files next to the code being tested using `<filename>.test.ts` for pure logic/utilities or `<filename>.test.tsx` for React components (e.g., `src/lib/gallery-utils.ts` -> `src/lib/gallery-utils.test.ts`).
- **Test Structure**:
  - Group tests using `describe('<ModuleNameOrComponent>', () => { ... })`.
  - Use descriptive `it('should <expected behavior> when <condition>')` blocks.
  - Follow the **Arrange-Act-Assert** pattern.

## Requirements for Test Generation

### 1. Target Selection
- If a target file or active editor file is selected, generate unit tests for that module.
- If no file is selected, ask: *"Which file or module would you like to generate unit tests for?"*

### 2. Test Coverage Categories
For each exported function, utility, hook, or component in the new/enhanced code, generate test cases for:

- **Happy Path / Standard Usage**:
  - Test valid input parameters and expected return values.
  - Verify standard rendering and state transitions.

- **Boundary Conditions & Limits**:
  - Test empty collections (`[]`), empty strings (`""`), and empty objects (`{}`).
  - Test numeric boundaries (`0`, negative numbers, max values).
  - Test pagination edge cases (e.g., page 0, page beyond total pages, `perPage = 0`).

- **Edge Cases & Failure Points**:
  - `null` and `undefined` parameter handling.
  - Malformed or unexpected data structures.
  - Error handling and thrown exceptions.

- **Async & Dependency Mocking**:
  - Use `async/await` for asynchronous code.
  - Mock external dependencies or imports using module-level mocks.

### 3. Component Test Patterns (React / UI)
- Test user interactions and visual states (loading, empty, error).
- Test conditional Tailwind styling and dark mode variants where applicable.
- Query elements by accessibility roles, labels, or text content.

## Instructions
1. Inspect the target source file and identify all exported functions, hooks, or components.
2. Create or update the adjacent `<filename>.test.ts` or `<filename>.test.tsx` file.
3. Include tests covering standard usage, boundary limits, and edge cases involving `null`, points of failure, or unexpected input.
4. Run `npm test` to verify that all generated tests pass cleanly.

