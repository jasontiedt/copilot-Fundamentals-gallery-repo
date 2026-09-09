# Python Starter — Gallery Service

A tiny, dependency-free Python module that models the same **photo gallery** domain as the main app. You'll use it in the Fundamentals Labs (Python track).

## Run it

```bash
cd labs/starter/python
python main.py
```

## Layout

```text
labs/starter/python/
├── gallery/
│   ├── __init__.py
│   ├── models.py        # Photo dataclass
│   ├── sample_data.py   # 9 sample photos
│   └── service.py       # filtering, pagination, details, popularity
└── main.py              # prints current behavior
```

## Known gaps (that's the point!)

- `GalleryService.get_photo_detail` is a **stub** → you implement it in **Lab 2**.
- `GalleryService.most_viewed` has a **deliberate bug** (wrong sort order) → you fix it in **Lab 5**.

## Tests (Lab 3)

Tests use `pytest`:

```bash
pip install pytest
pytest
```

You'll create tests under `labs/starter/python/tests/` during Lab 3.
