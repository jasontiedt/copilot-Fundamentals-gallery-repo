# Ensures the `gallery` package is importable when you run `pytest` from this
# folder (pytest adds this directory to the import path because a conftest.py
# lives here). Without it, `from gallery.service import ...` in tests can fail.
