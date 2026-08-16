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
  story: {
    eyebrow: "Our Story",
    title: "How We Found Each Other",
    paragraphs: [
      "Every story has its own beginning, and ours began with an introduction through our families. We met with open hearts, many questions, a sense of curiosity and no certainty about where the journey would take us. What started with simple conversations slowly grew into trust, comfort, and understanding.",
      "Somewhere between shared laughter, quiet moments, and choosing each other every day, two strangers became each other's safest place. We discovered that love doesn't always arrive first; sometimes trust and companionship gently lead the way.",
      "Looking back, it feels as though our paths were always meant to meet. Destiny introduced us, trust made us choose each other, and love quietly found its place. And now, with grateful hearts, we step into our forever together.",
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
