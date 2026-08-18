"use client";

import { Music2, VolumeX, Languages, Share2 } from "lucide-react";
import { useState } from "react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";

/**
 * The three persistent controls: music, language and share.
 * Kept to a single compact column so they never cover the invitation.
 */
export function FloatingControls() {
  const { opened, musicOn, toggleMusic, language, setLanguage, t, musicAvailable } =
    useInvitation();
  const [shareNote, setShareNote] = useState(false);

  if (!opened) return null;

  const share = async () => {
    const url = weddingConfig.site.url;
    const title = `${weddingConfig.groom.shortName} & ${weddingConfig.bride.shortName} — Wedding Invitation`;
    const text = t.final.together;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* dismissed - fall through to WhatsApp */
      }
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${url}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setShareNote(true);
    window.setTimeout(() => setShareNote(false), 2400);
  };

  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-paper/85 text-gold-deep shadow-[0_6px_18px_-8px_rgba(58,38,18,0.5)] backdrop-blur transition-colors hover:bg-paper hover:text-gold";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {weddingConfig.music.enabled ? (
        <button
          type="button"
          onClick={toggleMusic}
          className={btn}
          aria-pressed={musicOn}
          aria-label={musicOn ? t.ui.musicOn : t.ui.musicOff}
          title={musicOn ? t.ui.musicOn : t.ui.musicOff}
        >
          {musicOn ? (
            <Music2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4 opacity-70" aria-hidden="true" />
          )}
          {musicOn ? (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
          ) : null}
          {!musicAvailable ? <span className="sr-only">(audio file not added yet)</span> : null}
        </button>
      ) : null}

      {/* <button
        type="button"
        onClick={() => setLanguage(language === "en" ? "kn" : "en")}
        className={btn}
        aria-label={t.ui.language}
        title={t.ui.language}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
      </button> */}

      <button type="button" onClick={share} className={btn} aria-label={t.final.share} title={t.final.share}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
      </button>

      <span aria-live="polite" className="sr-only">
        {shareNote ? t.final.shared : ""}
      </span>
    </div>
  );
}

/** Compact language pill shown on the sealed envelope, before controls appear. */
export function SealedLanguageToggle() {
  const { language, setLanguage, t } = useInvitation();
  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "en" ? "kn" : "en")}
      className="label-caps absolute right-4 top-4 z-30 rounded-full border border-gold/40 px-3 py-1.5 text-[0.55rem] text-gold-deep/90 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:right-6 sm:top-6"
      aria-label={t.ui.language}
    >
      {language === "en" ? "ಕನ್ನಡ" : "English"}
    </button>
  );
}
