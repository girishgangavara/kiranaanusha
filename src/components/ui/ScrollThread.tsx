"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useInvitation } from "@/components/providers/InvitationProvider";

/**
 * A gold thread across the top that fills as the story is read.
 *
 * The invitation is long now — eleven scenes — and a guest scrolling on a phone
 * has no idea how much is left. This is the only chrome on the page that says
 * "there is more", and it costs one element.
 *
 * Hidden until the envelope is opened, so it never appears over the sealed
 * plate. The spring is what stops it twitching on a flicked scroll.
 */
export function ScrollThread() {
  const { opened } = useInvitation();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  if (!opened) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-[linear-gradient(90deg,rgba(176,138,69,0)_0%,#b08a45_18%,#e8cf95_52%,#b08a45_84%,rgba(176,138,69,0)_100%)]"
      style={{ scaleX: width }}
    />
  );
}
