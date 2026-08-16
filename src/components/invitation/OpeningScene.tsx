"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { GaneshaCrest, Diya, Lotus, CornerFlourish } from "@/components/ui/Ornaments";
import { Particles } from "@/components/ui/Particles";
import { SealedLanguageToggle } from "@/components/ui/FloatingControls";

/**
 * SCENE 01 — the sealed envelope.
 *
 * Recreates the opening frames of the reference video: an ivory envelope with a
 * scalloped flap and a gold Ganesha seal, resting in lamplight. Tapping the seal
 * lifts the flap, the card slides up, and the whole scene irises away to reveal
 * the invitation beneath.
 */
export function OpeningScene() {
  const { opened, open, t } = useInvitation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          key="envelope"
          className="warm-bloom fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 1.14, filter: "blur(6px)" }}
          transition={{ duration: reduce ? 0.2 : 1.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <Particles count={16} />
          <SealedLanguageToggle />

          {/* lamps flanking the envelope */}
          <Diya className="absolute bottom-6 left-3 h-28 w-12 text-gold/70 sm:left-10 sm:h-40 sm:w-16" />
          <Diya
            className="absolute bottom-10 right-3 h-24 w-10 text-gold/60 sm:right-12 sm:h-32 sm:w-14"
            style={{ animationDelay: "0.8s" }}
          />
          <Lotus className="absolute bottom-4 left-1/2 h-8 w-14 -translate-x-1/2 text-gold/40 sm:h-10 sm:w-20" />

          <motion.div
            className="relative w-full max-w-sm"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0.2 : 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-caps mb-6 text-center text-[0.55rem] text-gold-deep/85 sm:text-[0.62rem]">
              {t.opening.blessing}
            </p>

            {/* the envelope */}
            <div className="paper foil-frame relative aspect-[4/3] w-full rounded-lg border border-gold/30">
              <CornerFlourish className="absolute left-3 top-3 h-7 w-7 text-gold/45" />
              <CornerFlourish className="absolute right-3 top-3 h-7 w-7 -scale-x-100 text-gold/45" />
              <CornerFlourish className="absolute bottom-3 left-3 h-7 w-7 -scale-y-100 text-gold/45" />
              <CornerFlourish className="absolute bottom-3 right-3 h-7 w-7 -scale-100 text-gold/45" />

              {/* scalloped flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 origin-top"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: 0 }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true">
                  <path
                    d="M0 0h400v22c0 14-10 22-24 24-30 4-46 22-46 48 0 34-58 62-130 62S70 128 70 94c0-26-16-44-46-48C10 44 0 36 0 22V0Z"
                    fill="#f6efe1"
                    stroke="rgba(176,138,69,0.45)"
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>

              {/* Ganesha seal */}
              <div className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-[radial-gradient(circle_at_35%_30%,#e8cf95,#b08a45_65%,#8a6a2f)] shadow-[0_8px_20px_-8px_rgba(58,38,18,0.6)] sm:h-20 sm:w-20">
                  <GaneshaCrest className="h-10 w-10 text-[#5c451f] sm:h-12 sm:w-12" />
                </div>
              </div>
            </div>

            {/* names */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.55, duration: reduce ? 0.2 : 1 }}
            >
              <p className="label-caps text-[0.58rem] text-gold-deep/85">{t.opening.invited}</p>
              <h1 className="display-name mt-3 text-4xl text-ink sm:text-5xl">
                {weddingConfig.groom.shortName}
                <span className="mx-3 align-middle font-light italic text-gold">
                  {t.opening.and}
                </span>
                {weddingConfig.bride.shortName}
              </h1>
            </motion.div>

            {/* open button */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1.05, duration: 0.9 }}
            >
              <button
                type="button"
                onClick={open}
                className="label-caps group relative overflow-hidden rounded-full border border-gold/60 bg-[linear-gradient(100deg,#d7bd7b,#b08a45_55%,#8a6a2f)] px-8 py-3.5 text-[0.6rem] text-[#3b2a1e] shadow-[0_12px_28px_-14px_rgba(58,38,18,0.75)] transition-transform duration-500 hover:scale-[1.03]"
              >
                {t.opening.open}
              </button>
              <span className="label-caps text-[0.5rem] text-ink-soft/70">{t.opening.hint}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
