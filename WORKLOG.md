# Worklog — 18 Aug 2026

Everything done in this session, with what was verified and what was not.
Durable technical facts are folded into `CLAUDE.md`; this is the narrative.

**State at the end:** all work is committed and pushed — `main` is at
**`80eb5e5`** on GitHub. **The site is still not deployed.** See §8.

---

## 1. Background music

**Track swapped** to `/music/marriagesong.mp3` (`wedding.ts`). Verified with
`afinfo`: MPEG layer III, 48 kHz stereo, **36.1 s, 1.4 MB**. It is a 320 kbps
encode — ~128 kbps would be near-identical at a third the size.
`wedding.m4a` is still on disk, unreferenced.

**Made it survive the whole visit** (`InvitationProvider.tsx`). The track always
looped; the real fault was that **mobile browsers pause audio when the page
loses the foreground** — screen lock, app switch, a call — and never resume.
Worse, `musicOn` stayed `true`, so the control claimed music over silence.

- `play`/`pause` listeners, so the button reflects what the audio actually does
- resume on `visibilitychange`, `focus`, `pageshow`, `pointerdown`, skipped if
  the guest muted deliberately — the tap is the fallback, because iOS sometimes
  refuses a silent resume but always allows one on a gesture
- `ended` restarts defensively

> **Not verified on hardware.** Worth testing on a real iPhone: lock mid-song,
> unlock, confirm it resumes.

---

## 2. The opening scene — five versions

Recording the discarded ones because each was abandoned for a reason worth not
rediscovering.

**v1 — CSS card out of the reference photos.** Cross-dissolved `seq-05`/`seq-06`
and slid a CSS card out of a clipped pocket. Introduced the layering trick that
survived everything: **paint the open frame twice, the second copy clipped to
the pocket and stacked on top of the card.** Also levelled the crooked
photograph by rotating the whole stage −3.5° inside a wrapper, so every measured
offset turned with the picture and needed no realignment.

**v2 — the eight-beat timeline.** hold → glow → seal pulse → flap → light →
card rises blurred-to-sharp → names one at a time → date. Cues became
**absolute marks in a `SEQUENCE` table** rather than chained durations, so
retiming one beat cannot drift the rest. That structure is still in place.

**v3 — the owner's own plates.** `first.jpeg` / `second.jpeg` replaced the film
frames. Their type is painted in, so the component stopped lettering anything on
top. The two are composed differently, so a dissolve slid one over the other in
plain sight — **the cut is made on a bloom that blows the frame out to gold.**

**v4 — `second.jpeg` taken apart so the card moves.** It is a flat picture with
the card already out, so it is painted four times:

| layer | what it is |
|---|---|
| base | the whole plate |
| fill | silk-toned panel on the card's exact footprint, hiding the painted card |
| card | the plate clipped to the card, free to slide |
| envelope | the plate clipped to the V of the flaps, stacked **on top** |

At rest the four reassemble into `second.jpeg` **pixel for pixel** — verified
against the original. Geometry measured off a grid laid over the plate at full
size (920×1240): card top **7.5%**, sides **18.5% / 81.5%**; flap corners
**(11.5%, 39.5%)** and **(88.5%, 44%)**, apex **(50%, 63.5%)**; travel **37%**.

> **Re-exporting a plate invalidates every number above.**

The `fill` is the one invention — the artwork never shows what is behind the
card, so those pixels do not exist. Cut to the card's exact footprint, the only
edge it can show is the edge the card already has.

**v5 — `temple-sealed.png` replaced `first.jpeg`** as the sealed plate. It
already carries "tap to open the invitation", so the whole frame is the tap
target and no button is drawn. Its jewelled clasp was measured to **49.8% / 84%**
and the glow and bloom now start there. `first.jpeg` is unused.

---

## 3. The redesign: no scene says the same thing twice

The invitation had become a slideshow of one card. Measured, it printed:

| detail | scenes it appeared on |
|---|---|
| the names | **5** |
| the date | **5** |
| the venue | **5** |

`InvitationReveal` and `WeddingDetails` **were** the duplicate cards and were
deleted. The rest were stripped back to one job each.

> ### THE ONE RULE
> **A name, a date, an hour or a hall appears in exactly ONE scene.**
> Consequences that look like bugs but are not: the arch carries no names, the
> venue scene carries no times, and the couple scene is the only signature.

**Final order (9 scenes):** envelope → arch → story → celebrations →
haldi+mehendi → reception → muhurtham + countdown → venue → the couple.

Verified by an automated audit that walks every section and reports which scenes
contain each detail. Final result: **every detail in exactly one scene.**

---

## 4. The ceremony plates

The owner supplied finished artwork per day (`public/images/ceremonies/`), each
carrying its own name, date and hour painted in. `CeremonyScene` therefore
letters nothing over them — it gives each a room: dark warm ground, the plate's
own blurred self behind it for light, shafts turning slowly, and a scroll-driven
push-in.

- Plate paths live in **`wedding.ts`**, not in the component. They were briefly
  in the component, which broke this repo's rule that the config is the only
  file you should need to edit.
- **Haldi and Mehendi share the 28th**, so they are one scene with **two plates
  fanned like a pair of cards**, separating as the scene passes. One day does
  not get two screens.
- Details sit beside the plate — chapter number, name, day, date, hour, hall,
  and a line about the day — alternating left/right down the page so three
  scenes from one component never read as three copies of a template.

**Scenery I drew and then deleted.** Before the ceremony artwork arrived I built
a mandap, a convention hall, a temple gopuram and rose sprays as vector art.
Rendered, the hall looked like crude blocks and the roses like flat spots —
thin and amateurish beside the real plates. Deleted rather than shipped; the
portrait scenes fell back to the existing line-art strands.

---

## 5. Motion

- **Ceremony scenes** — plate rises, text sinks, background swells: three rates,
  so the scene has depth instead of sliding as one flat sheet
- **The fan** — two plates rotate and translate apart on scroll, transform-only
- **Countdown digits roll** as they change, so the seconds feel live
- **Scroll thread** — a gold progress line, only after the envelope opens; nine
  scenes is long on a phone and nothing else said there was more
- **Couple portrait** — the frame holds still while the picture swells inside it
- **Venue** — the lotus floats, the map pin breathes
- **Light rays** — a slow `raysturn` behind each ceremony

All of it honours `prefers-reduced-motion`, verified end to end.

---

## 6. How it was tested

Headless Chrome over the DevTools Protocol from small Node scripts — no
Playwright or Puppeteer in this project. Techniques worth keeping:

- **Millisecond-accurate beat capture** — screenshots scheduled against a `t0`
  taken at the click. The naive version drifted badly as encoding time piled up.
- **A measuring grid injected into the live page**, inside the rotated/scaled
  wrapper so it shared the card's coordinate space. Eyeballing screenshots had
  been giving numbers consistently a few percent off.
- **An end-to-end audit** — console errors, broken images, horizontal overflow,
  countdown, links, controls, and the detail-repetition table — on mobile
  (390×844), desktop (1440×900) and reduced-motion.

### Defects this caught, all fixed
1. The card was visible **before** the envelope opened.
2. The card was far narrower than the envelope, and sitting left of the mouth.
3. The envelope was visibly crooked.
4. The bloom drew a **visible arc** across the artwork — too small, so its
   falloff landed on the frame edge.
5. At the bloom's peak **both plates were legible at once**, showing the cut.
6. The fill panel's own edges showed above the card.
7. **"Until We Say Yes" was nearly invisible** — the countdown kept its
   parchment styling after moving onto a dark ground. Now has a `tone` prop.
8. The Muhurtham plate **failed to load** — aspect mismatch plus load timing;
   plates are now `object-contain` (`cover` shaved the gold border).
9. The fanned pair **ran off the edge of a phone**; the travel and rotation now
   sit inside the column at every width.
10. Reception said "Maatha", the venue and artwork say **"Matha"**.

> **One false alarm:** an early run reported the opening never dismissing. That
> was a synthetic `.click()` racing in the test harness. With a real input
> gesture it dismisses at ~7.5 s every time. All later runs use real gestures.

---

## 7. Content and config

- Real venue, muhurtham, maps link and the couple's own story paragraphs
  replaced the placeholders and the reference couple's words
- Ceremony copy added in English and Kannada (`ceremonies`, `people`,
  `final.awaiting`)
- **The plates are English-only**, since their type is painted in
- `CREDENTIALS.local.md` and `*.local.md` added to `.gitignore` — it was
  untracked but unprotected, and a broad `git add` would have committed the PAT

---

## 8. Deploy — STILL NOT DONE

**`main` is at `80eb5e5` on GitHub**, verified with `git ls-remote`. Vercel is
**not git-connected**, so pushing changes nothing in production.

```
npx vercel deploy --yes   →  {"message": "Not authorized"}
npx vercel whoami         →  girishgangavara      (the CLI *is* logged in)
.vercel/project.json      →  orgId: team_tY4GIwaRIhTSjh8izTD0dNYw
```

Being logged in is not the same as being in the right scope: the project is
team-owned and the command ran against the personal scope. Likely fix:

```bash
npx vercel deploy --yes --scope girishs-projects-ab7d0d86 > deploy.log 2>&1
npx vercel promote dpl_xxx --yes --scope girishs-projects-ab7d0d86
```

> **Untested.** The scoped retry was stopped before it ran. Use deploy +
> promote, never `--prod` (it hangs). Redirect output to a file, not `tail`.

---

## 9. Left open

- **The deploy** (§8) — the one thing between this work and the live site
- **Music resume on real iOS** — needs a hardware test
- **`mehandi.png` is 2.6 MB**, against ~900 KB for the other plates. Vercel will
  serve a much smaller WebP, but re-exporting it at ~1024 px wide would lighten
  the repo. `temple-sealed.png` is 2.7 MB for the same reason.
- **The `fill` panel** in the opening — worth a look on a real phone to judge
  whether it reads as a recess or a patch while the card moves
- **Unused assets:** `wedding.m4a`, `first.jpeg`, `seq-05.jpg`, `seq-06.jpg`.
  Kept deliberately.
- The language toggle is back on, but the opening plates are English-only, so
  the sealed frame cannot follow it
