"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { FloralStrand, GaneshaCrest } from "@/components/ui/Ornaments";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The couple, and the close of the invitation.
 *
 * One photograph of the two of them together — shown exactly as supplied, never
 * cropped into or retouched — and then everything the invitation has left to
 * say. There were separate scenes for him and for her; one frame with both of
 * them says it better, and saying goodbye anywhere else only scattered the
 * message across the page.
 *
 * So this is the only place the names are printed as a pair, the only closing
 * line, and the only signature.
 */
export function CoupleIntro() {
  const { t } = useInvitation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { groom, bride, couplePhoto } = weddingConfig;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* The frame holds still while the picture inside it swells — the push-in a
     camera makes while it lingers on a face. */
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.0, 1.08, 1.0]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.12, 0.9]);

  return (
    <section
      ref={ref}
      className="night-scene relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24"
      aria-label={t.couple.eyebrow}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloralStrand className="sway absolute -top-2 left-[7%] h-40 w-7 text-gold/45 sm:h-56" />
        <FloralStrand
          className="sway absolute -top-2 right-[7%] h-40 w-7 text-gold/45 sm:h-56"
          style={{ animationDelay: "1.1s" }}
        />
      </div>

      <Particles count={22} tone="light" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <Reveal>
          <p className="label-caps text-[0.6rem] text-gold-light">{t.couple.eyebrow}</p>
          <OrnamentalDivider className="mt-5" tone="light" />
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <div className="relative">
            <motion.span
              aria-hidden="true"
              style={{ scale: reduce ? 1 : haloScale }}
              className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(176,138,69,0.24),transparent_68%)] blur-2xl"
            />
            <div className="relative rounded-t-[999px] rounded-b-xl border border-gold/35 p-1.5">
              <motion.div
                style={{ scale: reduce ? 1 : portraitScale }}
                className="overflow-hidden rounded-t-[999px] rounded-b-lg"
              >
                <PhotoFrame
                  src={couplePhoto}
                  alt={`${groom.shortName} and ${bride.shortName}`}
                  shape="arch"
                  priority
                  className="h-[22rem] w-[15rem] sm:h-[30rem] sm:w-[21rem]"
                  sizes="(max-width: 640px) 72vw, 336px"
                />
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* the only place the two names are printed together */}
        <Reveal delay={0.24}>
          <h2 className="display-name mt-12 text-4xl text-ivory sm:text-5xl">
            {groom.shortName}
            <span className="my-1 block text-2xl font-light italic text-gold">
              {t.opening.and}
            </span>
            {bride.shortName}
          </h2>
        </Reveal>

        <Reveal delay={0.34}>
          <OrnamentalDivider className="mt-9" tone="light" />
        </Reveal>

        {/* everything the invitation has left to say, said once, here */}
        <Reveal delay={0.42}>
          <p className="mt-10 max-w-md text-[1.02rem] leading-[1.95] text-ivory/75 sm:text-lg">
            {t.final.awaiting}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <GaneshaCrest className="mx-auto mt-12 h-10 w-12 text-gold" />
          <p className="display-name mt-4 text-2xl italic text-gold sm:text-3xl">
            {t.final.withLove}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
