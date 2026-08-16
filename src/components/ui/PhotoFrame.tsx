"use client";

import Image from "next/image";
import { useState } from "react";
import { Lotus } from "./Ornaments";
import { cn } from "@/lib/utils";

/**
 * A photograph in a printed-card mount.
 *
 * If the file has not been added to /public/images yet, the frame falls back to
 * an ornamental ivory panel rather than a broken-image icon, so the invitation
 * always looks finished. Drop the real photo in and it appears automatically.
 */
export function PhotoFrame({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 80vw, 380px",
  shape = "rect",
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  shape?: "rect" | "arch";
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-paper",
        shape === "arch" ? "rounded-t-[999px] rounded-b-xl" : "rounded-[3px]",
        className,
      )}
    >
      {failed ? (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center",
            "bg-[linear-gradient(160deg,#f7efdf_0%,#efe2c9_100%)]",
          )}
        >
          <Lotus className="h-7 w-11 text-gold/55" />
          <span className="label-caps text-[0.55rem] text-gold-deep/70">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover", imageClassName)}
          onError={() => setFailed(true)}
        />
      )}

      {/* subtle print sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,transparent_38%)]"
      />

      {caption ? (
        <figcaption className="label-caps absolute bottom-2 left-0 right-0 text-center text-[0.5rem] text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
