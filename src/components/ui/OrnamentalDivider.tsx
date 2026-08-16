import { Filigree } from "./Ornaments";
import { cn } from "@/lib/utils";

/** Gold rule + centre filigree, the separator used throughout the card. */
export function OrnamentalDivider({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "light";
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span
        className={cn(
          "h-px w-12 sm:w-20",
          tone === "gold" ? "gold-rule" : "bg-gold-light/50",
        )}
      />
      <Filigree
        className={cn("h-3 w-20 sm:w-24", tone === "gold" ? "text-gold" : "text-gold-light/80")}
      />
      <span
        className={cn(
          "h-px w-12 sm:w-20",
          tone === "gold" ? "gold-rule" : "bg-gold-light/50",
        )}
      />
    </div>
  );
}

/** Small caps eyebrow + display title, the standard scene header. */
export function SectionHeading({
  eyebrow,
  title,
  tone = "ink",
  className,
}: {
  eyebrow: string;
  title: string;
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <header className={cn("text-center", className)}>
      <p
        className={cn(
          "label-caps text-[0.62rem] sm:text-xs",
          tone === "ink" ? "text-gold-deep" : "text-gold-light",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "display-name mt-3 text-3xl sm:text-4xl md:text-5xl",
          tone === "ink" ? "text-ink" : "text-ivory",
        )}
      >
        {title}
      </h2>
      <OrnamentalDivider className="mt-5" tone={tone === "ink" ? "gold" : "light"} />
    </header>
  );
}
