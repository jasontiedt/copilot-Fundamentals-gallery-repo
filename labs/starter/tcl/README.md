# Tcl Starter — Legacy `gallery_report`

A small, realistic **legacy Tcl** program that reports on the photo gallery. It's the "before" artifact for [Lab 9: Migrate Tcl → Python](../../09-tcl-to-python/README.md).

## Files

```text
labs/starter/tcl/
├── gallery_report.tcl   # ~120 lines: load, filter, search, top, report
├── photos.dat           # pipe-delimited sample data (9 photos)
└── README.md
```

## Run it (optional — needs tclsh)

```bash
cd labs/starter/tcl
tclsh gallery_report.tcl photos.dat report
tclsh gallery_report.tcl photos.dat top views 3
tclsh gallery_report.tcl photos.dat search nature
tclsh gallery_report.tcl photos.dat filter urban
```

> No `tclsh`? You can still do the lab — use the **golden-master output** below as your parity target.

## 🏆 Golden master — `report`

```text
Gallery Report - 9 photos
========================================
Wedding Moment            44 pts  (3421 views)
Nature Close-up           29 pts  (2134 views)
City Lights               26 pts  (1988 views)
Mountain Trail            22 pts  (1670 views)
Architecture              21 pts  (1543 views)
```

## ⚠️ Known "ask-before-you-port" spots

These behaviors are easy to get subtly wrong in Python — confirm intent before converting:

- **`score`** uses magic weights (`likes*3 + downloads*2 + views`) and **integer division by 100** (truncates). Python must use `//`, not `/`.
- **`top_by`** relies on Tcl's **stable** `lsort` for tie-breaking (input order is preserved).
- **`normalize`** collapses every run of non-alphanumerics to a single dash and trims leading/trailing dashes.
- **`filter` vs `search`**: `filter` matches a single tag exactly (case-insensitive); `search` matches a normalized substring across title + photographer + tags.

## Data format

`id|title|tags(comma-separated)|likes|downloads|views|photographer|date`. Lines that are blank or start with `#` are ignored.
