import { NewHeader } from "@/components/sections/NewHeader";
import { NewHeroSection } from "@/components/sections/NewHeroSection";
import { PartnersTrustBar } from "@/components/sections/PartnersTrustBar";
import { BioSolutions } from "@/components/sections/BioSolutions";
// import { SwimmingFish } from "@/components/SwimmingFish"; // TODO: Включить когда будет видео с прозрачным фоном
import { ThreePaths } from "@/components/sections/ThreePaths";
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

// Градиентный переход для "погружения" в темноту
const DiveTransition = () => (
  <div className="h-32 md:h-48 bg-gradient-to-b from-background via-slate-200 to-[#0a0f0f] relative overflow-hidden">
    {/* Волнистая линия погружения */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0f] to-transparent" />
    <div className="absolute bottom-8 left-1/4 w-64 h-32 bg-[#4DB6AC]/10 rounded-full blur-[80px]" />
  </div>
);

// Градиентный переход для "выныривания" к свету
const SurfaceTransition = () => (
  <div className="h-32 md:h-48 bg-gradient-to-b from-[#0a0f0f] via-slate-800 to-white relative overflow-hidden">
    {/* Свет сверху */}
    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0a0f0f] to-transparent" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#4DB6AC]/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
  </div>
);

// Мягкий переход между светлыми секциями
const SoftLightTransition = () => (
  <div className="h-16 md:h-24 bg-gradient-to-b from-white via-slate-50 to-gray-50" />
);

// Брендовый переход к финалу
const BrandTransition = () => (
  <div className="h-24 md:h-32 bg-gradient-to-b from-gray-50 via-[#4DB6AC]/5 to-[#4DB6AC]/10 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/3 w-72 h-24 bg-[#4DB6AC]/20 rounded-full blur-[60px]" />
    <div className="absolute bottom-0 right-1/4 w-48 h-20 bg-[#2DD4BF]/15 rounded-full blur-[50px]" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* <SwimmingFish /> */}
      <NewHeader />
      <main>
        {/* ═══════════════════════════════════════════════════════════════
            🌅 СВЕТ: Начало путешествия
        ═══════════════════════════════════════════════════════════════ */}
        <NewHeroSection />
        <PartnersTrustBar />
        <BioSolutions />
        
        {/* ═══════════════════════════════════════════════════════════════
            🌊 ПОГРУЖЕНИЕ: Переход в технологическую глубину
        ═══════════════════════════════════════════════════════════════ */}
        <DiveTransition />
        
        {/* ═══════════════════════════════════════════════════════════════
            🔬 ГЛУБИНА: Технологии и наука BioCube
        ═══════════════════════════════════════════════════════════════ */}
        <ThreePaths />
        <IntelligentCore />
        
        {/* ═══════════════════════════════════════════════════════════════
            ☀️ ВЫНЫРИВАНИЕ: Возврат к свету и выбору
        ═══════════════════════════════════════════════════════════════ */}
        <SurfaceTransition />
        
        {/* ═══════════════════════════════════════════════════════════════
            🛒 ВЫБОР: Продукты и возможности
        ═══════════════════════════════════════════════════════════════ */}
        <MacroWorld />
        <VirtualTryOn />
        <SoftLightTransition />
        <ParticipationLevels />
        <BioScoreDashboard />
        <TrustBar />
        
        {/* ═══════════════════════════════════════════════════════════════
            💎 ФИНАЛ: Брендовое завершение
        ═══════════════════════════════════════════════════════════════ */}
        <BrandTransition />
        <ComparisonTable />
        <LeadForm />
        <CTASection />
      </main>
      <NewFooter />
    </div>
  );
};

export default Index;
