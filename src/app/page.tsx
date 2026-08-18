import { OpeningScene } from "@/components/invitation/OpeningScene";
import { HeroScene } from "@/components/invitation/HeroScene";
import { StorySection } from "@/components/invitation/StorySection";
import { CelebrationsIntro } from "@/components/invitation/CelebrationsIntro";
import { CeremonyScene } from "@/components/invitation/CeremonyScene";
import { Countdown } from "@/components/invitation/Countdown";
import { VenueSection } from "@/components/invitation/VenueSection";
import { CoupleIntro } from "@/components/invitation/CoupleIntro";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { ScrollThread } from "@/components/ui/ScrollThread";

/**
 * The invitation, told as a story that moves forward — never the same card
 * twice. Each scene owns exactly one thing and hands over to the next:
 *
 *   envelope      the couple at the temple, on their own plates
 *   arch          a breath, and the invitation line
 *   story         how they got here
 *   celebrations  the turn: three days are coming
 *   haldi         Friday 28 August — two plates, Haldi and Mehendi, fanned
 *   reception     Sunday 30 August, the hour and the hall
 *   muhurtham     Monday 31 August, the hour, and the countdown
 *   venue         where — once, with the map
 *   couple        the two of them, the names as a pair, and the farewell
 *
 * A date, an hour, a hall or a name appears in exactly one of these. If you add
 * a detail to a second scene, the slideshow comes back.
 *
 * The couple scene closes the page deliberately: separate scenes for the groom
 * and the bride, and a separate farewell after them, spread one goodbye over
 * three screens. One frame with both of them does it in one.
 */
export default function Page() {
  return (
    <>
      <OpeningScene />

      <main className="relative">
        <HeroScene />
        <StorySection />

        <CelebrationsIntro />
        <CeremonyScene ceremony="haldi" />
        <CeremonyScene ceremony="reception" />
        <CeremonyScene ceremony="muhurtham">
          {/* The countdown belongs to the muhurtham and nowhere else — it is
              counting to that hour, not to the weekend in general. `light`
              because the ceremony grounds are dark. */}
          <Countdown tone="light" />
        </CeremonyScene>

        <VenueSection />
        <CoupleIntro />
      </main>

      <ScrollThread />
      <FloatingControls />
    </>
  );
}
