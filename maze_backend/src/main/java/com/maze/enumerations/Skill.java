package com.maze.enumerations;

public enum Skill {
    // Visual arts
    ACRYLIC_PAINTING("Acrylic Painting"),
    DIGITAL_ART("Digital Art"),
    DRAWING("Drawing"),
    OIL_PAINTING("Oil Painting"),
    PHOTO_EDITING("Photo Editing"),
    PHOTOGRAPHY("Photography"),
    PHOTOSHOP("Photoshop"),
    SCULPTING("Sculpting"),
    SKETCHING("Sketching"),
    WATERCOLOR_PAINTING("Watercolor Painting"),
    // Music
    AUDIO_EDITING("Audio Editing"),
    AUDIO_ENGINEERING("Audio Engineering"),
    AUDIO_MIXING("Audio Mixing"),
    AUDIO_PRODUCTION("Audio Production"),
    COMPOSITION("Composition"),
    DJING("DJing"),
    GUITAR_PLAYING("Guitar Playing"),
    KEYBOARD_PLAYING("Keyboard Playing"),
    LYRIC_WRITING("Lyric Writing"),
    MUSIC_THEORY("Music Theory"),
    PIANO_PLAYING("Piano Playing"),
    SINGING("Singing"),
    SONGWRITING("Songwriting"),
    SOUND_DESIGN("Sound Design"),
    VOCAL_COACHING("Vocal Coaching"),
    // Writing
    ARTICLE_WRITING("Article Writing"),
    BLOGGING("Portfolioging"),
    BOOK_WRITING("Book Writing"),
    CONTENT_WRITING("Content Writing"),
    COPYWRITING("Copywriting"),
    CREATIVE_WRITING("Creative Writing"),
    EDITING("Editing"),
    GHOSTWRITING("Ghostwriting"),
    GRAMMAR("Grammar"),
    JOURNALISM("Journalism"),
    POETRY("Poetry"),
    PROOFREADING("Proofreading"),
    PUBLISHING("Publishing"),
    RESEARCH("Research"),
    STORYTELLING("Storytelling"),
    // Cinema and theater
    ACTING("Acting"),
    CHOREOGRAPHY("Choreography"),
    COSTUME_DESIGN("Costume Design"),
    DANCING("Dancing"),
    DIRECTING("Directing"),
    DRAMA("Drama"),
    FILMMAKING("Filmmaking"),
    IMPROVISATION("Improvisation"),
    SCREENWRITING("Screenwriting"),
    VIDEO_EDITING("Video Editing"),
    VIDEO_PRODUCTION("Video Production"),
    // Design
    ARCHITECTURE("Architecture"),
    AUTOCAD("AutoCAD"),
    COLOR_THEORY("Color Theory"),
    FASHION_DESIGN("Fashion Design"),
    GAME_DESIGN("Game Design"),
    GRAPHIC_DESIGN("Graphic Design"),
    ILLUSTRATION("Illustration"),
    INTERIOR_DESIGN("Interior Design"),
    LOGO_DESIGN("Logo Design"),
    PRODUCT_DESIGN("Product Design"),
    SKETCHUP("SketchUp"),
    TYPOGRAPHY("Typography"),
    // Computer science
    ALGORITHMS("Algorithms"),
    ANDROID_DEVELOPMENT("Android Development"),
    C_PLUS_PLUS_PROGRAMMING("C++ Programming"),
    C_SHARP_PROGRAMMING("C# Programming"),
    CSS3_PROGRAMMING("CSS3 Programming"),
    DATA_ANALYSIS("Data Analysis"),
    DATA_SCIENCE("Data Science"),
    HTML5_PROGRAMMING("HTML5 Programming"),
    JAVA_PROGRAMMING("Java Programming"),
    JAVASCRIPT_PROGRAMMING("JavaScript Programming"),
    MACHINE_LEARNING("Machine Learning"),
    PHP_PROGRAMMING("PHP Programming"),
    PYTHON_PROGRAMMING("Python Programming"),
    RUBY_ON_RAILS_PROGRAMMING("Ruby on Rails Programming"),
    SQL_PROGRAMMING("SQL Programming"),
    WEB_DEVELOPMENT("Web Development"),
    // Marketing and communication
    ADVERTISING("Advertising"),
    BRANDING("Branding"),
    COMMUNICATION_SKILLS("Communication Skills"),
    CONTENT_MARKETING("Content Marketing"),
    DIGITAL_MARKETING("Digital Marketing"),
    EMAIL_MARKETING("Email Marketing"),
    MARKET_RESEARCH("Market Research"),
    PUBLIC_RELATIONS("Public Relations"),
    PUBLIC_SPEAKING("Public Speaking"),
    SEO_OPTIMIZATION("SEO Optimization"),
    SOCIAL_MEDIA_MARKETING("Social Media Marketing"),
    UX_DESIGN("UX Design"),
    // Other creative professions
    ANIMATION("Animation"),
    CARTOONING("Cartooning"),
    COOKING("Cooking"),
    CRAFTING("Crafting"),
    INVENTION("Invention"),
    EVENT_PLANNING("Event Planning");

    private final String displayName;

    Skill(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
