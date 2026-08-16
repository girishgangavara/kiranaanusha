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

/* Frames 1-4 carry the film's own title plate burnt in, so the sequence
   starts at the first clean frame. */
const FRAMES = [5, 6, 7, 8].map(
  (n) => `/images/envelope/seq-${String(n).padStart(2, "0")}.jpg`,
);

/** Per-frame hold. Eight frames ≈ 1.7s, close to the film's own pacing. */
const FRAME_MS = 210;

export function OpeningScene() {
  const { opened, open, t } = useInvitation();
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
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
  }, [open, playing]);

  if (opened && frame >= FRAMES.length - 1) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[#1b1008]"
      style={{
        opacity: opened && playing && frame >= FRAMES.length - 1 ? 0 : 1,
        transition: "opacity 900ms ease",
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
            transition: `opacity ${FRAME_MS}ms linear`,
            transform: playing ? "scale(1.04)" : "scale(1)",
            transitionProperty: "opacity, transform",
            transitionDuration: `${FRAME_MS}ms, 2400ms`,
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
          transition: "opacity 600ms ease",
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
