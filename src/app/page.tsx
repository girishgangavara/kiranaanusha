import { OpeningScene } from "@/components/invitation/OpeningScene";
import { HeroScene } from "@/components/invitation/HeroScene";
import { InvitationReveal } from "@/components/invitation/InvitationReveal";
import { CoupleIntro } from "@/components/invitation/CoupleIntro";
import { StorySection } from "@/components/invitation/StorySection";
import { WeddingDetails } from "@/components/invitation/WeddingDetails";
import { VenueSection } from "@/components/invitation/VenueSection";
import { FinalInvitation } from "@/components/invitation/FinalInvitation";
import { FloatingControls } from "@/components/ui/FloatingControls";

/**
 * The invitation, told as one vertical scroll:
 * envelope → arch → card → couple → story → families → photographs →
 * celebrations → venue → RSVP → farewell.
 */
export default function Page() {
  return (
    <>
      <OpeningScene />

      <main className="relative">
        <HeroScene />
        <InvitationReveal />
        <CoupleIntro />
        <StorySection />
        <WeddingDetails />
        <VenueSection />
        <FinalInvitation />
      </main>

      <FloatingControls />
    </>
  );
}
