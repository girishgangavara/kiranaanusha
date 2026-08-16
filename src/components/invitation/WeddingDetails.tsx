"use client";

import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { Kalasam } from "@/components/ui/Ornaments";
import { SectionHeading } from "@/components/ui/OrnamentalDivider";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "./Countdown";

/**
 * SCENE 08 — the celebrations timeline, following the reference video's
 * "The Celebrations / Timeline" panel: a gold rail, a medallion marker, then
 * date, ceremony, time and the muhurtham note.
 */
export function WeddingDetails() {
  const { t } = useInvitation();
  const { wedding } = weddingConfig;

  return (
    <section
      id="details"
      className="parchment-scene relative overflow-hidden px-5 py-20 sm:py-28"
      aria-label="Wedding details"
    >
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <SectionHeading eyebrow={t.details.eyebrow} title={t.details.title} />
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <div className="relative pl-12 sm:pl-16">
            {/* rail */}
            <span
              aria-hidden="true"
              className="absolute left-[1.15rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold via-gold/45 to-transparent sm:left-[1.65rem]"
            />
            {/* medallion */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-[radial-gradient(circle_at_35%_30%,#e8cf95,#b08a45_70%)] shadow-[0_6px_16px_-8px_rgba(58,38,18,0.6)] sm:h-12 sm:w-12"
            >
              <Kalasam className="h-5 w-4 text-[#5c451f] sm:h-6 sm:w-5" />
            </span>

            <p className="label-caps text-[0.55rem] text-gold-deep">
              {wedding.dayName}, {wedding.dateLabel}
              <span className="mx-2 text-gold">·</span>
              {wedding.malayalamDate}
            </p>

            <h3 className="display-name mt-3 text-3xl text-ink sm:text-4xl">
              {t.details.ceremony}
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-ink-soft sm:text-base">
              <li className="flex items-start gap-3">
                <Clock3 className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{wedding.time}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {wedding.venue}
                  <br />
                  <span className="text-ink-soft/80">{wedding.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed">{wedding.muhurthamNote}</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Countdown />
      </div>
    </section>
  );
}
