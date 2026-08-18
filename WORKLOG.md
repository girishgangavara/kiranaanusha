# Worklog — 18 Aug 2026

Everything done in this session, in order, with what was verified and what
was not. Durable technical facts have also been folded into `CLAUDE.md`;
this file is the narrative record.

---

## 1. Background music

**Swapped the track.** `src/config/wedding.ts` now points at
`/music/marriagesong.mp3` instead of `/music/wedding.m4a`.

Verified with `afinfo`: MPEG layer III, 48 kHz stereo, **36.1 s, 1.4 MB** —
inside the 1–2 MB mobile-data budget the project sets itself. It is a 320 kbps
encode; ~128 kbps would be near-identical quality at a third the size, if the
payload ever matters.

`public/music/wedding.m4a` is still on disk, now unreferenced. Left in place.

**Made it play for the whole visit** — `InvitationProvider.tsx`.

The track always looped (`audio.loop = true`). The real fault was that **mobile
browsers pause audio the moment the page loses the foreground** — screen lock,
switching to WhatsApp, an incoming call — and never resume it. Worse, `musicOn`
stayed `true`, so the floating button claimed music was playing over silence.

Three changes:

- `play` / `pause` listeners on the element, so the control reflects what the
  audio is genuinely doing however it got there.
- A resume handler on `visibilitychange`, `focus`, `pageshow` and `pointerdown`,
  skipped if the guest muted deliberately. The tap is the fallback: iOS
  sometimes refuses a silent resume but always allows one on a gesture.
- `ended` restarts defensively — unreachable while `loop` works, free if not.

Deliberate mutes still stick: the guard reads the same `sessionStorage` flag the
mute button writes. Tap ordering was checked — `pointerdown` fires before
`click`, but the audio is still playing at that instant, so the resume bails and
the mute lands normally.

> **Not verified on hardware.** iOS Safari's silent-resume behaviour varies by
> version and by whether the phone was hard-locked or app-switched. Worth
> testing on a real iPhone: lock mid-song, unlock, confirm it resumes.

---

## 2. Opening scene — four rewrites

The scene went through four versions this session. Recording the discarded ones
because each was abandoned for a reason worth not rediscovering.

### v1 — CSS card out of the reference photos
Kept `seq-05`/`seq-06` (sealed → flap open) as a cross-dissolve, and built the
card in CSS sliding out of a clipped pocket. Introduced the layering trick that
survived to the end: **paint the open frame twice, the second copy clipped to
the pocket and stacked on top of the card**, so the card disappears behind the
envelope instead of fading in over it.

Also levelled the scene by rotating the whole stage −3.5°, inside a wrapper, so
that every measured offset turned with the photograph and needed no realignment.

### v2 — the eight-beat timeline
Implemented the requested spec: hold → glow → seal pulse → flap → light →
card rises blurred-to-sharp → names one at a time → date. Cues became **absolute
marks in a `SEQUENCE` table** rather than chained durations, so retiming one beat
cannot drift the rest. That structure survived to the end.

### v3 — the couple's own plates, cut on a bloom
`first.jpeg` and `second.jpeg` replaced the reference frames. Both were opened
and inspected first, per the standing rule — both carry the correct names.

Their type is painted in, so the component stopped lettering anything on top.
The two plates are composed differently (the envelope sits at a different size
and angle in each), so a dissolve slid one over the other in plain sight; the
cut is made on **a bloom that blows the frame out to gold** instead.

### v4 — final: `second.jpeg` taken apart so the card moves
`second.jpeg` is a flat picture with the card already out. It is now painted
four times:

| layer | what it is |
|---|---|
| base | the whole plate |
| fill | silk-toned panel on the card's exact footprint, hiding the painted card |
| card | the plate clipped to the card, free to slide |
| envelope | the plate clipped to the V of the flaps, stacked **on top** |

The card slides between the fill and the envelope, so it climbs out from behind
the flaps. **At rest the four layers reassemble into `second.jpeg` pixel for
pixel** — confirmed against the original.

Geometry, measured off a grid laid over the plate at full size (920×1240),
which is why the stage is locked to 920/1240 and not to `first`:

- Card top **7.5%**, sides **18.5% / 81.5%**
- Flap corners **(11.5%, 39.5%)** and **(88.5%, 44%)**, apex **(50%, 63.5%)**
- Travel **37%** — the card's top-left corner crosses the V at 43.9%

> **Re-exporting either plate invalidates every number above.**

The `fill` is the one invention: the artwork never shows what is behind the
card, so those pixels do not exist. Cutting it to the card's exact footprint
means the only edge it can show is the edge the card already has, and the
plate's own drop shadow survives around it and reads as a recess. It is visible
only while the card is moving, under the tail of the bloom.

---

## 3. How it was checked

Headless Chrome driven over the DevTools Protocol from a small Node script —
no Playwright/Puppeteer in this project, and none installed. Two techniques
worth keeping:

- **Millisecond-accurate beat capture.** Screenshots scheduled against a `t0`
  taken at the click, sleeping `t0 + mark - Date.now()` each time. The naive
  version drifted badly because screenshot encoding time accumulated.
- **A measuring grid injected into the live page**, appended *inside* the
  rotated/scaled wrapper so it shared the card's coordinate space. This is what
  produced the geometry above; eyeballing screenshots had been giving numbers
  that were consistently a few percent off.

### Bugs this caught, all fixed
1. The card was visible **before** the envelope opened — the pocket layer that
   hides it only becomes opaque once the flap lifts.
2. The card was much narrower than the envelope, and sitting left of the mouth.
3. The envelope was visibly tilted.
4. The bloom's circular edge drew a **visible arc** across the artwork; it was
   too small, so its falloff landed on the frame edge.
5. At the bloom's peak **both plates were legible at once**, showing the cut.
   Fixed by taking the sealed plate out fast and bringing the open one in late.
6. The fill panel's own edges were showing above the card.

---

## 4. Content and config

Pre-existing working-tree edits, now committed — placeholders replaced with real
detail:

- Venue: **Matha Convention Hall, KB Cross, Tiptur Taluk, Tumkur District**
- Muhurtham **9:30–10:30 AM**; reception **from 7:00 PM**, 30 Aug 2026
- Real maps link, replacing the generic Bengaluru search
- The couple's own story paragraphs, replacing the reference couple's words
- `shortName` now the full "Kirana K R" / "Anusha T S"
- Language toggle commented out of `FloatingControls`

`CLAUDE.md`'s "Still carrying reference-couple content" section was removed —
it is no longer true. The scene is now **English-only**, since the plates' type
is baked in, so the sealed frame no longer offers the language toggle.

---

## 5. Git

- Added `CREDENTIALS.local.md` and `*.local.md` to `.gitignore`. It was
  untracked but unprotected — a broad `git add` would have committed it.
- Commit **`c3ef6ef`** — 11 files, +378 / −123.
- Pushed to **`main`**, verified on the remote via `git ls-remote`:
  `c3ef6ef409b4e02d620504c5f4d1799b229ffd75  refs/heads/main`.

Pushed directly to `main`, matching this repo's linear history and the workflow
in `CLAUDE.md`. The local `origin/main` tracking ref reads stale because the
push went to the URL with a PAT rather than through the remote name; a `git
fetch` will correct it.

Build, typecheck and lint were clean at every step. The only lint output is
three pre-existing unused-import warnings in `FloatingControls.tsx`, left from
commenting out the language button.

---

## 6. Deploy — NOT DONE

**The site is not live with these changes.** Vercel is not git-connected, so the
push alone changes nothing in production.

What happened:

```
npx vercel deploy --yes        →  {"status":"error","reason":"deploy_failed",
                                   "message":"Not authorized"}
npx vercel whoami              →  girishgangavara   (CLI *is* authenticated)
.vercel/project.json  orgId    →  team_tY4GIwaRIhTSjh8izTD0dNYw
```

The CLI is logged in, but the project belongs to a **team**, and the deploy ran
against the personal scope. The likely fix is to pass the scope:

```bash
npx vercel deploy --yes --scope girishs-projects-ab7d0d86 > deploy.log 2>&1
npx vercel promote dpl_xxx --yes --scope girishs-projects-ab7d0d86
```

> **This is a hypothesis, not a verified fix** — the scoped retry was stopped
> before it ran. Nothing about it has been tested.

Use deploy + promote, not `--prod`: `--prod` never spawns a worker and hangs.
Redirect output to a file rather than piping to `tail`.

---

## 7. Left open

- **Deploy** (above) — the one thing standing between this work and the live site.
- **Music resume on real iOS** — needs a hardware test.
- **The `fill` panel** — check on a real phone whether it reads as a recess or
  as a patch while the card is moving. Shortening the travel would shrink it.
- **`public/music/wedding.m4a`** and **`seq-05.jpg` / `seq-06.jpg`** are now
  unused. Kept deliberately; delete when you are sure.
- Three unused-import warnings in `FloatingControls.tsx`.
