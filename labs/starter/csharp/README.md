# C# Starter — Gallery Service

A tiny .NET console project that models the same **photo gallery** domain as the main app. You'll use it in the Fundamentals Labs (C# track).

## Requirements

- .NET SDK 8+

## Run it

```bash
cd labs/starter/csharp
dotnet run
```

## Layout

```text
labs/starter/csharp/
├── Gallery.csproj
├── Photo.cs             # record
├── SampleData.cs        # 9 sample photos
├── GalleryService.cs    # filtering, pagination, details, popularity
└── Program.cs           # prints current behavior
```

## Known gaps (that's the point!)

- `GalleryService.GetPhotoDetail` is a **stub** → you implement it in **Lab 2**.
- `GalleryService.MostViewed` has a **deliberate bug** (wrong sort order) → you fix it in **Lab 5**.

## Tests (Lab 3)

You'll create an xUnit test project during Lab 3, for example:

```bash
dotnet new xunit -o ../csharp.Tests
dotnet add ../csharp.Tests reference Gallery.csproj
dotnet test ../csharp.Tests
```
