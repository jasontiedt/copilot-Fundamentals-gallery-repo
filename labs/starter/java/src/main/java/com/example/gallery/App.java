package com.example.gallery;

import java.util.List;

/** Run the gallery starter to see the current behavior. */
public final class App {

    private App() {
    }

    public static void main(String[] args) {
        GalleryService service = new GalleryService();

        List<Photo> results = service.filterPhotos(List.of("nature"), "");
        List<Photo> page = service.getPage(results, 1, 6);

        System.out.printf("Found %d photos tagged 'nature'. Page 1:%n", results.size());
        for (Photo photo : page) {
            System.out.printf("  - %s by %s (%d views)%n",
                    photo.title(), photo.photographer(), photo.views());
        }
    }
}
