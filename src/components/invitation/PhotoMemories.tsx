"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/OrnamentalDivider";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SCENE 07 — the memory wall.
 *
 * The video slides printed photographs in from alternating sides, each with a
 * white mount and a slight rotation. Here they enter from the direction they
 * sit on, settle at a small angle, and overlap only from `md` upwards — on a
 * phone they stack in a single readable column, as the brief requires.
 */

/** Per-photo choreography: entry side, resting tilt, desktop offset. */
const layout = [
  { from: -70, rotate: -3.2, offsetY: 0, offsetX: -12 },
  { from: 70, rotate: 2.6, offsetY: 36, offsetX: 10 },
  { from: -70, rotate: 2.2, offsetY: -14, offsetX: 8 },
  { from: 70, rotate: -2.4, offsetY: 28, offsetX: -8 },
  { from: -70, rotate: 1.8, offsetY: 6, offsetX: 4 },
];

export function PhotoMemories() {
  const { t } = useInvitation();
  const reduce = useReducedMotion();
  const photos = weddingConfig.gallery;

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f4ead8,#f8f3e8)] px-5 py-20 sm:py-28"
      aria-label={t.photos.title}
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow={t.photos.eyebrow} title={t.photos.title} />
        </Reveal>

        <ul className="mt-14 flex flex-col items-center gap-10 md:mt-20 md:grid md:grid-cols-3 md:items-start md:gap-x-6 md:gap-y-14">
          {photos.map((photo, i) => {
            const l = layout[i % layout.length];
            return (
              <motion.li
                key={photo.src}
                className="w-full max-w-[17rem] md:max-w-none"
                style={{ marginTop: undefined }}
                initial={{
                  opacity: 0,
                  x: reduce ? 0 : l.from,
                  rotate: reduce ? 0 : l.from / 14,
                }}
                whileInView={{ opacity: 1, x: 0, rotate: reduce ? 0 : l.rotate }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduce ? 0.001 : 1.15,
                  delay: reduce ? 0 : (i % 3) * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* printed mount: white border, paper shadow */}
                <div
                  className="print-offset rounded-[4px] bg-white p-2.5 pb-9 shadow-[0_14px_30px_-14px_rgba(40,26,14,0.45)] md:p-3 md:pb-11"
                  style={
                    reduce
                      ? undefined
                      : ({ "--dx": `${l.offsetX}px`, "--dy": `${l.offsetY}px` } as React.CSSProperties)
                  }
                >
                  <PhotoFrame
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[3/4] w-full"
                    sizes="(max-width: 768px) 70vw, 300px"
                  />
                  <p className="label-caps mt-3 text-center text-[0.48rem] text-ink-soft/70">
                    {weddingConfig.groom.shortName} &amp; {weddingConfig.bride.shortName}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
