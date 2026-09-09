"""Gallery service: filtering, pagination, details, and popularity.

This is the starter code for the Copilot Fundamentals Labs (Python track).
Two things are intentionally incomplete:

* ``get_photo_detail`` is a stub — you implement it in **Lab 2**.
* ``most_viewed`` has a deliberate bug — you fix it in **Lab 5**.
"""
from __future__ import annotations

from .models import Photo
from .sample_data import SAMPLE_PHOTOS


class GalleryService:
    """Read-only operations over a collection of photos."""

    def __init__(self, photos: list[Photo] | None = None) -> None:
        self._photos: list[Photo] = list(photos) if photos is not None else list(SAMPLE_PHOTOS)

    @property
    def photos(self) -> list[Photo]:
        """All photos known to the service."""
        return list(self._photos)

    def filter_photos(self, tags: list[str] | None = None, query: str = "") -> list[Photo]:
        """Return photos matching every selected tag group and the free-text query."""
        selected = [tag.lower() for tag in (tags or [])]
        needle = (query or "").strip().lower()

        def matches(photo: Photo) -> bool:
            matches_tags = not selected or any(tag in photo.tags for tag in selected)
            matches_query = (
                not needle
                or needle in photo.title.lower()
                or any(needle in tag.lower() for tag in photo.tags)
                or needle in photo.photographer.lower()
            )
            return matches_tags and matches_query

        return [photo for photo in self._photos if matches(photo)]

    def get_page(self, photos: list[Photo], page: int, per_page: int = 6) -> list[Photo]:
        """Return a single 1-indexed page from ``photos``."""
        if page < 1 or per_page < 1:
            return []
        start = (page - 1) * per_page
        return photos[start : start + per_page]

    def get_photo_detail(self, photo_id: str) -> str:
        """Return a human-readable detail view for a single photo.

        TODO (Lab 2): implement this. It should look up the photo by id and
        return a multi-line string with the title, photographer, tags, and
        likes/downloads/views. Raise ``KeyError`` if the id is unknown.
        """
        raise NotImplementedError("Photo detail view is not implemented yet.")

    def most_viewed(self, limit: int = 3) -> list[Photo]:
        """Return the ``limit`` most-viewed photos, highest first."""
        # NOTE (Lab 5): this returns the WRONG order — fix the sort direction.
        return sorted(self._photos, key=lambda photo: photo.views)[:limit]
