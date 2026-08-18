/**
 * Hand-drawn ornamental vocabulary taken from the reference invitation:
 * a Ganesha crest, temple lamps, lotus blooms, a kalasam, interlocking rings
 * and the Kerala heritage roofline that sits at the foot of the card.
 *
 * All are inline SVG - they scale to any density, tint with currentColor and
 * add nothing to the network payload. Every one is decorative, so they carry
 * aria-hidden and are never the only carrier of meaning.
 */

type SvgProps = React.SVGProps<SVGSVGElement>;

const base = (props: SvgProps) => ({
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: "false" as const,
  ...props,
});

/** Stylised Ganesha crest used as the envelope seal and card header. */
export function GaneshaCrest(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 96" fill="none" {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* crown / headdress */}
        <path d="M60 8c-4.2 0-7 2.6-7 6.2 0 2.3 1.2 4 3 5.2" />
        <path d="M60 8c4.2 0 7 2.6 7 6.2 0 2.3-1.2 4-3 5.2" />
        <path d="M60 4.5v4" />
        <path d="M52 12.5c-2.6-1.3-4.6-3-5.8-5.2M68 12.5c2.6-1.3 4.6-3 5.8-5.2" />
        {/* head */}
        <path d="M60 19c-9.6 0-16.6 6.6-16.6 15.2 0 5.2 2.4 9.4 6 12.2" />
        <path d="M60 19c9.6 0 16.6 6.6 16.6 15.2 0 5.2-2.4 9.4-6 12.2" />
        {/* ears */}
        <path d="M43.6 27c-6.4-1.4-11.4 1.6-13 7.2-1.7 5.8 1.6 11.4 7.6 13.4 3 1 5.6.8 7.7-.2" />
        <path d="M76.4 27c6.4-1.4 11.4 1.6 13 7.2 1.7 5.8-1.6 11.4-7.6 13.4-3 1-5.6.8-7.7-.2" />
        <path d="M45 32c-3.6-.6-6.2 1-7 3.9-.9 3 .8 6 4 7.1" />
        <path d="M75 32c3.6-.6 6.2 1 7 3.9.9 3-.8 6-4 7.1" />
        {/* trunk */}
        <path d="M60 33c-1.9 0-3.2 1.4-3.2 3.4 0 3.4.9 6.3.9 9.7 0 5.2-2.6 8.4-2.6 12.4 0 3.6 2.6 6 6 6 3.2 0 5.6-2.1 5.6-5" />
        <path d="M63.2 36.4c0-2-1.3-3.4-3.2-3.4" />
        {/* tusks + eyes */}
        <path d="M53.4 46.6c-1.7 1-2.6 2.4-2.6 4M66.6 46.6c1.7 1 2.6 2.4 2.6 4" />
        <path d="M52.6 34.4h2.6M64.8 34.4h2.6" />
        {/* lotus base */}
        <path d="M40 66c4 0 7.2 2 9.4 5.6M80 66c-4 0-7.2 2-9.4 5.6" />
        <path d="M60 62c-5.4 0-9.6 3.4-11.6 8.6h23.2C69.6 65.4 65.4 62 60 62Z" />
        <path d="M32 72h56" />
        <path d="M38 76.5h44M45 81h30" />
      </g>
    </svg>
  );
}

/** Kalasam / pot-and-leaf motif that heads the family cards. */
export function Kalasam(props: SvgProps) {
  return (
    <svg viewBox="0 0 48 56" fill="none" {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4v7" />
        <path d="M24 11c-3 0-5 1.7-5 4h10c0-2.3-2-4-5-4Z" />
        <path d="M17 15h14" />
        <path d="M18 15c-3.4 2.6-5.4 6.6-5.4 11.2C12.6 34 17.6 40 24 40s11.4-6 11.4-13.8c0-4.6-2-8.6-5.4-11.2" />
        <path d="M15 44h18M17 48h14M19.5 52h9" />
        <path d="M24 40v4" />
      </g>
    </svg>
  );
}

/** Two interlocking rings - the header of the story card. */
export function Rings(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 32" fill="none" {...base(props)}>
      <circle cx="24" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="40" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <path d="M32 6.4c2.2 2.4 3.4 5.7 3.4 9.6s-1.2 7.2-3.4 9.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** A single lotus bloom, used along section edges. */
export function Lotus(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 40" fill="none" {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6c-3.4 4-5 8.4-5 13.4 0 4 1.7 7.6 5 10.6 3.3-3 5-6.6 5-10.6C37 14.4 35.4 10 32 6Z" />
        <path d="M32 30c-4.4-1-8-3.2-10.6-6.6-2.2-2.8-3.4-6-3.7-9.6 4.2.6 7.6 2.4 10.2 5.4" />
        <path d="M32 30c4.4-1 8-3.2 10.6-6.6 2.2-2.8 3.4-6 3.7-9.6-4.2.6-7.6 2.4-10.2 5.4" />
        <path d="M32 30c-5.6.6-10.4-.6-14.4-3.6-2.6-2-4.4-4.4-5.6-7.4 4.6-.8 8.8 0 12.4 2.4" />
        <path d="M32 30c5.6.6 10.4-.6 14.4-3.6 2.6-2 4.4-4.4 5.6-7.4-4.6-.8-8.8 0-12.4 2.4" />
        <path d="M14 33h36" />
      </g>
    </svg>
  );
}

/** Standing brass lamp (nilavilakku) with an animated flame. */
export function Diya({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 40 96" fill="none" className={className} {...base(props)}>
      <g className="flame" style={{ transformOrigin: "20px 30px" }}>
        <path
          d="M20 8c3.4 4.2 5.2 7.6 5.2 11.2 0 3.4-2.3 6-5.2 6s-5.2-2.6-5.2-6C14.8 15.6 16.6 12.2 20 8Z"
          fill="url(#flameGrad)"
        />
      </g>
      <defs>
        <linearGradient id="flameGrad" x1="20" y1="8" x2="20" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF3C4" />
          <stop offset="0.5" stopColor="#F5C458" />
          <stop offset="1" stopColor="#D08A2A" />
        </linearGradient>
      </defs>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 30h20l-3 6H13l-3-6Z" />
        <path d="M20 36v10" />
        <path d="M13 46h14l-2.5 5h-9L13 46Z" />
        <path d="M20 51v14" />
        <path d="M12 65h16l-3 6H15l-3-6Z" />
        <path d="M20 71v10" />
        <path d="M8 88c0-4 5.4-7 12-7s12 3 12 7H8Z" />
        <path d="M5 92h30" />
      </g>
    </svg>
  );
}

/** Hanging jasmine-and-bud strand for the top corners of a scene. */
export function FloralStrand({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 40 200" fill="none" className={className} {...base(props)}>
      <path d="M20 0v186" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {Array.from({ length: 11 }).map((_, i) => {
        const y = 10 + i * 16;
        const r = i % 2 === 0 ? 5 : 3.6;
        return (
          <g key={i}>
            <circle cx={20 - r - 1} cy={y} r={r} stroke="currentColor" strokeWidth="1.1" />
            <circle cx={20 + r + 1} cy={y + 6} r={r * 0.82} stroke="currentColor" strokeWidth="1.1" />
          </g>
        );
      })}
      <path
        d="M20 186c-4 3-6 7-6 11 0 .6 1 .6 1 0 .3-4 2.2-7.4 5-9.6 2.8 2.2 4.7 5.6 5 9.6 0 .6 1 .6 1 0 0-4-2-8-6-11Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

/** Kerala heritage roofline (nalukettu) with palms - the card's footer. */
export function KeralaSkyline({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 320 96" fill="none" className={className} {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* palms, left */}
        <path d="M28 92V56" />
        <path d="M28 56c-7-6-14-7-20-4 5-5 13-5 20 1 0-8 4-13 11-15-5 4-7 9-7 15 6-5 13-6 19-3-7 0-13 3-17 8" />
        <path d="M52 92V62" />
        <path d="M52 62c-5-4-11-5-16-3 4-4 10-4 16 1 0-6 3-10 9-12-4 3-6 7-6 12 5-4 10-5 15-3-6 0-10 2-14 6" />
        {/* central nalukettu */}
        <path d="M160 20 118 44h84L160 20Z" />
        <path d="M124 44v10h72V44" />
        <path d="M110 62 96 74h128l-14-12H110Z" />
        <path d="M104 74v18h112V74" />
        <path d="M136 92V78h16v14M168 92V78h16v14" />
        <path d="M160 12v8" />
        <path d="M156 16h8" />
        {/* side wings */}
        <path d="M96 74 78 86v6M224 74l18 12v6" />
        {/* palms, right */}
        <path d="M292 92V56" />
        <path d="M292 56c7-6 14-7 20-4-5-5-13-5-20 1 0-8-4-13-11-15 5 4 7 9 7 15-6-5-13-6-19-3 7 0 13 3 17 8" />
        <path d="M268 92V62" />
        <path d="M268 62c5-4 11-5 16-3-4-4-10-4-16 1 0-6-3-10-9-12 4 3 6 7 6 12-5-4-10-5-15-3 6 0 10 2 14 6" />
        {/* ground */}
        <path d="M8 92h304" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Small filigree used between lines of type. */
export function Filigree(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 16" fill="none" {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 8h34" />
        <path d="M82 8h34" />
        <path d="M60 3c-3.6 0-6 2-6 5s2.4 5 6 5 6-2 6-5-2.4-5-6-5Z" />
        <path d="M54 8c-3 0-5-1.4-6.6-3.4M66 8c3 0 5-1.4 6.6-3.4" />
        <path d="M54 8c-3 0-5 1.4-6.6 3.4M66 8c3 0 5 1.4 6.6 3.4" />
      </g>
    </svg>
  );
}

/** Corner flourish for the printed cards. */
export function CornerFlourish(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...base(props)}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 30C4 15 15 4 30 4" />
        <path d="M10 30c0-11 9-20 20-20" />
        <path d="M10 30c6 0 10-3 12-8" />
        <path d="M22 22c4-1 7-4 8-12" />
        <path d="M4 44c6-2 9-6 10-12" />
        <path d="M44 4c-2 6-6 9-12 10" />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Scenery.
 *
 * The ceremony scenes each need their own setting, and there are no photographs
 * of a haldi courtyard, of the hall, or of a temple to use. These draw them.
 *
 * Unlike the motifs above they are polychrome: a wedding scene wants marigold
 * and rose and leaf-green, not one tint. Each takes its colours as props so a
 * single spray can be marigold at the haldi and deep rose at the reception,
 * which is what keeps three scenes built from the same parts looking like three
 * different days.
 * ──────────────────────────────────────────────────────────────────────────── */

/** One rose, drawn as a coil. The building block of every spray below. */


/** Hanging lantern with a lit wick — strung along the top of both references. */
export function Lantern({
  metal = "#c9a227",
  glow = "#ffd98a",
  className,
  ...props
}: SvgProps & { metal?: string; glow?: string }) {
  return (
    <svg viewBox="0 0 40 120" fill="none" className={className} {...base(props)}>
      <path d="M20 0v26" stroke={metal} strokeWidth="1.6" />
      <circle cx="20" cy="8" r="3" stroke={metal} strokeWidth="1.4" fill="none" />
      <circle cx="20" cy="17" r="3" stroke={metal} strokeWidth="1.4" fill="none" />
      <path d="M20 26c-7 0-11 4-11 9h22c0-5-4-9-11-9Z" fill={metal} />
      <path d="M9 35h22l-3 42H12L9 35Z" fill={glow} opacity="0.5" />
      <path d="M9 35h22l-3 42H12L9 35Z" stroke={metal} strokeWidth="1.7" fill="none" />
      <path d="M14 44h12M14 56h12M14 68h12" stroke={metal} strokeWidth="1.1" opacity="0.7" />
      <g className="flame" style={{ transformOrigin: "20px 60px" }}>
        <ellipse cx="20" cy="58" rx="5" ry="8" fill={glow} />
      </g>
      <path d="M12 77h16l-2 7H14l-2-7Z" fill={metal} />
      <path d="M20 84v7" stroke={metal} strokeWidth="1.4" />
      <circle cx="20" cy="94" r="3.2" fill={metal} />
    </svg>
  );
}





