"""Domain models for the photo gallery starter."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Photo:
    """A single photo in the gallery."""

    id: str
    title: str
    tags: list[str]
    likes: int
    downloads: int
    views: int
    photographer: str
    date_taken: str
