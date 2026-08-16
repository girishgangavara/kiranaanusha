"use client";

import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import {
  GaneshaCrest,
  Diya,
  FloralStrand,
  KeralaSkyline,
  Lotus,
} from "@/components/ui/Ornaments";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FINAL SCENE — the emotional close of the video: the names once more under
 * the arch, the invitation line, the date and venue, and "With Love" as the
 * light settles. It fades out slowly rather than stopping dead.
 */
export function FinalInvitation() {
  const { t } = useInvitation();
  const { wedding, groom, bride } = weddingConfig;

  return (
    <section
      className="parchment-scene relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20"
      aria-label="With love"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[60%] w-[64%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,244,214,0.8),transparent_75%)] blur-2xl" />
        <FloralStrand className="sway absolute -top-2 left-[7%] h-36 w-7 text-gold/50 sm:h-52" />
        <FloralStrand
          className="sway absolute -top-2 right-[7%] h-36 w-7 text-gold/50 sm:h-52"
          style={{ animationDelay: "1s" }}
        />
        <Diya className="absolute bottom-[18%] left-3 h-24 w-10 text-gold/55 sm:left-10 sm:h-36 sm:w-14" />
        <Diya
          className="absolute bottom-[18%] right-3 h-24 w-10 text-gold/55 sm:right-10 sm:h-36 sm:w-14"
          style={{ animationDelay: "0.9s" }}
        />
        <Lotus className="absolute bottom-4 left-[14%] h-7 w-12 text-gold/40" />
        <Lotus className="absolute bottom-6 right-[14%] h-7 w-12 text-gold/40" />
      </div>

      <Particles count={24} />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <Reveal>
          <GaneshaCrest className="mx-auto h-12 w-14 text-gold" />
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="display-name mt-8 text-5xl text-ink sm:text-6xl">{groom.shortName}</h2>
          <p className="my-2 text-2xl font-light italic text-gold">&amp;</p>
          <h2 className="display-name text-5xl text-ink sm:text-6xl">{bride.shortName}</h2>
        </Reveal>

        <Reveal delay={0.22}>
          <OrnamentalDivider className="mt-8" />
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-md text-base leading-[1.9] text-ink-soft sm:text-lg">
            {t.final.together}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="label-caps mt-9 text-[0.58rem] text-gold-deep">
            {wedding.dayName} · {wedding.dateLabel}
          </p>
          <p className="mt-3 text-sm text-ink-soft">{wedding.venue}</p>
          <p className="text-xs text-ink-soft/75">{wedding.address}</p>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="display-name mt-10 text-2xl italic text-gold sm:text-3xl">
            {t.final.withLove}
          </p>
          <p className="display-name mt-1 text-lg italic text-ink-soft">
            {groom.shortName} &amp; {bride.shortName}
          </p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
        <KeralaSkyline className="mx-auto h-24 w-full max-w-2xl text-gold/40 sm:h-28" />
      </div>
    </section>
  );
}
