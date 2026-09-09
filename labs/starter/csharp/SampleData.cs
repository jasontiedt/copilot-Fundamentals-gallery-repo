namespace Gallery;

/// <summary>Sample gallery data used by the starter service.</summary>
public static class SampleData
{
    /// <summary>Nine immutable sample photos.</summary>
    public static IReadOnlyList<Photo> Photos { get; } = new List<Photo>
    {
        new("1", "Sunset Landscape", new[] { "landscape", "sunset", "nature" }, 124, 45, 1205, "John Doe", "2024-01-15"),
        new("2", "Portrait Study", new[] { "portrait", "studio", "professional" }, 89, 23, 892, "Jane Smith", "2024-01-10"),
        new("3", "Architecture", new[] { "architecture", "building", "city" }, 156, 67, 1543, "Mike Johnson", "2024-01-08"),
        new("4", "Nature Close-up", new[] { "macro", "nature", "flowers" }, 203, 89, 2134, "Sarah Wilson", "2024-01-05"),
        new("5", "Street Photography", new[] { "street", "candid", "urban" }, 91, 34, 765, "Alex Brown", "2024-01-03"),
        new("6", "Wedding Moment", new[] { "wedding", "love", "ceremony" }, 267, 112, 3421, "Emma Davis", "2024-01-01"),
        new("7", "Mountain Trail", new[] { "landscape", "mountains", "hiking" }, 145, 52, 1670, "Chris Lee", "2023-12-28"),
        new("8", "City Lights", new[] { "city", "night", "urban" }, 178, 73, 1988, "Nina Patel", "2023-12-22"),
        new("9", "Forest Path", new[] { "nature", "forest", "green" }, 132, 41, 1120, "Tom Baker", "2023-12-18"),
    };
}
