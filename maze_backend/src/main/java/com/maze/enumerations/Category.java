package com.maze.enumerations;

public enum Category {
    PAINTING("Painting"),
    PHOTOGRAPHY("Photography"),
    ILLUSTRATION("Illustration"),
    GRAPHIC_DESIGN("Graphic Design"),
    SCULPTURE("Sculpture"),
    FASHION("Fashion"),
    ARCHITECTURE("Architecture"),
    FILM("Film"),
    MUSIC("Music"),
    LITERATURE("Literature"),
    CRAFTS("Crafts"),
    OTHER("Other");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

