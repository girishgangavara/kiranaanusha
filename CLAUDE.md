# Kirana & Anusha — wedding invitation

Mobile-first cinematic wedding invitation, shared mainly over WhatsApp.
Recreated from a reference invitation film (see below).

## Stack
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Framer Motion 13
+ lucide-react. Tailwind 4 is **CSS-first** — tokens live in `@theme` inside
`src/app/globals.css`; there is no `tailwind.config.js`.

## Where everything lives
- `src/config/wedding.ts` — names, dates, events, venue, music, gallery.
  **The only file a non-developer should need.**
- `src/config/content.ts` — all copy, English + Kannada (`t.section.key`).
- Components never hardcode strings or dates.

## GitHub
- `girishgangavara/kiranaanusha` (**private**)
- Push with a PAT belonging to **girishgangavara**.

## Vercel
- Project **kiranaanusha** in team `girishs-projects-ab7d0d86`
  → `kiranaanusha.vercel.app`
- **NOT git-connected** — deploys are manual, so the repo and production can
  drift. Connect in Project Settings → Git (grant the GitHub App access to the
  private repo) to make pushes deploy themselves.

### Deploy — `--prod` hangs, use deploy + promote
```bash
npx vercel deploy --yes            # → dpl_xxx
npx vercel promote dpl_xxx --yes   # onto the production alias
```
`--prod` never spawns a worker and hangs. Redirect output to a file, not `tail`.

**`deploy` can fail with `"message": "Not authorized"` even when
`npx vercel whoami` prints `girishgangavara`.** The CLI is logged in, but the
project belongs to the team (`orgId: team_tY4GIwaRIhTSjh8izTD0dNYw`) while the
command runs against the personal scope. Untested fix — add the scope:
```bash
npx vercel deploy --yes --scope girishs-projects-ab7d0d86
```

## The reference film
`public/images/gallery/marriage.mp4` (51.15 s, 716×1274, 30 fps, 1 audio track)
is a **screen recording of another couple's invitation site** (Umesh & Neethu).
Used only as a design reference.

- `public/music/wedding.m4a` — its audio, extracted with AVFoundation via a
  Swift script (no ffmpeg on this machine). `swift` and `sips` are the available
  media tools; `sips` can crop/resize but cannot mask. **No longer played** —
  the site now uses `public/music/marriagesong.mp3` (own track, 36 s, loops).
- `public/images/envelope/seq-05.jpg`, `seq-06.jpg` — the **only two clean
  frames**. Frames at 0–4 s carry the film's burnt-in title plate; frames from
  ~7 s show the printed card, whose face reads **"Umesh S S"**.
  **No longer used by any scene** — kept as reference only.

> **Never add frames back without opening each one first.** Shipping seq-07/08
> put the other couple's name into the opening animation on the live site.

## The plates
The owner supplies finished artwork, and **every line of type on it is painted
in**. No component letters over a plate; they light them and move them.
Editing that copy means re-exporting the image, not touching `content.ts`.
All are English-only, which is why the sealed frame offers no language toggle.
All are drawn `object-contain` — they are bordered artwork and `object-cover`
shaves the gold frame off an edge.

### Ceremony plates — `public/images/ceremonies/`
`haldi.png`, `reception.png`, `mahurtham.png` (~504×1024) each carry their own
name, date and hour. `CeremonyScene` gives each a room: dark warm ground, the
plate's own blurred self behind it for light, turning shafts, and a
scroll-driven push-in. The only text it adds is what the plate does **not**
say — hence `functions: ["Mehendi"]` on the haldi entry, since the plate
already says "Haldi".

### Opening plates — `public/images/envelope/`
`temple-sealed.png` (1024×1536, sealed, jewel at **49.8% / 84%**) and
`second.jpeg` (920×1240, open). `first.jpeg` was the earlier, plainer sealed
plate and is now unused.

- **Every line of type is painted into the image** — border, ornament, blessing,
  names, date. `OpeningScene` letters nothing on top of them; it lights them.
  Editing that copy means re-exporting the plates, not touching `content.ts`.
- Consequently the plates are **English-only**, so the sealed frame no longer
  offers the language toggle.
- Shown `object-contain`, never cropped: they are bordered artwork and
  `object-cover` shaves the gold frame off the edges.
- The two are composed differently (the envelope sits at a different size and
  angle in each), so they are cut on a **bloom that blows the frame out to
  gold** — a plain dissolve slides one over the other visibly.

### `second.jpeg` is taken apart so the card can move
It is a flat picture with the card already out, so `OpeningScene` paints it four
times and slides one copy. Coordinates were measured off a grid laid over the
plate at full size (`920×1240`) and are percentages of it — which is why the
stage is locked to **920/1240**, not to `first`:

| layer | what it is |
|---|---|
| base | the whole plate |
| fill | a silk-toned panel on the card's exact footprint, hiding the painted card |
| card | the plate clipped to `inset(7.5% 18.5% 36% 18.5%)`, free to slide |
| envelope | the plate clipped to the V of the flaps, stacked **on top** |

- Card: top **7.5%**, sides **18.5% / 81.5%**. Flap corners **(11.5%, 39.5%)**
  and **(88.5%, 44%)**, apex **(50%, 63.5%)**.
- Travel is **37%** — enough that the card's top-left corner clears the V, which
  it crosses at 43.9%.
- At rest the four layers reassemble into `second.jpeg` pixel for pixel. **If you
  re-export the plate, every number above has to be re-measured.**
- The `fill` is the one invention: the artwork never shows what is behind the
  card. It only ever appears while the card is in motion, under the bloom.

## Scenes (`src/app/page.tsx`)
A story that moves forward — **never the same card twice**:

envelope → arch → groom → bride → couple → story → celebrations →
haldi → reception → muhurtham (+ countdown) → venue → farewell.

Family, RSVP and photo-gallery sections were built and then removed at the
owner's request. `InvitationReveal` and `WeddingDetails` were deleted in the
same spirit — they were the duplicate cards.

> ### THE ONE RULE
> **A name, a date, an hour or a hall appears in exactly ONE scene.**
>
> The invitation used to print the names on five screens, the date on five and
> the venue on five, which is what made it read as a slideshow of one card. If
> you add a detail to a second scene, the slideshow comes back.
>
> Consequences that look like bugs but are not: the hero carries no names, the
> portrait scenes carry no dates, the venue scene carries no times, and the
> farewell is the only signature.

## Gotchas already hit and fixed
- **Hydration:** long floats and an inline `background` shorthand get normalised
  by the browser but not by React. Round values (`.toFixed(3)`) and put
  gradients in CSS classes — see `Particles.tsx` / `.mote-gold`.
- **React 19 lint** forbids `setState` in an effect; language state uses
  `useSyncExternalStore` instead.
- **OG image** is generated by `src/app/opengraph-image.tsx`. Don't set
  `openGraph.images` in metadata or it overrides the file convention. Avoid
  exotic glyphs (`❖`) — the font fetch fails; use a rotated square div.
- Anything that must paint on the first frame (the opening overlay) uses plain
  CSS transitions, not Framer Motion — FM `initial/animate` rendered transparent
  there and was never diagnosed.

## Real details now in place
Venue (Maatha Convention Hall, Tiptur), the 9:30–10:30 AM muhurtham, the maps
link and the couple's own story paragraphs have all replaced the placeholders
and the reference couple's words. Nothing in `content.ts` is borrowed any more.
