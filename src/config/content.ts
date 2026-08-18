/**
 * All user-facing copy, in English and Kannada.
 *
 * Components never hardcode strings - they read `content[language]`, so adding
 * a third language means adding one more key with the same shape.
 *
 * The story paragraphs are the couple's own words from the reference
 * invitation; edit them freely.
 */

export type Language = "en" | "kn";

export const languageNames: Record<Language, string> = {
  en: "English",
  kn: "ಕನ್ನಡ",
};

const en = {
  opening: {
    blessing: "With the blessings of Almighty",
    invited: "You're Invited",
    and: "&",
    open: "Open Invitation",
    hint: "Tap to open the envelope",
  },
  hero: {
    blessing: "With the blessings of Almighty",
    scroll: "Scroll",
  },
  invitation: {
    eyebrow: "With joy in our hearts",
    line: "we invite you to celebrate the wedding of",
    and: "and",
  },
  couple: {
    eyebrow: "The Beloved",
  },
  /** Titles for the two portrait scenes. */
  people: {
    groom: "The Groom",
    bride: "The Bride",
  },
  story: {
    eyebrow: "Our Story",
    title: "It all began with our families bringing us together.",
    paragraphs: [
      "We met as two strangers, with a few questions, a little curiosity, and no idea where this journey would lead.",
      "As we spent time getting to know each other, conversations turned into comfort, comfort into friendship, and friendship slowly into love.",
      "What began as an arranged meeting became a choice we made for ourselves.",
      "Today, with the love and blessings of our families, we’re happy to begin this beautiful journey together.",
      "An arranged beginning, a love we found, and a forever we choose.",
    ],
  },
  family: {
    eyebrow: "With Our Families",
    title: "Together With Our Families",
    groomFamily: "Groom's Family",
    brideFamily: "Bride's Family",
    and: "&",
  },
  photos: {
    eyebrow: "Pre-wedding Canvas",
    title: "A Few Moments We Cherish",
    placeholder: "Photograph",
  },
  details: {
    eyebrow: "The Celebrations",
    title: "Timeline",
    ceremony: "Wedding Ceremony",
  },
  /** One line per ceremony, keyed by `event.key` in wedding.ts. Nothing here
      repeats a name, a date or a venue — those live in the config and are
      shown once, in their own scene. */
  ceremonies: {
    eyebrow: "The Celebrations",
    title: "Three Days, One Beginning",
    lead: "Each day carries its own colour and its own hour. Come to as many as you can.",
    notes: {
      haldi:
        "Turmeric on our hands, laughter in the courtyard, and the blessings of everyone we love.",
      reception:
        "An evening to greet you, to feed you, and to celebrate before the vows.",
      muhurtham: "The hour the knot is tied. Be with us as we begin.",
    },
  },
  countdown: {
    eyebrow: "Counting the days",
    title: "Until We Say Yes",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    passed: "We are married — thank you for celebrating with us.",
    today: "Today is the day.",
  },
  venue: {
    eyebrow: "The Venue",
    title: "Where To Find Us",
    directions: "Open in Maps",
  },
  rsvp: {
    eyebrow: "Kindly Respond",
    title: "Will You Join Us?",
    subtitle: "Your presence would mean the world to us.",
    yes: "Will Attend",
    no: "Unable to Attend",
    maybe: "Maybe",
    send: "Send RSVP on WhatsApp",
    namePlaceholder: "Your name",
    thanks: "Thank you — your response opens WhatsApp.",
    unconfigured:
      "RSVP by WhatsApp becomes active once a number is added in wedding.ts.",
    messages: {
      yes: "will joyfully attend",
      no: "is unable to attend",
      maybe: "will try to attend",
    },
  },
  final: {
    together: "Together with our families, we invite you to celebrate our special day.",
    /** The farewell. Deliberately says nothing the ceremony scenes have said. */
    awaiting: "Come and bless us. Your being there is what will make these days ours.",
    withLove: "With Love",
    share: "Share Invitation",
    shared: "Link copied",
  },
  ui: {
    musicOn: "Turn music off",
    musicOff: "Turn music on",
    language: "Switch language",
  },
};

const kn: typeof en = {
  opening: {
    blessing: "ದೇವರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
    invited: "ನಿಮಗೆ ಆಹ್ವಾನ",
    and: "&",
    open: "ಆಹ್ವಾನ ತೆರೆಯಿರಿ",
    hint: "ಲಕೋಟೆ ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ",
  },
  hero: {
    blessing: "ದೇವರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",
    scroll: "ಕೆಳಗೆ ಸರಿಸಿ",
  },
  invitation: {
    eyebrow: "ಹೃದಯ ತುಂಬಿದ ಸಂತಸದೊಂದಿಗೆ",
    line: "ನಮ್ಮ ವಿವಾಹ ಸಮಾರಂಭಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ",
    and: "ಮತ್ತು",
  },
  couple: {
    eyebrow: "ವಧು — ವರ",
  },
  people: {
    groom: "ವರ",
    bride: "ವಧು",
  },
  story: {
    eyebrow: "ನಮ್ಮ ಕಥೆ",
    title: "ನಾವು ಒಬ್ಬರನ್ನೊಬ್ಬರು ಕಂಡುಕೊಂಡ ಬಗೆ",
    paragraphs: [
      "ಪ್ರತಿ ಕಥೆಗೂ ತನ್ನದೇ ಆರಂಭವಿದೆ; ನಮ್ಮದು ಕುಟುಂಬಗಳ ಪರಿಚಯದಿಂದ ಆರಂಭವಾಯಿತು. ತೆರೆದ ಮನಸ್ಸು, ಹಲವು ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಕುತೂಹಲದೊಂದಿಗೆ ನಾವು ಭೇಟಿಯಾದೆವು. ಸರಳ ಮಾತುಕತೆಗಳಿಂದ ಆರಂಭವಾದದ್ದು ನಿಧಾನವಾಗಿ ನಂಬಿಕೆ, ನೆಮ್ಮದಿ ಮತ್ತು ಅರ್ಥೈಸುವಿಕೆಯಾಗಿ ಬೆಳೆಯಿತು.",
      "ಹಂಚಿಕೊಂಡ ನಗು, ಮೌನ ಕ್ಷಣಗಳು ಮತ್ತು ಪ್ರತಿದಿನ ಒಬ್ಬರನ್ನೊಬ್ಬರು ಆಯ್ಕೆ ಮಾಡಿಕೊಳ್ಳುವ ನಡುವೆ, ಇಬ್ಬರು ಅಪರಿಚಿತರು ಪರಸ್ಪರರ ಸುರಕ್ಷಿತ ನೆಲೆಯಾದರು. ಪ್ರೀತಿ ಯಾವಾಗಲೂ ಮೊದಲು ಬರುವುದಿಲ್ಲ; ಕೆಲವೊಮ್ಮೆ ನಂಬಿಕೆ ಮತ್ತು ಒಡನಾಟವೇ ದಾರಿ ತೋರುತ್ತವೆ ಎಂಬುದನ್ನು ನಾವು ಕಂಡುಕೊಂಡೆವು.",
      "ಹಿಂತಿರುಗಿ ನೋಡಿದಾಗ, ನಮ್ಮ ದಾರಿಗಳು ಸೇರಲೇಬೇಕಿತ್ತು ಎನಿಸುತ್ತದೆ. ವಿಧಿ ನಮ್ಮನ್ನು ಪರಿಚಯಿಸಿತು, ನಂಬಿಕೆ ನಮ್ಮನ್ನು ಆಯ್ಕೆ ಮಾಡಿಸಿತು, ಪ್ರೀತಿ ಮೌನವಾಗಿ ತನ್ನ ಸ್ಥಾನ ಕಂಡುಕೊಂಡಿತು. ಈಗ ಕೃತಜ್ಞ ಹೃದಯದಿಂದ ನಾವು ನಮ್ಮ ಶಾಶ್ವತ ಜೊತೆಗೆ ಹೆಜ್ಜೆ ಇಡುತ್ತಿದ್ದೇವೆ.",
    ],
  },
  family: {
    eyebrow: "ನಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ",
    title: "ಕುಟುಂಬಗಳ ಸಮ್ಮುಖದಲ್ಲಿ",
    groomFamily: "ವರನ ಕುಟುಂಬ",
    brideFamily: "ವಧುವಿನ ಕುಟುಂಬ",
    and: "ಮತ್ತು",
  },
  photos: {
    eyebrow: "ವಿವಾಹ ಪೂರ್ವ ಚಿತ್ರಗಳು",
    title: "ನಾವು ಪ್ರೀತಿಸುವ ಕೆಲವು ಕ್ಷಣಗಳು",
    placeholder: "ಛಾಯಾಚಿತ್ರ",
  },
  details: {
    eyebrow: "ಸಂಭ್ರಮ",
    title: "ಕಾರ್ಯಕ್ರಮ",
    ceremony: "ವಿವಾಹ ಸಮಾರಂಭ",
  },
  ceremonies: {
    eyebrow: "ಸಂಭ್ರಮ",
    title: "ಮೂರು ದಿನ, ಒಂದು ಆರಂಭ",
    lead: "ಪ್ರತಿ ದಿನಕ್ಕೂ ತನ್ನದೇ ಬಣ್ಣ, ತನ್ನದೇ ಘಳಿಗೆ. ಸಾಧ್ಯವಾದಷ್ಟು ಸಂಭ್ರಮಗಳಿಗೆ ಬನ್ನಿ.",
    notes: {
      haldi: "ಕೈಗಳಲ್ಲಿ ಅರಿಶಿನ, ಅಂಗಳದಲ್ಲಿ ನಗು, ಮತ್ತು ಪ್ರೀತಿಪಾತ್ರರೆಲ್ಲರ ಆಶೀರ್ವಾದ.",
      reception: "ನಿಮ್ಮನ್ನು ಬರಮಾಡಿಕೊಂಡು, ಜೊತೆಯಾಗಿ ಸಂಭ್ರಮಿಸುವ ಸಂಜೆ.",
      muhurtham: "ಗಂಟು ಬೀಳುವ ಶುಭ ಘಳಿಗೆ. ನಮ್ಮ ಆರಂಭಕ್ಕೆ ಸಾಕ್ಷಿಯಾಗಿ.",
    },
  },
  countdown: {
    eyebrow: "ದಿನಗಣನೆ",
    title: "ಶುಭ ಘಳಿಗೆಗೆ",
    days: "ದಿನಗಳು",
    hours: "ಗಂಟೆಗಳು",
    minutes: "ನಿಮಿಷಗಳು",
    seconds: "ಸೆಕೆಂಡುಗಳು",
    passed: "ನಾವು ವಿವಾಹಿತರಾಗಿದ್ದೇವೆ — ನಮ್ಮೊಂದಿಗೆ ಸಂಭ್ರಮಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    today: "ಇಂದೇ ಆ ಶುಭದಿನ.",
  },
  venue: {
    eyebrow: "ಸ್ಥಳ",
    title: "ನಮ್ಮನ್ನು ಇಲ್ಲಿ ಭೇಟಿಯಾಗಿ",
    directions: "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ",
  },
  rsvp: {
    eyebrow: "ದಯವಿಟ್ಟು ತಿಳಿಸಿ",
    title: "ನೀವು ಬರುತ್ತೀರಾ?",
    subtitle: "ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ನಮಗೆ ಅಮೂಲ್ಯ.",
    yes: "ಖಂಡಿತ ಬರುತ್ತೇನೆ",
    no: "ಬರಲಾಗುವುದಿಲ್ಲ",
    maybe: "ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ",
    send: "ವಾಟ್ಸ್ಆ್ಯಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ",
    namePlaceholder: "ನಿಮ್ಮ ಹೆಸರು",
    thanks: "ಧನ್ಯವಾದಗಳು — ವಾಟ್ಸ್ಆ್ಯಪ್ ತೆರೆಯುತ್ತದೆ.",
    unconfigured: "wedding.ts ನಲ್ಲಿ ಸಂಖ್ಯೆ ಸೇರಿಸಿದ ನಂತರ ಇದು ಸಕ್ರಿಯವಾಗುತ್ತದೆ.",
    messages: {
      yes: "ಸಂತೋಷದಿಂದ ಭಾಗವಹಿಸುತ್ತಾರೆ",
      no: "ಭಾಗವಹಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ",
      maybe: "ಭಾಗವಹಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಾರೆ",
    },
  },
  final: {
    together: "ನಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ, ಈ ವಿಶೇಷ ದಿನವನ್ನು ಸಂಭ್ರಮಿಸಲು ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ.",
    awaiting: "ಬಂದು ಆಶೀರ್ವದಿಸಿ. ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ಈ ದಿನಗಳಿಗೆ ಸಾರ್ಥಕತೆ.",
    withLove: "ಪ್ರೀತಿಯಿಂದ",
    share: "ಆಹ್ವಾನ ಹಂಚಿಕೊಳ್ಳಿ",
    shared: "ಲಿಂಕ್ ನಕಲಾಗಿದೆ",
  },
  ui: {
    musicOn: "ಸಂಗೀತ ಆಫ್ ಮಾಡಿ",
    musicOff: "ಸಂಗೀತ ಆನ್ ಮಾಡಿ",
    language: "ಭಾಷೆ ಬದಲಿಸಿ",
  },
};

export const weddingContent = { en, kn };
export type Content = typeof en;
