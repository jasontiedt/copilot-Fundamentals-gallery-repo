namespace Gallery;

/// <summary>
/// Filtering, pagination, details, and popularity for the gallery.
/// </summary>
/// <remarks>
/// Two things are intentionally incomplete:
/// <list type="bullet">
///   <item><see cref="GetPhotoDetail"/> is a stub — you implement it in <b>Lab 2</b>.</item>
///   <item><see cref="MostViewed"/> has a deliberate bug — you fix it in <b>Lab 5</b>.</item>
/// </list>
/// </remarks>
public class GalleryService
{
    private readonly IReadOnlyList<Photo> _photos;

    public GalleryService(IReadOnlyList<Photo>? photos = null)
        => _photos = photos ?? SampleData.Photos;

    /// <summary>All photos known to the service.</summary>
    public IReadOnlyList<Photo> Photos => _photos;

    /// <summary>Returns photos matching any selected tag and the free-text query.</summary>
    public IReadOnlyList<Photo> FilterPhotos(IReadOnlyList<string>? tags = null, string query = "")
    {
        var selected = (tags ?? Array.Empty<string>())
            .Select(tag => tag.ToLowerInvariant())
            .ToList();
        var needle = (query ?? string.Empty).Trim().ToLowerInvariant();

        return _photos.Where(photo =>
        {
            var matchesTags = selected.Count == 0 || selected.Any(photo.Tags.Contains);
            var matchesQuery = needle.Length == 0
                || photo.Title.ToLowerInvariant().Contains(needle)
                || photo.Tags.Any(tag => tag.ToLowerInvariant().Contains(needle))
                || photo.Photographer.ToLowerInvariant().Contains(needle);
            return matchesTags && matchesQuery;
        }).ToList();
    }

    /// <summary>Returns a single 1-indexed page from <paramref name="source"/>.</summary>
    public IReadOnlyList<Photo> GetPage(IReadOnlyList<Photo> source, int page, int perPage = 6)
    {
        if (page < 1 || perPage < 1)
        {
            return Array.Empty<Photo>();
        }

        var start = (page - 1) * perPage;
        if (start >= source.Count)
        {
            return Array.Empty<Photo>();
        }

        return source.Skip(start).Take(perPage).ToList();
    }

    /// <summary>
    /// Returns a human-readable detail view for a single photo.
    /// </summary>
    /// <remarks>
    /// TODO (Lab 2): implement this. Look up the photo by id and return a
    /// multi-line string with the title, photographer, tags, and
    /// likes/downloads/views. Throw <see cref="KeyNotFoundException"/> if the id is unknown.
    /// </remarks>
    public string GetPhotoDetail(string photoId)
        => throw new NotImplementedException("Photo detail view is not implemented yet.");

    /// <summary>Returns the <paramref name="limit"/> most-viewed photos, highest first.</summary>
    public IReadOnlyList<Photo> MostViewed(int limit = 3)
        // NOTE (Lab 5): this returns the WRONG order — fix the sort direction.
        => _photos.OrderBy(photo => photo.Views).Take(limit).ToList();
}
