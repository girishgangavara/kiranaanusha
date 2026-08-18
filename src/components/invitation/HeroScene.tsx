"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInvitation } from "@/components/providers/InvitationProvider";
import {
  GaneshaCrest,
  Diya,
  FloralStrand,
  KeralaSkyline,
  Lotus,
} from "@/components/ui/Ornaments";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Particles } from "@/components/ui/Particles";

/**
 * SCENE 02 — the arch, and a breath after the envelope.
 *
 * The garlanded pillars, hanging lamps, warm shaft of light and heritage
 * roofline of the video's title frame. It carries the blessing and the
 * invitation line only: the names have just been read off the opening plate,
 * and every date belongs to the ceremony scene that announces it. Repeating
 * them here is what made the invitation feel like one card on a loop.
 */
export function HeroScene() {
  const { t } = useInvitation();
  const reduce = useReducedMotion();

  return (
    <section
      className="parchment-scene relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-16"
      aria-label="Wedding invitation title"
    >
      {/* slow cinematic push-in on the decorative layer only */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0.3 : 2.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        {/* light shaft */}
        <div className="absolute left-1/2 top-0 h-[70%] w-[62%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,244,214,0.85),transparent_78%)] blur-2xl" />

        {/* hanging strands */}
        <FloralStrand className="sway absolute -top-2 left-[6%] h-40 w-8 text-gold/55 sm:h-56" />
        <FloralStrand
          className="sway absolute -top-2 left-[22%] h-28 w-7 text-gold/40 sm:h-40"
          style={{ animationDelay: "1.2s" }}
        />
        <FloralStrand className="sway absolute -top-2 right-[6%] h-40 w-8 text-gold/55 sm:h-56" />
        <FloralStrand
          className="sway absolute -top-2 right-[22%] h-28 w-7 text-gold/40 sm:h-40"
          style={{ animationDelay: "0.7s" }}
        />

        {/* pillar lamps */}
        <Diya className="absolute bottom-[16%] left-2 h-28 w-11 text-gold/60 sm:left-8 sm:h-40 sm:w-16" />
        <Diya
          className="absolute bottom-[16%] right-2 h-28 w-11 text-gold/60 sm:right-8 sm:h-40 sm:w-16"
          style={{ animationDelay: "1.1s" }}
        />

        {/* lotus at the base */}
        <Lotus className="absolute bottom-3 left-[12%] h-7 w-12 text-gold/40" />
        <Lotus className="absolute bottom-5 right-[12%] h-7 w-12 text-gold/40" />
      </motion.div>

      <Particles count={20} />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.4, delay: 0.2 }}
        >
          <GaneshaCrest className="mx-auto h-14 w-16 text-gold sm:h-16 sm:w-20" />
          <p className="label-caps mt-4 text-[0.55rem] text-gold-deep/90 sm:text-[0.62rem]">
            {t.hero.blessing}
          </p>
        </motion.div>

        <OrnamentalDivider className="mt-7" />

        <motion.p
          className="mt-9 max-w-sm text-[1.05rem] leading-[1.95] text-ink-soft sm:text-lg"
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.2 : 1.5, delay: reduce ? 0 : 0.5 }}
        >
          {t.final.together}
        </motion.p>
      </div>

      {/* heritage roofline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0" aria-hidden="true">
        <KeralaSkyline className="mx-auto h-24 w-full max-w-2xl text-gold/45 sm:h-32" />
      </div>

      {/* scroll cue — sits clear of the roofline below it */}
      <motion.div
        className="absolute bottom-[6.5rem] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-[8.5rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.8, duration: 1 }}
      >
        <span className="label-caps text-[0.5rem] text-ink-soft/80">{t.hero.scroll}</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-gold" aria-hidden="true" />
        </motion.span>
      </motion.div>
    </section>
  );
}
