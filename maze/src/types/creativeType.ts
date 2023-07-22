import Role from "./roleType";

export enum CreativeActionType {
  GET_CREATIVE_REQUEST = "GET_CREATIVE_REQUEST",
  GET_CREATIVE_SUCCESS = "GET_CREATIVE_SUCCESS",
  GET_CREATIVE_FAILURE = "GET_CREATIVE_FAILURE",
  GET_ME_REQUEST = "GET_ME_REQUEST",
  GET_ME_SUCCESS = "GET_ME_SUCCESS",
  GET_ME_FAILURE = "GET_ME_FAILURE",
  UPDATE_ME_REQUEST = "UPDATE_ME_REQUEST",
  UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS",
  UPDATE_ME_FAILURE = "UPDATE_ME_FAILURE",
}

export interface Creative {
  id: number;
  username: string;
  email: string;
  password: string;
  registrationDate: string;
  roles: Role[];
  firstname: string;
  lastname: string;
  stageName: string;
  bio: string;
  city: string;
  state: string;
  image: string;
  skills: string[];
  professions: Profession[];
  portfolio: number;
}

export interface CreativeAction {
  type: CreativeActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface CreativeState {
  me: {
    c: Creative | undefined;
    loading: boolean;
    error?: string | null;
  };
  selected: {
    c: Creative | undefined;
    loading: boolean;
    error?: string | null;
  };
}

export enum Profession {
  PHOTOGRAPHER = "Photographer",
  GRAPHIC_DESIGNER = "Graphic Designer",
  ILLUSTRATOR = "Illustrator",
  PAINTER = "Painter",
  SCULPTOR = "Sculptor",
  SINGER = "Singer",
  COMPOSER = "Composer",
  DJ = "DJ",
  MUSICIAN = "Musician",
  BAND = "Band",
  MUSIC_PRODUCER = "Music Producer",
  SOUND_DESIGNER = "Sound Designer",
  AUTHOR = "Author",
  BLOGGER = "Blogger",
  COPYWRITER = "Copywriter",
  EDITOR = "Editor",
  JOURNALIST = "Journalist",
  POET = "Poet",
  ACTOR = "Actor",
  DANCER = "Dancer",
  COSTUME_DESIGNER = "Costume Designer",
  VIDEO_EDITOR = "Video Editor",
  DIRECTOR = "Director",
  SCREENWRITER = "Screenwriter",
  ARCHITECT = "Architect",
  INTERIOR_DESIGNER = "Interior Designer",
  GAME_DESIGNER = "Game Designer",
  FASHION_DESIGNER = "Fashion Designer",
  PRODUCT_DESIGNER = "Product Designer",
  INTERACTIVE_SYSTEMS_DESIGNER = "Interactive Systems Designer",
  DATA_ANALYST = "Data Analyst",
  PROGRAMMER = "Programmer",
  WEB_DEVELOPER = "Web Developer",
  SOFTWARE_TESTER = "Software Tester",
  WEB_DESIGNER = "Web Designer",
  MARKETING_CONSULTANT = "Marketing Consultant",
  DIGITAL_STRATEGIST = "Digital Strategist",
  SOCIAL_MEDIA_MANAGER = "Social Media Manager",
  PR_RELATIONS = "PR Relations",
  SEO_SPECIALIST = "SEO Specialist",
  UX_RESEARCHER = "UX Researcher",
  ANIMATOR = "Animator",
  CRAFTSMAN = "Craftsman",
  CHEF = "Chef",
  COMIC_ARTIST = "Comic Artist",
  INVENTOR = "Inventor",
  EVENT_ORGANIZER = "Event Organizer",
  PODCASTER = "Podcaster",
  TATTOO_ARTIST = "Tattoo Artist",
  VOICE_ACTOR = "Voice Actor",
  INFLUENCER = "Influencer",
  OTHER = "Other",
}

export enum Skill {
  ACRYLIC_PAINTING = "Acrylic Painting",
  DIGITAL_ART = "Digital Art",
  DRAWING = "Drawing",
  OIL_PAINTING = "Oil Painting",
  PHOTO_EDITING = "Photo Editing",
  PHOTOGRAPHY = "Photography",
  PHOTOSHOP = "Photoshop",
  SCULPTING = "Sculpting",
  SKETCHING = "Sketching",
  WATERCOLOR_PAINTING = "Watercolor Painting",
  AUDIO_EDITING = "Audio Editing",
  AUDIO_ENGINEERING = "Audio Engineering",
  AUDIO_MIXING = "Audio Mixing",
  AUDIO_PRODUCTION = "Audio Production",
  COMPOSITION = "Composition",
  DJING = "DJing",
  GUITAR_PLAYING = "Guitar Playing",
  KEYBOARD_PLAYING = "Keyboard Playing",
  LYRIC_WRITING = "Lyric Writing",
  MUSIC_THEORY = "Music Theory",
  PIANO_PLAYING = "Piano Playing",
  SINGING = "Singing",
  SONGWRITING = "Songwriting",
  SOUND_DESIGN = "Sound Design",
  VOCAL_COACHING = "Vocal Coaching",
  ARTICLE_WRITING = "Article Writing",
  BLOGGING = "Blogging",
  BOOK_WRITING = "Book Writing",
  CONTENT_WRITING = "Content Writing",
  COPYWRITING = "Copywriting",
  CREATIVE_WRITING = "Creative Writing",
  EDITING = "Editing",
  GHOSTWRITING = "Ghostwriting",
  GRAMMAR = "Grammar",
  JOURNALISM = "Journalism",
  POETRY = "Poetry",
  PROOFREADING = "Proofreading",
  PUBLISHING = "Publishing",
  RESEARCH = "Research",
  STORYTELLING = "Storytelling",
  ACTING = "Acting",
  CHOREOGRAPHY = "Choreography",
  COSTUME_DESIGN = "Costume Design",
  DANCING = "Dancing",
  DIRECTING = "Directing",
  DRAMA = "Drama",
  FILMMAKING = "Filmmaking",
  IMPROVISATION = "Improvisation",
  SCREENWRITING = "Screenwriting",
  VIDEO_EDITING = "Video Editing",
  VIDEO_PRODUCTION = "Video Production",
  ARCHITECTURE = "Architecture",
  AUTOCAD = "AutoCAD",
  COLOR_THEORY = "Color Theory",
  FASHION_DESIGN = "Fashion Design",
  GAME_DESIGN = "Game Design",
  GRAPHIC_DESIGN = "Graphic Design",
  ILLUSTRATION = "Illustration",
  INTERIOR_DESIGN = "Interior Design",
  LOGO_DESIGN = "Logo Design",
  PRODUCT_DESIGN = "Product Design",
  SKETCHUP = "SketchUp",
  TYPOGRAPHY = "Typography",
  ALGORITHMS = "Algorithms",
  ANDROID_DEVELOPMENT = "Android Development",
  C_PLUS_PLUS_PROGRAMMING = "C++ Programming",
  C_SHARP_PROGRAMMING = "C# Programming",
  CSS3_PROGRAMMING = "CSS3 Programming",
  DATA_ANALYSIS = "Data Analysis",
  DATA_SCIENCE = "Data Science",
  HTML5_PROGRAMMING = "HTML5 Programming",
  JAVA_PROGRAMMING = "Java Programming",
  JAVASCRIPT_PROGRAMMING = "JavaScript Programming",
  MACHINE_LEARNING = "Machine Learning",
  PHP_PROGRAMMING = "PHP Programming",
  PYTHON_PROGRAMMING = "Python Programming",
  RUBY_ON_RAILS_PROGRAMMING = "Ruby on Rails Programming",
  SQL_PROGRAMMING = "SQL Programming",
  WEB_DEVELOPMENT = "Web Development",
  ADVERTISING = "Advertising",
  BRANDING = "Branding",
  COMMUNICATION_SKILLS = "Communication Skills",
  CONTENT_MARKETING = "Content Marketing",
  DIGITAL_MARKETING = "Digital Marketing",
  EMAIL_MARKETING = "Email Marketing",
  MARKET_RESEARCH = "Market Research",
  PUBLIC_RELATIONS = "Public Relations",
  PUBLIC_SPEAKING = "Public Speaking",
  SEO_OPTIMIZATION = "SEO Optimization",
  SOCIAL_MEDIA_MARKETING = "Social Media Marketing",
  UX_DESIGN = "UX Design",
  ANIMATION = "Animation",
  CARTOONING = "Cartooning",
  COOKING = "Cooking",
  CRAFTING = "Crafting",
  INVENTION = "Invention",
  EVENT_PLANNING = "Event Planning",
}
