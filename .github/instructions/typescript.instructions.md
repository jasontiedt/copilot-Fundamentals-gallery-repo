---
applyTo: "**/*.ts,**/*.tsx"
---
# TypeScript & React conventions

- Use function components with a typed `Props` interface (no `React.FC`).
- Prefer `type`/`interface` over inline object types for props.
- Co-locate a component's types in the same file and export both.
- Use `clsx`/template literals for conditional Tailwind classes; always include dark-mode variants.
- Handle loading and empty states explicitly in data-driven components.
- Name event handlers `handleX`; name booleans `isX`/`hasX`.