"use client";

import { useInvitation } from "@/components/providers/InvitationProvider";
import { Kalasam } from "@/components/ui/Ornaments";
import { SectionHeading } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The turn in the story: from who they are, to what happens and when.
 *
 * Deliberately holds no date, no hour and no hall — it only promises that three
 * days are coming. Every detail waits for the scene it belongs to.
 */
export function CelebrationsIntro() {
  const { t } = useInvitation();

  return (
    <section
      id="celebrations"
      className="parchment-scene relative flex min-h-[62svh] flex-col items-center justify-center overflow-hidden px-5 py-20"
      aria-label={t.ceremonies.eyebrow}
    >
      <Particles count={14} />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <Reveal>
          <Kalasam className="mx-auto h-14 w-12 text-gold" />
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <SectionHeading eyebrow={t.ceremonies.eyebrow} title={t.ceremonies.title} />
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-md text-[1.02rem] leading-[1.95] text-ink-soft sm:text-lg">
            {t.ceremonies.lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
