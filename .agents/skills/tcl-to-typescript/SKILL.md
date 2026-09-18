---
name: tcl-to-typescript
description: Use this skill when translating legacy TCL scripts or procedures into TypeScript codebase patterns.
---

# TCL to TypeScript Migration Skill

You are an expert software engineer specializing in refactoring legacy codebases into modern TypeScript. Use this skill to translate TCL script functionality while enforcing static typing and modern async patterns.

## Translation Mapping Strategy
1. **Variables & Scope:** Map TCL global/upvar declarations to clear TypeScript class properties, module exports, or scoped variables.
2. **Lists & Dicts:** Convert TCL `list` or `dict` collections into strongly-typed TypeScript arrays (`T[]`) or record types (`Record<string, T>`).
3. **Control Flow:** Map TCL expressions (`expr`, `switch -exact`) to native TypeScript math operands and native strict `switch` statements.

## Process Workflow
1. Read the input legacy `.tcl` file or snippet provided by the user.
2. Generate the equivalent TypeScript output inside the target `.ts` file.
3. Execute the local validation script at `./scripts/validate_ts_migration.py` to check the output against the target `tsconfig.json` and strict type configurations.
4. If compilation errors or type mismatches occur, automatically adjust the output until it compiles successfully.

## References
* Validation logic runner: [TS Migration Validator](./scripts/validate_ts_migration.py)
