"use client";

import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { Rings, Filigree } from "@/components/ui/Ornaments";
import { SectionHeading } from "@/components/ui/OrnamentalDivider";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SCENE 05 — our story.
 *
 * The reference video shows one long block of text. On the web that is a wall,
 * so each paragraph is its own revealed panel: the reader receives the story a
 * beat at a time while scrolling, exactly the pacing the video gets from time.
 */
export function StorySection() {
  const { t } = useInvitation();

  return (
    <section id="story" className="parchment-scene relative overflow-hidden px-5 py-20 sm:py-28" aria-label="Our story">
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <article className="paper foil-frame relative rounded-md border border-gold/30 px-6 py-10 sm:px-12 sm:py-14">
            <Rings className="mx-auto h-8 w-16 text-gold" />

            <div className="mt-9 space-y-8">
              {t.story.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.08 * i} y={18}>
                  <p className="text-center text-[1.02rem] leading-[1.95] text-ink-soft sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* signature */}
            <Reveal delay={0.2} className="mt-10">
              <div className="flex items-center justify-center gap-4">
                <span className="display-name text-xl italic text-ink">
                  {weddingConfig.groom.shortName}
                </span>
                <Filigree className="h-3 w-12 text-gold" />
                <span className="display-name text-xl italic text-ink">
                  {weddingConfig.bride.shortName}
                </span>
              </div>
            </Reveal>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
