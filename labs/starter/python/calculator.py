"""A small command-line calculator."""

from __future__ import annotations

import sys
from numbers import Real


def calculate(left: Real, operator: str, right: Real) -> Real:
    """Calculate a binary arithmetic expression."""
    if not isinstance(left, Real) or isinstance(left, bool):
        raise TypeError("left operand must be a real number")
    if not isinstance(right, Real) or isinstance(right, bool):
        raise TypeError("right operand must be a real number")

    if operator == "+":
        return left + right
    if operator == "-":
        return left - right
    if operator == "*":
        return left * right
    if operator == "/":
        if right == 0:
            raise ZeroDivisionError("cannot divide by zero")
        return left / right
    if operator in {"**", "^"}:
        return left**right

    raise ValueError(f"unsupported operator: {operator}")


def main() -> int:
    """Read one expression from the terminal and print its result."""
    try:
        left = float(input("First number: "))
        operator = input("Operator (+, -, *, /, **, ^): ").strip()
        right = float(input("Second number: "))
        print(f"Result: {calculate(left, operator, right)}")
    except (EOFError, TypeError, ValueError, ZeroDivisionError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())