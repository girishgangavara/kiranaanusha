"use client";

import { MapPin } from "lucide-react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { CornerFlourish, Lotus } from "@/components/ui/Ornaments";
import { SectionHeading } from "@/components/ui/OrnamentalDivider";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Particles } from "@/components/ui/Particles";

/**
 * SCENE 09 — the venue card and the gold "Open in Maps" pill from the video.
 * An elegant card rather than a heavy embedded map, so nothing extra loads.
 */
export function VenueSection() {
  const { t } = useInvitation();
  const reduce = useReducedMotion();
  const { wedding } = weddingConfig;

  return (
    <section
      className="night-scene relative overflow-hidden px-5 py-20 sm:py-28"
      aria-label="Venue"
    >
      <Particles count={16} tone="light" />

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <Reveal>
          <SectionHeading eyebrow={t.venue.eyebrow} title={t.venue.title} tone="light" />
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="relative rounded-md border border-gold/35 bg-[rgba(255,246,228,0.05)] px-6 py-10 text-center backdrop-blur-sm sm:px-10">
            <CornerFlourish className="pointer-events-none absolute left-3 top-3 h-7 w-7 text-gold/45" />
            <CornerFlourish className="pointer-events-none absolute right-3 top-3 h-7 w-7 -scale-x-100 text-gold/45" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 -scale-y-100 text-gold/45" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 -scale-100 text-gold/45" />

            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lotus className="mx-auto h-8 w-14 text-gold" />
            </motion.div>

            <h3 className="display-name mt-6 text-3xl text-ivory sm:text-4xl">{wedding.venue}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70 sm:text-base">
              {wedding.address}
            </p>

            {/* No day, date or hour here — each ceremony has already announced
                its own. This scene exists to answer "where", once. */}
            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps mt-9 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#d7bd7b,#b08a45_55%,#8a6a2f)] px-7 py-3 text-[0.55rem] text-[#2c1f12] shadow-[0_12px_28px_-16px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-[1.03]"
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, -2.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
              {t.venue.directions}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
