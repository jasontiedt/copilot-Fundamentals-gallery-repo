namespace Gallery;

/// <summary>A single photo in the gallery.</summary>
public record Photo(
    string Id,
    string Title,
    IReadOnlyList<string> Tags,
    int Likes,
    int Downloads,
    int Views,
    string Photographer,
    string DateTaken);
