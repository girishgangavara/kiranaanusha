"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { Particles } from "@/components/ui/Particles";
import { SealedLanguageToggle } from "@/components/ui/FloatingControls";

/**
 * SCENE 01 — the envelope, opened for real.
 *
 * Rather than approximating the reference set in CSS, this plays the set itself:
 * eight stills lifted from the invitation film, from sealed envelope through
 * lifting flap to the card sliding free. Tapping "Open Invitation" runs the
 * sequence, starts the music, then hands over to the invitation beneath.
 *
 * All frames are mounted from the start and cross-faded by opacity alone, so
 * every image is decoded before it is needed and the run stays on the
 * compositor. Opacity is plain CSS here, not a motion library — this overlay
 * has to be on screen the instant the page paints.
 */

/* Only two frames of the film are usable: 1-4 carry its burnt-in title plate,
   and 7-8 show the printed card face, which bears the other couple's names.
   The sequence therefore runs sealed envelope -> open envelope and stops
   before the card is legible. */
const FRAMES = [5, 6].map(
  (n) => `/images/envelope/seq-${String(n).padStart(2, "0")}.jpg`,
);

/** Per-frame hold — the film takes about four seconds to open the envelope,
    so each frame dissolves slowly rather than cutting. */
const FRAME_MS = 1500;

/** Beat spent on the fully open card before the invitation takes over. */
const HOLD_MS = 1500;

export function OpeningScene() {
  const { open, t } = useInvitation();
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const handleOpen = useCallback(() => {
    if (playing) return;
    setPlaying(true);

    // Start the music on this gesture — browsers require a user action.
    open();

    for (let i = 1; i < FRAMES.length; i++) {
      timers.current.push(window.setTimeout(() => setFrame(i), i * FRAME_MS));
    }

    // Hold on the open card, then dissolve to the invitation.
    timers.current.push(
      window.setTimeout(
        () => setFinished(true),
        (FRAMES.length - 1) * FRAME_MS + HOLD_MS,
      ),
    );
  }, [open, playing]);

  // Unmount only after the fade-out has run.
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!finished) return;
    const id = window.setTimeout(() => setGone(true), 1100);
    return () => window.clearTimeout(id);
  }, [finished]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[#1b1008]"
      style={{
        opacity: finished ? 0 : 1,
        transition: "opacity 1100ms ease",
      }}
    >
      {/* the set, cross-fading frame to frame */}
      {FRAMES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i < 2}
          sizes="100vw"
          className="object-cover"
          style={{
            opacity: i === frame ? 1 : 0,
            transition: `opacity ${FRAME_MS}ms ease-in-out`,
            transform: playing ? "scale(1.06)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: `${FRAME_MS}ms, 5200ms`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* scrim for legibility over the lamplight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,4,0.55)_0%,rgba(18,10,4,0.15)_30%,rgba(18,10,4,0.45)_70%,rgba(18,10,4,0.85)_100%)]"
      />

      <Particles count={18} />
      {!playing && <SealedLanguageToggle />}

      {/* title plate — fades away as the envelope opens */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 900ms ease",
          pointerEvents: playing ? "none" : "auto",
        }}
      >
        <p className="label-caps text-[0.55rem] text-[#f5e3b8] [text-shadow:0_2px_12px_rgba(0,0,0,0.9)] sm:text-[0.62rem]">
          {t.opening.blessing}
        </p>

        <h1 className="display-name mt-8 text-5xl leading-tight text-[#fdf6e7] [text-shadow:0_4px_20px_rgba(0,0,0,0.9)] sm:text-6xl">
          {weddingConfig.groom.shortName}
          <span className="my-1 block text-2xl font-light italic text-[#e8c987]">
            {t.opening.and}
          </span>
          {weddingConfig.bride.shortName}
        </h1>

        <p className="label-caps mt-6 text-[0.55rem] text-[#f5e3b8]/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
          {weddingConfig.wedding.dateLabel}
        </p>

        <button
          type="button"
          onClick={handleOpen}
          className="label-caps mt-12 rounded-full border border-[#e8c987]/60 bg-[linear-gradient(100deg,rgba(232,207,149,0.92),rgba(176,138,69,0.92)_55%,rgba(138,106,47,0.92))] px-10 py-4 text-[0.6rem] text-[#2c1f12] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-transform duration-500 hover:scale-[1.04]"
        >
          {t.opening.open}
        </button>

        <span className="label-caps mt-4 text-[0.48rem] text-[#f5e3b8]/70">
          {t.opening.hint}
        </span>
      </div>
    </div>
  );
}
