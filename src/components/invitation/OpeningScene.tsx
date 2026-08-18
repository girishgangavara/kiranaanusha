"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { Particles } from "@/components/ui/Particles";

/**
 * SCENE 01 — the sealed invitation, opened by hand.
 *
 * Two finished plates carry this scene: `first` sealed under its wax Ganesha,
 * `second` open with the card standing out of the envelope. Both are complete
 * artwork — border, ornament and every line of type is painted into the image —
 * so this component letters nothing on top of them. It lights them, and it
 * takes one of them apart.
 *
 *   hold -> warmth gathers at the seal -> the seal pulses -> light blooms out
 *   of it and washes the frame -> the envelope is open underneath, empty
 *   -> the card is drawn slowly up out of it
 *
 * HOW THE CARD MOVES. `second` is a flat picture with the card already out, so
 * the card is cut from it and given back as three layers:
 *
 *   base      the whole plate
 *   fill      warm light painted over the plate's own card, hiding it
 *   card      the plate again, clipped to the card and free to slide
 *   envelope  the plate again, clipped to the V of the open flaps, ON TOP
 *
 * The card slides between the fill and the envelope, so it climbs out from
 * behind the flaps and lands exactly where it is painted — at rest the four
 * layers reassemble into `second`, pixel for pixel. The fill is the one
 * invention: it stands in for the inside of the envelope, which the artwork
 * never shows, and it reads as the light in there because it is brightest at
 * the mouth.
 *
 * The cut between the plates is made on the bloom rather than on a dissolve.
 * The two are composed differently — the envelope sits at a different size and
 * angle in each — so a dissolve slides one over the other in plain sight.
 *
 * Anything that must paint on the first frame uses plain CSS transitions rather
 * than a motion library: Framer Motion's initial/animate rendered transparent
 * in this overlay and was never diagnosed.
 */

/* The sealed plate: the couple at the temple, with the envelope waiting at the
   foot of it. It carries its own call to action ("tap to open the invitation"),
   which is why the whole frame is the tap target and no button is drawn.
   `first.jpeg` was the earlier, plainer version of this and is now unused. */
const SEALED = "/images/envelope/temple-sealed.png";
const OPENED = "/images/envelope/second.jpeg";

/* The stage is locked to `second`, because `second` is the plate that gets
   dissected and every offset below is a percentage of it. `first` rides inside
   the same box with a couple of percent to spare at the sides. Both are shown
   whole, never cropped — they are bordered artwork, and object-cover would
   shave the gold frame off the edges. */
const FRAME_W = 920;
const FRAME_H = 1240;

/** The jewelled clasp on the sealed plate's envelope, measured off it at full
    size (1024×1536). The glow gathers here and the bloom opens out of it. */
const SEAL = { left: "49.8%", top: "84%" };

/* Measured off a grid laid over the plate at full size.

   The card: top edge at 7.5%, sides at 18.5% and 81.5%. Clipped off at 64%,
   below which the flaps cover it anyway. */
const CARD_CLIP = "inset(7.5% 18.5% 36% 18.5% round 1.6%)";

/* The open flaps: corners at (11.5%, 39.5%) and (88.5%, 44%), meeting at the
   apex (50%, 63.5%). Everything below that V is in front of the card. Running
   the polygon out to the frame edges is free — those pixels are identical to
   the base layer underneath. */
const ENVELOPE_CLIP =
  "polygon(0% 39.5%, 11.5% 39.5%, 50% 63.5%, 88.5% 44%, 100% 44%, 100% 100%, 0% 100%)";

/* Far enough down that the card's top corners clear the flaps — the left one
   crosses the V at 43.9%, so 37% of travel buries the card completely. */
const CARD_TUCK = "translateY(37%)";

/** A hair of feather at the sides, so the fill's edge never out-crisps the
    card's own printed one sitting right on top of it. */
const FILL_FEATHER =
  "linear-gradient(90deg, transparent 0%, #000 1.5%, #000 98.5%, transparent 100%)";

/**
 * The clock, in milliseconds from the tap. Absolute marks rather than chained
 * durations, so retiming one beat cannot drift the rest.
 */
const SEQUENCE = [
  ["glow", 1000], //   warmth gathers at the seal
  ["seal", 1500], //   the seal swells and pulses
  ["wipe", 1900], //   light blooms outward
  ["swap", 2400], //   under the glare, the open envelope takes its place
  ["draw", 2800], //   the card is drawn slowly out
  ["settle", 3300], // the glare burns off
  ["done", 6400], //   hand over to the invitation
] as const;

type Cue = (typeof SEQUENCE)[number][0];

/** The pull. Long and decelerating — a hand easing the card free. */
const CARD_MS = 2100;
const FADE_MS = 1100;

/** How much of the clock a reduced-motion guest gets. Same beats, brisker. */
const CALM = 0.35;

export function OpeningScene() {
  const { open, t } = useInvitation();
  const [cue, setCue] = useState(-1);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gone, setGone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const handleOpen = useCallback(() => {
    if (started) return;

    // Start the music on this gesture — browsers require a user action.
    open();

    const calm =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = calm ? CALM : 1;

    /* Beat one is a held frame: the clock runs, but no cue lands until 1s. */
    setStarted(true);
    SEQUENCE.forEach(([name, ms], i) => {
      timers.current.push(
        window.setTimeout(
          () => (name === "done" ? setFinished(true) : setCue(i)),
          ms * scale,
        ),
      );
    });
  }, [started, open]);

  // Unmount only after the fade-out has run.
  useEffect(() => {
    if (!finished) return;
    const id = window.setTimeout(() => setGone(true), FADE_MS);
    return () => window.clearTimeout(id);
  }, [finished]);

  if (gone) return null;

  const at = (name: Cue) =>
    cue >= 0 && cue >= SEQUENCE.findIndex(([n]) => n === name);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-[#1a1008]"
      style={{
        opacity: finished ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      {/* The plate blown up and thrown out of focus, then sunk under a warm
          vignette, so the margins around the artwork read as candlelight in a
          dark room rather than as grey bars. */}
      <Image
        src={SEALED}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="scale-150 object-cover opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,42,14,0.15)_0%,rgba(26,15,6,0.82)_55%,rgba(14,8,3,0.96)_100%)]"
      />

      <div
        className="relative overflow-hidden [container-type:inline-size]"
        style={{
          width: `min(100%, calc(100dvh * ${FRAME_W} / ${FRAME_H}))`,
          aspectRatio: `${FRAME_W} / ${FRAME_H}`,
        }}
      >
        {/* 1 — the open plate, whole. */}
        <Image
          src={OPENED}
          alt={`${t.opening.invited} — ${t.opening.blessing}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 74vh"
          className="object-contain"
        />

        {/* 2 — what lies behind the card, which the artwork never shows. Cut to
            the card's own footprint exactly, so the only edge it can ever show
            is the edge the card already has: above the flaps the card stands
            against the silk, so this is toned to the silk, and the plate's own
            drop shadow survives around it and reads as a recess. */}
        <div
          aria-hidden="true"
          className="absolute z-10 rounded-[2cqw] bg-[linear-gradient(180deg,#f0e1bb_0%,#f5e9cd_46%,#faf1de_78%,#fdf6e8_100%)]"
          style={{
            left: "18.5%",
            width: "63%",
            top: "7.5%",
            height: "56.5%",
            maskImage: FILL_FEATHER,
            WebkitMaskImage: FILL_FEATHER,
          }}
        />

        {/* 3 — the card, cut from the plate and free to slide. */}
        <Image
          src={OPENED}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 74vh"
          aria-hidden="true"
          className="z-20 object-contain"
          style={{
            clipPath: CARD_CLIP,
            transform: at("draw") ? "translateY(0%)" : CARD_TUCK,
            transition: `transform ${CARD_MS}ms cubic-bezier(0.18, 0.72, 0.24, 1)`,
          }}
        />

        {/* 4 — the open flaps, back on top, so the card climbs out from behind
            them. Identical pixels to the base layer, so the seam is invisible. */}
        <Image
          src={OPENED}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 74vh"
          aria-hidden="true"
          className="z-30 object-contain"
          style={{ clipPath: ENVELOPE_CLIP }}
        />

        {/* 5 — sealed, over the top of all of it until the glare takes it. */}
        <Image
          src={SEALED}
          alt={t.opening.blessing}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 74vh"
          className="z-40 object-contain"
          style={{
            opacity: at("swap") ? 0 : 1,
            transform: `scale(${at("glow") ? 1.045 : 1})`,
            /* Out fast, so the two plates are never legible at once. */
            transition: "opacity 350ms ease, transform 2200ms ease-out",
          }}
        />

        {/* 6 — the warmth gathering in the wax, then its pulse. */}
        <div
          aria-hidden="true"
          className="absolute z-[45] rounded-full bg-[radial-gradient(circle,rgba(255,228,158,0.95)_0%,rgba(255,201,104,0.45)_34%,rgba(255,184,74,0)_70%)] mix-blend-screen"
          style={{
            left: SEAL.left,
            top: SEAL.top,
            width: "40cqw",
            height: "40cqw",
            marginLeft: "-20cqw",
            marginTop: "-20cqw",
            opacity: at("wipe") ? 0 : at("seal") ? 1 : at("glow") ? 0.55 : 0,
            transform: `scale(${at("seal") ? 1.2 : 0.8})`,
            transition: "opacity 450ms ease, transform 400ms ease-out",
          }}
        />

        {/* 7 — the bloom. Starts inside the seal and swallows the frame at the
            moment the plates change, then burns off across the card's climb. */}
        <div
          aria-hidden="true"
          className="absolute z-50 rounded-full bg-[radial-gradient(circle,rgba(255,252,242,1)_0%,rgba(255,246,220,0.96)_22%,rgba(255,224,152,0.8)_42%,rgba(255,202,110,0.34)_60%,rgba(255,184,74,0)_78%)] mix-blend-screen"
          style={{
            /* Big enough that the gradient reaches nothing well inside the
               frame — a tighter one drew a visible arc across the artwork. */
            width: "300cqw",
            height: "300cqw",
            left: SEAL.left,
            top: SEAL.top,
            marginLeft: "-150cqw",
            marginTop: "-150cqw",
            opacity: at("settle") ? 0 : at("wipe") ? 1 : 0,
            transform: `scale(${at("wipe") ? 1 : 0.16})`,
            transition:
              "opacity 1400ms ease, transform 1500ms cubic-bezier(0.3,0.6,0.35,1)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-40">
        <Particles count={18} />
      </div>

      {/* The plate already says "tap to open the invitation" and draws the hand,
          so the whole frame is the target rather than a button competing with
          the artwork. */}
      {!started && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label={t.opening.open}
          className="absolute inset-0 z-50 cursor-pointer bg-transparent"
        />
      )}
    </div>
  );
}
