# Java Starter — Gallery Service

A tiny Maven module that models the same **photo gallery** domain as the main app. You'll use it in the Fundamentals Labs (Java track).

## Requirements

- JDK 17+
- Maven 3.9+

## Run it

```bash
cd labs/starter/java
mvn -q compile exec:java
```

## Layout

```text
labs/starter/java/
├── pom.xml
└── src/
    ├── main/java/com/example/gallery/
    │   ├── Photo.java           # record
    │   ├── SampleData.java      # 9 sample photos
    │   ├── GalleryService.java  # filtering, pagination, details, popularity
    │   └── App.java             # prints current behavior
    └── test/java/com/example/gallery/   # you add tests here in Lab 3
```

## Known gaps (that's the point!)

- `GalleryService.getPhotoDetail` is a **stub** → you implement it in **Lab 2**.
- `GalleryService.mostViewed` has a **deliberate bug** (wrong sort order) → you fix it in **Lab 5**.

## Tests (Lab 3)

JUnit 5 is already on the test classpath:

```bash
mvn test
```
