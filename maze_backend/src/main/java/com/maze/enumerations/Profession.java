package com.maze.enumerations;

import java.util.HashSet;
import java.util.Set;

public enum Profession {
    // Visual arts
    PHOTOGRAPHER("Photographer"),
    GRAPHIC_DESIGNER("Graphic Designer"),
    ILLUSTRATOR("Illustrator"),
    PAINTER("Painter"),
    SCULPTOR("Sculptor"),
    // Music
    SINGER("Singer"),
    COMPOSER("Composer"),
    DJ("DJ"),
    MUSICIAN("Musician"),
    BAND("Band"),
    MUSIC_PRODUCER("Music Producer"),
    SOUND_DESIGNER("Sound Designer"),
    // Writing
    AUTHOR("Author"),
    BLOGGER("Blogger"),
    COPYWRITER("Copywriter"),
    EDITOR("Editor"),
    JOURNALIST("Journalist"),
    POET("Poet"),
    // Cinema and theater
    ACTOR("Actor"),
    DANCER("Dancer"),
    COSTUME_DESIGNER("Costume Designer"),
    VIDEO_EDITOR("Video Editor"),
    DIRECTOR("Director"),
    SCREENWRITER("Screenwriter"),
    // Design
    ARCHITECT("Architect"),
    INTERIOR_DESIGNER("Interior Designer"),
    GAME_DESIGNER("Game Designer"),
    FASHION_DESIGNER("Fashion Designer"),
    PRODUCT_DESIGNER("Product Designer"),
    INTERACTIVE_SYSTEMS_DESIGNER("Interactive Systems Designer"),
    // Computer science
    DATA_ANALYST("Data Analyst"),
    PROGRAMMER("Programmer"),
    WEB_DEVELOPER("Web Developer"),
    SOFTWARE_TESTER("Software Tester"),
    WEB_DESIGNER("Web Designer"),
    // Marketing and communication
    MARKETING_CONSULTANT("Marketing Consultant"),
    DIGITAL_STRATEGIST("Digital Strategist"),
    SOCIAL_MEDIA_MANAGER("Social Media Manager"),
    PR_RELATIONS("PR Relations"),
    SEO_SPECIALIST("SEO Specialist"),
    UX_RESEARCHER("UX Researcher"),
    // Other creative professions
    ANIMATOR("Animator"),
    CRAFTSMAN("Craftsman"),
    CHEF("Chef"),
    COMIC_ARTIST("Comic Artist"),
    INVENTOR("Inventor"),
    EVENT_ORGANIZER("Event Organizer"),
    PODCASTER("Podcaster"),
    TATTOO_ARTIST("Tattoo Artist"),
    VOICE_ACTOR("Voice Actor"),
    INFLUENCER("Influencer"),
    OTHER("Other");

    private final String displayName;

    Profession(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Set<Profession> fromDisplayNames(Set<String> displayNames) {
        Set<Profession> professions = new HashSet<>();
        for (String displayName : displayNames) {
            for (Profession profession : Profession.values()) {
                if (profession.getDisplayName().equals(displayName)) {
                    professions.add(profession);
                    break; // Se hai trovato la corrispondenza, passa al prossimo displayName
                }
            }
        }
        System.out.println(professions);
        return professions;
    }
}
