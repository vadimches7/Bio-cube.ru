import { NewHeader } from "@/components/sections/NewHeader";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { WellnessDiagnostics } from "@/components/sections/WellnessDiagnostics";
import { ThreePaths } from "@/components/sections/ThreePaths";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { IntelligentCore } from "@/components/sections/IntelligentCore";
import { MacroWorld } from "@/components/sections/MacroWorld";
import { VirtualTryOn } from "@/components/sections/VirtualTryOn";
import { ParticipationLevels } from "@/components/sections/ParticipationLevels";
import { BioScoreDashboard } from "@/components/sections/BioScoreDashboard";
import { TrustBar } from "@/components/sections/TrustBar";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { LeadForm } from "@/components/sections/LeadForm";
import { CTASection } from "@/components/sections/CTASection";
import { NewFooter } from "@/components/sections/NewFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewHeader />
      <main>
        <NewHeroSection />
        <WellnessDiagnostics />
        <ThreePaths />
        <ThreePillars />
        <IntelligentCore />
        <MacroWorld />
        <VirtualTryOn />
        <ParticipationLevels />
        <BioScoreDashboard />
        <TrustBar />
        <ComparisonTable />
        <LeadForm />
        <CTASection />
      </main>
      <NewFooter />
    </div>
  );
};

export default Index;
