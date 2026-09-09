using Gallery;

var service = new GalleryService();

var results = service.FilterPhotos(new[] { "nature" });
var page = service.GetPage(results, page: 1, perPage: 6);

Console.WriteLine($"Found {results.Count} photos tagged 'nature'. Page 1:");
foreach (var photo in page)
{
    Console.WriteLine($"  - {photo.Title} by {photo.Photographer} ({photo.Views} views)");
}
