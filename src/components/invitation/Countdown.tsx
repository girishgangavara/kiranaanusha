"use client";

import { useEffect, useState } from "react";
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
 */
export function Countdown() {
  const { t } = useInvitation();
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

  const cells = [
    { value: left?.days ?? 0, label: t.countdown.days, pad: false },
    { value: left?.hours ?? 0, label: t.countdown.hours, pad: true },
    { value: left?.minutes ?? 0, label: t.countdown.minutes, pad: true },
    { value: left?.seconds ?? 0, label: t.countdown.seconds, pad: true },
  ];

  return (
    <Reveal delay={0.1} className="mt-16">
      <div className="text-center">
        <p className="label-caps text-[0.55rem] text-gold-deep">{t.countdown.eyebrow}</p>
        <h3 className="display-name mt-3 text-2xl text-ink sm:text-3xl">{t.countdown.title}</h3>
        <OrnamentalDivider className="mt-4" />

        {finished ? (
          <p className="mt-8 text-base text-ink-soft">{t.countdown.passed}</p>
        ) : (
          <div
            className="mt-8 grid grid-cols-4 gap-2 sm:gap-4"
            role="timer"
            aria-live="off"
            aria-label={t.countdown.title}
          >
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="paper rounded-md border border-gold/25 px-1 py-4 shadow-[0_10px_24px_-18px_rgba(58,38,18,0.55)] sm:px-2 sm:py-5"
              >
                <p className="display-name text-3xl tabular-nums text-gold-deep sm:text-4xl">
                  {left === null ? "—" : cell.pad ? pad2(cell.value) : cell.value}
                </p>
                <p className="label-caps mt-2 text-[0.45rem] text-ink-soft sm:text-[0.5rem]">
                  {cell.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
