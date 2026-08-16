"use client";

import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SCENE 04 — the couple, on the video's near-black ground.
 *
 * One arch-topped portrait of the two of them together (the temple-doorway
 * shape used in the reference), with both names beneath it.
 */
export function CoupleIntro() {
  const { t } = useInvitation();
  const { groom, bride, couplePhoto } = weddingConfig;

  return (
    <section
      className="night-bloom relative overflow-hidden px-5 py-20 sm:py-28"
      aria-label="The couple"
    >
      <Particles count={22} tone="light" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="label-caps text-[0.6rem] text-gold-light">{t.couple.eyebrow}</p>
          <OrnamentalDivider className="mt-5" tone="light" />
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <div className="relative">
            {/* soft halo behind the arch */}
            <span
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(176,138,69,0.22),transparent_68%)] blur-2xl"
            />
            <div className="relative rounded-t-[999px] rounded-b-xl border border-gold/35 p-1.5">
              <PhotoFrame
                src={couplePhoto}
                alt={`${groom.name} and ${bride.name}`}
                shape="arch"
                priority
                className="h-[22rem] w-[15rem] sm:h-[30rem] sm:w-[21rem]"
                sizes="(max-width: 640px) 72vw, 336px"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <h2 className="display-name mt-12 text-4xl text-ivory sm:text-5xl">{groom.name}</h2>
          <p className="my-2 text-2xl font-light italic text-gold">&amp;</p>
          <h2 className="display-name text-4xl text-ivory sm:text-5xl">{bride.name}</h2>
        </Reveal>

        <Reveal delay={0.34}>
          <OrnamentalDivider className="mt-9" tone="light" />
        </Reveal>
      </div>
    </section>
  );
}
