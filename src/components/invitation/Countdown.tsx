"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { pad2, timeLeftUntil, type TimeLeft } from "@/lib/utils";

/**
 * Live countdown to the muhurtham.
 *
 * The first paint is deliberately blank-but-sized: the clock only starts on the
 * client, so the server and client markup agree and React never warns about a
 * hydration mismatch. It stops cleanly at zero and switches to a closing line
 * once the date has passed.
 *
 * `tone` exists because this now sits inside the muhurtham scene, on a dark
 * ground. Written for parchment, its ink title was all but invisible there.
 */
export function Countdown({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const { t } = useInvitation();
  const reduce = useReducedMotion();
  const target = new Date(weddingConfig.wedding.dateISO);
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(timeLeftUntil(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
    // target is derived from a constant config value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finished = left !== null && left.total <= 0;
  const light = tone === "light";

  const cells = [
    { value: left?.days ?? 0, label: t.countdown.days, pad: false },
    { value: left?.hours ?? 0, label: t.countdown.hours, pad: true },
    { value: left?.minutes ?? 0, label: t.countdown.minutes, pad: true },
    { value: left?.seconds ?? 0, label: t.countdown.seconds, pad: true },
  ];

  return (
    <Reveal delay={0.1} className="mt-4 w-full">
      <div className="text-center">
        <p className={`label-caps text-[0.55rem] ${light ? "text-gold-light" : "text-gold-deep"}`}>
          {t.countdown.eyebrow}
        </p>
        <h3
          className={`display-name mt-3 text-2xl sm:text-3xl ${light ? "text-ivory" : "text-ink"}`}
        >
          {t.countdown.title}
        </h3>
        <OrnamentalDivider className="mt-4" tone={light ? "light" : "gold"} />

        {finished ? (
          <p className={`mt-8 text-base ${light ? "text-ivory/80" : "text-ink-soft"}`}>
            {t.countdown.passed}
          </p>
        ) : (
          <div
            className="mt-8 grid grid-cols-4 gap-2 sm:gap-4"
            role="timer"
            aria-live="off"
            aria-label={t.countdown.title}
          >
            {cells.map((cell) => {
              const shown =
                left === null ? "—" : cell.pad ? pad2(cell.value) : String(cell.value);
              return (
                <div
                  key={cell.label}
                  className={
                    light
                      ? "overflow-hidden rounded-md border border-gold/35 bg-black/25 px-1 py-4 backdrop-blur-sm sm:px-2 sm:py-5"
                      : "paper overflow-hidden rounded-md border border-gold/25 px-1 py-4 shadow-[0_10px_24px_-18px_rgba(58,38,18,0.55)] sm:px-2 sm:py-5"
                  }
                >
                  {/* Each number rolls up as it changes — the seconds make the
                      whole scene feel live rather than printed. */}
                  <div className="relative h-[2.4rem] overflow-hidden sm:h-[2.9rem]">
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.p
                        key={shown}
                        initial={reduce ? false : { y: "-90%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { y: "90%", opacity: 0 }}
                        transition={{ duration: reduce ? 0.001 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className={`display-name absolute inset-x-0 text-3xl tabular-nums sm:text-4xl ${
                          light ? "text-gold-light" : "text-gold-deep"
                        }`}
                      >
                        {shown}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <p
                    className={`label-caps mt-2 text-[0.45rem] sm:text-[0.5rem] ${
                      light ? "text-ivory/65" : "text-ink-soft"
                    }`}
                  >
                    {cell.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}
