"""Run the gallery starter to see the current behavior.

Usage:
    cd labs/starter/python
    python main.py
"""

from __future__ import annotations

from gallery.service import GalleryService


def main() -> None:
    service = GalleryService()

    results = service.filter_photos(tags=["nature"])
    page = service.get_page(results, page=1, per_page=6)

    print(f"Found {len(results)} photos tagged 'nature'. Page 1:")
    for photo in page:
        print(f"  - {photo.title} by {photo.photographer} ({photo.views} views)")


if __name__ == "__main__":
    main()

