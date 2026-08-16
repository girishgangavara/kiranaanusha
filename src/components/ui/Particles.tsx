"use client";

import { useMemo } from "react";
import { seeded } from "@/lib/utils";

/**
 * Slow drifting light motes — the dust-in-lamplight effect from the video.
 * Pure CSS animation on transform/opacity only, so it stays on the compositor
 * and costs no JavaScript per frame.
 *
 * Two details keep server and client markup byte-identical (hydration safety):
 *   1. positions are seeded, never random, and rounded to a fixed precision —
 *      the browser normalises long floats, React does not, and the two then
 *      disagree;
 *   2. the gradient is a class, not an inline `background` shorthand, which the
 *      browser expands into longhand properties on parse.
 */
export function Particles({
  count = 18,
  tone = "gold",
  className = "",
}: {
  count?: number;
  tone?: "gold" | "light";
  className?: string;
}) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (seeded(i, 1) * 100).toFixed(3),
        bottom: (seeded(i, 2) * 40).toFixed(3),
        size: (1.5 + seeded(i, 3) * 3).toFixed(2),
        duration: (14 + seeded(i, 4) * 16).toFixed(2),
        delay: (seeded(i, 5) * 18).toFixed(2),
        opacity: (0.25 + seeded(i, 6) * 0.5).toFixed(3),
      })),
    [count],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className={`mote absolute rounded-full ${tone === "gold" ? "mote-gold" : "mote-light"}`}
          style={{
            left: `${m.left}%`,
            bottom: `${m.bottom}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            opacity: m.opacity,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
