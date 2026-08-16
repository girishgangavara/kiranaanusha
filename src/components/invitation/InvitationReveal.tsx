"use client";

import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { GaneshaCrest, KeralaSkyline, FloralStrand, CornerFlourish } from "@/components/ui/Ornaments";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SCENE 03 — the printed invitation card.
 * The gold-bordered cream card from the video, with the crest at the head,
 * floral strands in the upper corners and the heritage roofline at the foot.
 */
export function InvitationReveal() {
  const { t } = useInvitation();
  const { wedding, groom, bride } = weddingConfig;

  const date = new Date(wedding.dateISO);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", ...options }).format(date);
  const day = part({ day: "numeric" });
  const month = part({ month: "long" });
  const year = part({ year: "numeric" });

  return (
    <section className="parchment-scene relative overflow-hidden px-5 py-20 sm:py-28" aria-label="Invitation">
      <div className="mx-auto w-full max-w-lg">
        <Reveal>
          <article className="paper foil-frame relative overflow-hidden rounded-md border border-gold/35 px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
            <FloralStrand className="pointer-events-none absolute -top-1 left-4 h-24 w-6 text-gold/45" aria-hidden="true" />
            <FloralStrand className="pointer-events-none absolute -top-1 right-4 h-24 w-6 text-gold/45" aria-hidden="true" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 -scale-y-100 text-gold/40" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 -scale-100 text-gold/40" />

            <div className="relative z-10 text-center">
              <GaneshaCrest className="mx-auto h-11 w-14 text-gold" />

              <p className="label-caps mt-6 text-[0.55rem] text-gold-deep/90">
                {t.invitation.eyebrow}
              </p>
              <p className="mt-3 text-sm text-ink-soft sm:text-base">{t.invitation.line}</p>

              <h2 className="display-name mt-7 text-4xl text-ink sm:text-5xl">{groom.shortName}</h2>
              <p className="my-2 text-lg font-light italic text-gold">{t.invitation.and}</p>
              <h2 className="display-name text-4xl text-ink sm:text-5xl">{bride.shortName}</h2>

              <OrnamentalDivider className="mt-8" />

              {/* date block, laid out like the printed card.
                  Parts are derived from wedding.dateISO with an explicit
                  timezone and locale, so they follow the config and render
                  identically on server and client. */}
              <div className="mt-7 flex items-center justify-center gap-5">
                <div className="text-right">
                  <p className="label-caps text-[0.5rem] text-ink-soft">{wedding.dayName}</p>
                  <p className="label-caps mt-1 text-[0.5rem] text-ink-soft">{month}</p>
                </div>
                <div className="px-4">
                  <p className="display-name text-5xl text-gold sm:text-6xl">{day}</p>
                  <p className="label-caps mt-1 text-[0.5rem] text-ink-soft">{year}</p>
                </div>
                <div className="text-left">
                  <p className="label-caps text-[0.5rem] text-ink-soft">{wedding.time}</p>
                </div>
              </div>

              <p className="mt-7 text-sm text-ink-soft">{wedding.venue}</p>
              <p className="text-xs text-ink-soft/80">{wedding.address}</p>

              <KeralaSkyline className="mx-auto mt-8 h-20 w-full max-w-sm text-gold/45" />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
