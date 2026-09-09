package com.example.gallery;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

/**
 * Filtering, pagination, details, and popularity for the gallery.
 *
 * <p>Two things are intentionally incomplete:
 * <ul>
 *   <li>{@link #getPhotoDetail(String)} is a stub — you implement it in <b>Lab 2</b>.</li>
 *   <li>{@link #mostViewed(int)} has a deliberate bug — you fix it in <b>Lab 5</b>.</li>
 * </ul>
 */
public class GalleryService {

    private final List<Photo> photos;

    public GalleryService() {
        this(SampleData.photos());
    }

    public GalleryService(List<Photo> photos) {
        this.photos = List.copyOf(photos);
    }

    /** Returns all photos known to the service. */
    public List<Photo> photos() {
        return photos;
    }

    /** Returns photos matching any selected tag and the free-text query. */
    public List<Photo> filterPhotos(List<String> tags, String query) {
        List<String> selected = tags == null
                ? List.of()
                : tags.stream().map(tag -> tag.toLowerCase(Locale.ROOT)).toList();
        String needle = query == null ? "" : query.strip().toLowerCase(Locale.ROOT);

        return photos.stream().filter(photo -> {
            boolean matchesTags = selected.isEmpty()
                    || selected.stream().anyMatch(photo.tags()::contains);
            boolean matchesQuery = needle.isEmpty()
                    || photo.title().toLowerCase(Locale.ROOT).contains(needle)
                    || photo.tags().stream().anyMatch(tag -> tag.toLowerCase(Locale.ROOT).contains(needle))
                    || photo.photographer().toLowerCase(Locale.ROOT).contains(needle);
            return matchesTags && matchesQuery;
        }).toList();
    }

    /** Returns a single 1-indexed page from {@code source}. */
    public List<Photo> getPage(List<Photo> source, int page, int perPage) {
        if (page < 1 || perPage < 1) {
            return List.of();
        }
        int start = (page - 1) * perPage;
        if (start >= source.size()) {
            return List.of();
        }
        int end = Math.min(start + perPage, source.size());
        return source.subList(start, end);
    }

    /**
     * Returns a human-readable detail view for a single photo.
     *
     * <p>TODO (Lab 2): implement this. Look up the photo by id and return a
     * multi-line string with the title, photographer, tags, and
     * likes/downloads/views. Throw {@link java.util.NoSuchElementException}
     * if the id is unknown.
     */
    public String getPhotoDetail(String photoId) {
        throw new UnsupportedOperationException("Photo detail view is not implemented yet.");
    }

    /** Returns the {@code limit} most-viewed photos, highest first. */
    public List<Photo> mostViewed(int limit) {
        // NOTE (Lab 5): this returns the WRONG order — fix the comparator direction.
        return photos.stream()
                .sorted(Comparator.comparingInt(Photo::views))
                .limit(limit)
                .toList();
    }
}
