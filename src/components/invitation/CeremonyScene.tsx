"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "@/components/ui/Reveal";

/**
 * One ceremony, one screen: the plate on one side, the details on the other.
 *
 * Each day has its own finished artwork, and every line of type on it is
 * painted in — so the details beside it are not a caption of the picture, they
 * are the picture's other half: the chapter number, the day spelled out, the
 * hour, the hall, and a line about what the day is for.
 *
 * The two halves drift AGAINST each other as the scene passes: the plate rises
 * a little, the text sinks a little, and the whole decorative layer breathes.
 * That opposition is what makes a flat page feel like it has depth — matching
 * both sides in the same direction just looks like the page is sliding.
 *
 * Sides alternate down the page (plate left, then right, then left) so three
 * scenes built from one component never read as three copies of a template.
 */

export type Ceremony = "haldi" | "reception" | "muhurtham";

/** The plates are ~504×1024 — bordered artwork, so `contain`: `cover` would
    shave the gold frame off an edge. */
const PLATE_W = 504;
const PLATE_H = 1024;

const TONES: Record<
  Ceremony,
  {
    ground: string;
    vignette: string;
    rays: string;
    label: string;
    art: string;
    heading: string;
    muted: string;
    numeral: string;
    particles: "gold" | "light";
    /** Which side the plate takes on a wide screen. */
    plateSide: "left" | "right";
  }
> = {
  haldi: {
    ground: "bg-[#1d1405]",
    vignette:
      "bg-[radial-gradient(ellipse_at_center,rgba(120,80,16,0.2)_0%,rgba(29,20,5,0.84)_56%,rgba(16,11,3,0.97)_100%)]",
    rays: "bg-[conic-gradient(from_198deg_at_50%_26%,rgba(255,205,86,0)_0deg,rgba(255,205,86,0.42)_13deg,rgba(255,205,86,0)_27deg,rgba(255,222,138,0)_66deg,rgba(255,222,138,0.34)_79deg,rgba(255,222,138,0)_93deg,rgba(255,212,104,0)_158deg,rgba(255,212,104,0.38)_172deg,rgba(255,212,104,0)_186deg)]",
    label: "text-[#e8b658]",
    art: "text-[#e8b658]",
    heading: "text-[#fdf1d8]",
    muted: "text-[#e8d3a6]/75",
    numeral: "text-[#e8b658]/45",
    particles: "gold",
    plateSide: "left",
  },
  reception: {
    ground: "bg-[#070d1c]",
    vignette:
      "bg-[radial-gradient(ellipse_at_center,rgba(30,52,110,0.24)_0%,rgba(7,13,28,0.86)_56%,rgba(4,7,16,0.97)_100%)]",
    rays: "bg-[conic-gradient(from_186deg_at_50%_22%,rgba(232,201,135,0)_0deg,rgba(232,201,135,0.3)_12deg,rgba(232,201,135,0)_25deg,rgba(215,189,123,0)_72deg,rgba(215,189,123,0.24)_84deg,rgba(215,189,123,0)_97deg,rgba(232,201,135,0)_170deg,rgba(232,201,135,0.28)_183deg,rgba(232,201,135,0)_196deg)]",
    label: "text-gold-light",
    art: "text-gold-light",
    heading: "text-ivory",
    muted: "text-ivory/70",
    numeral: "text-gold-light/35",
    particles: "light",
    plateSide: "right",
  },
  muhurtham: {
    ground: "bg-[#1b0f09]",
    vignette:
      "bg-[radial-gradient(ellipse_at_center,rgba(120,66,24,0.22)_0%,rgba(27,15,9,0.84)_56%,rgba(15,8,4,0.97)_100%)]",
    rays: "bg-[conic-gradient(from_192deg_at_50%_24%,rgba(224,186,104,0)_0deg,rgba(224,186,104,0.36)_11deg,rgba(224,186,104,0)_24deg,rgba(240,214,150,0)_58deg,rgba(240,214,150,0.3)_70deg,rgba(240,214,150,0)_83deg,rgba(224,186,104,0)_146deg,rgba(224,186,104,0.34)_159deg,rgba(224,186,104,0)_172deg)]",
    label: "text-[#e0b877]",
    art: "text-[#e0b877]",
    heading: "text-[#fdf1e0]",
    muted: "text-[#e8d3b4]/75",
    numeral: "text-[#e0b877]/40",
    particles: "gold",
    plateSide: "left",
  },
};

export function CeremonyScene({
  ceremony,
  children,
}: {
  ceremony: Ceremony;
  children?: ReactNode;
}) {
  const { t } = useInvitation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* The plate rises, the words sink, the scenery swells — three rates, so the
     scene has depth instead of sliding as one flat sheet. */
  const plateY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const plateScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const sceneryScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);
  /* When a day has two plates they start almost stacked and fan apart as the
     scene passes — transform-only, so it stays on the compositor. */
  const fanLeftX = useTransform(scrollYProgress, [0, 1], ["-1%", "-4%"]);
  const fanLeftR = useTransform(scrollYProgress, [0, 1], [-2, -6]);
  const fanRightX = useTransform(scrollYProgress, [0, 1], ["1%", "4%"]);
  const fanRightR = useTransform(scrollYProgress, [0, 1], [2, 6]);

  const event = weddingConfig.wedding.events.find((e) => e.key === ceremony);
  if (!event) return null;

  const events = weddingConfig.wedding.events;
  const index = events.findIndex((e) => e.key === ceremony) + 1;
  const tone = TONES[ceremony];
  const plateFirst = tone.plateSide === "left";

  return (
    <section
      ref={ref}
      className={`relative flex min-h-[100svh] items-center overflow-hidden px-4 py-20 ${tone.ground}`}
      aria-label={`${event.name} — ${event.dayName} ${event.dateLabel}`}
    >
      {/* the plate's own light, thrown out of focus to fill the room */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ scale: reduce ? 1 : sceneryScale }}
        aria-hidden="true"
      >
        <Image
          src={event.plates[0]}
          alt=""
          fill
          sizes="100vw"
          className="scale-125 object-cover opacity-55 blur-3xl"
        />
        <div className={`absolute inset-0 ${tone.vignette}`} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-40%] h-[180%] w-[180%] -translate-x-1/2">
          <div className={`rays h-full w-full opacity-60 blur-2xl ${tone.rays}`} />
        </div>
      </div>

      <Particles count={20} tone={tone.particles} />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── the plate ── */}
        <Reveal
          duration={1.3}
          className={plateFirst ? "lg:order-1" : "lg:order-2"}
        >
          <motion.div style={{ y: reduce ? 0 : plateY, scale: reduce ? 1 : plateScale }}>
            {event.plates.length > 1 ? (
              /* Two plates for one day, fanned like a pair of cards laid down
                 together. Each carries its own name and hour, so neither needs
                 a caption. */
              <div
                className="relative mx-auto w-full"
                style={{
                  aspectRatio: `${PLATE_W * 1.82} / ${PLATE_H}`,
                  maxHeight: "68svh",
                  width: `min(100%, calc(68svh * ${PLATE_W * 1.82} / ${PLATE_H}))`,
                }}
              >
                {event.plates.slice(0, 2).map((src, i) => (
                  <motion.div
                    key={src}
                    className="absolute top-0 h-full w-[55%] overflow-hidden rounded-lg shadow-[0_30px_80px_-30px_rgba(0,0,0,0.92)] ring-1 ring-[#d7bd7b]/25"
                    style={{
                      left: i === 0 ? "4%" : "41%",
                      zIndex: i === 0 ? 1 : 2,
                      x: reduce ? 0 : i === 0 ? fanLeftX : fanRightX,
                      rotate: reduce ? 0 : i === 0 ? fanLeftR : fanRightR,
                      transformOrigin: i === 0 ? "100% 100%" : "0% 100%",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${event.name}: ${event.dayName}, ${event.dateLabel}`}
                      fill
                      sizes="(max-width: 1024px) 66vw, 30vh"
                      className="object-contain"
                      priority={ceremony === "haldi" && i === 0}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className="relative mx-auto w-full overflow-hidden rounded-lg shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-[#d7bd7b]/25"
                style={{
                  aspectRatio: `${PLATE_W} / ${PLATE_H}`,
                  maxHeight: "72svh",
                  width: `min(100%, calc(72svh * ${PLATE_W} / ${PLATE_H}))`,
                }}
              >
                <Image
                  src={event.plates[0]}
                  alt={`${event.name}: ${event.dayName}, ${event.dateLabel}${event.time ? `, ${event.time}` : ""}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vh"
                  className="object-contain"
                />
              </div>
            )}
          </motion.div>
        </Reveal>

        {/* ── the details, drifting the other way ── */}
        <motion.div
          style={{ y: reduce ? 0 : textY }}
          className={`flex flex-col items-center text-center lg:items-start lg:text-left ${
            plateFirst ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-current/40" />
              <span className={`display-name text-2xl tabular-nums sm:text-3xl ${tone.numeral}`}>
                {String(index).padStart(2, "0")}
              </span>
              <span className="h-px w-10 bg-current/40" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className={`label-caps mt-7 text-[0.72rem] sm:text-[0.85rem] ${tone.label}`}>
              {event.name}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <OrnamentalDivider className="mt-5 lg:mx-0" tone="light" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className={`display-name mt-8 text-2xl italic sm:text-3xl ${tone.label}`}>
              {event.dayName}
            </p>
            <p
              className={`display-name mt-1 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl ${tone.heading}`}
            >
              {event.dateLabel}
            </p>
          </Reveal>

          {event.time ? (
            <Reveal delay={0.3}>
              <p className={`label-caps mt-6 text-[0.62rem] sm:text-[0.7rem] ${tone.muted}`}>
                {event.time}
              </p>
            </Reveal>
          ) : null}

          {event.venue ? (
            <Reveal delay={0.36}>
              <p className={`display-name mt-3 text-xl sm:text-2xl ${tone.heading}`}>
                {event.venue}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.42}>
            <p className={`mt-8 max-w-md text-[1.02rem] leading-[1.95] sm:text-lg ${tone.muted}`}>
              {t.ceremonies.notes[ceremony]}
            </p>
          </Reveal>

          {children ? <div className="mt-10 w-full">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}
