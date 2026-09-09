package com.example.gallery;

import java.util.List;

/** A single photo in the gallery. */
public record Photo(
        String id,
        String title,
        List<String> tags,
        int likes,
        int downloads,
        int views,
        String photographer,
        String dateTaken) {
}
