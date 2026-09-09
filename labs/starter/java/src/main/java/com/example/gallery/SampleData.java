package com.example.gallery;

import java.util.List;

/** Sample gallery data used by the starter service. */
public final class SampleData {

    private SampleData() {
    }

    /** Returns nine immutable sample photos. */
    public static List<Photo> photos() {
        return List.of(
                new Photo("1", "Sunset Landscape", List.of("landscape", "sunset", "nature"), 124, 45, 1205, "John Doe", "2024-01-15"),
                new Photo("2", "Portrait Study", List.of("portrait", "studio", "professional"), 89, 23, 892, "Jane Smith", "2024-01-10"),
                new Photo("3", "Architecture", List.of("architecture", "building", "city"), 156, 67, 1543, "Mike Johnson", "2024-01-08"),
                new Photo("4", "Nature Close-up", List.of("macro", "nature", "flowers"), 203, 89, 2134, "Sarah Wilson", "2024-01-05"),
                new Photo("5", "Street Photography", List.of("street", "candid", "urban"), 91, 34, 765, "Alex Brown", "2024-01-03"),
                new Photo("6", "Wedding Moment", List.of("wedding", "love", "ceremony"), 267, 112, 3421, "Emma Davis", "2024-01-01"),
                new Photo("7", "Mountain Trail", List.of("landscape", "mountains", "hiking"), 145, 52, 1670, "Chris Lee", "2023-12-28"),
                new Photo("8", "City Lights", List.of("city", "night", "urban"), 178, 73, 1988, "Nina Patel", "2023-12-22"),
                new Photo("9", "Forest Path", List.of("nature", "forest", "green"), 132, 41, 1120, "Tom Baker", "2023-12-18"));
    }
}
