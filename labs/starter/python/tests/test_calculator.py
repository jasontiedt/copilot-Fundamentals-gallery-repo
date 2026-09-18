"""Tests for the command-line calculator's arithmetic."""

import pytest

from calculator import calculate


@pytest.mark.parametrize(
    ("left", "operator", "right", "expected"),
    [
        (7, "+", 3, 10),
        (7, "-", 3, 4),
        (7, "*", 3, 21),
        (7, "/", 2, 3.5),
        (2, "**", 3, 8),
        (2, "^", 3, 8),
    ],
)
def test_calculate_supported_operations(
    left: float, operator: str, right: float, expected: float
) -> None:
    assert calculate(left, operator, right) == expected


def test_calculate_rejects_division_by_zero() -> None:
    with pytest.raises(ZeroDivisionError, match="cannot divide by zero"):
        calculate(10, "/", 0)


def test_calculate_rejects_unknown_operator() -> None:
    with pytest.raises(ValueError, match="unsupported operator"):
        calculate(10, "%", 3)


@pytest.mark.parametrize("operand", [None, "10", True])
def test_calculate_rejects_unexpected_operands(operand: object) -> None:
    with pytest.raises(TypeError, match="operand must be a real number"):
        calculate(operand, "+", 2)  # type: ignore[arg-type]