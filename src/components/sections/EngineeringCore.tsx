import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Hotspot {
  id: number;
  title: string;
  description: string;
  layer: "top" | "middle" | "bottom";
  positionInLayer: { x: number; y: number }; // Position within the layer (percentage)
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    title: "Full Spectrum LED",
    description: "IoT-система освещения, имитирующая естественные солнечные циклы для оптимального здоровья растений.",
    layer: "top",
    positionInLayer: { x: 70, y: 50 },
  },
  {
    id: 2,
    title: "Optiwhite™ Glass",
    description: "Сверхпрозрачное стекло с низким содержанием железа для 99.9% цветопередачи без искажений.",
    layer: "middle",
    positionInLayer: { x: 90, y: 30 },
  },
  {
    id: 3,
    title: "Bio-Sensor Array",
    description: "Внутренние датчики pH, TDS и температуры, передающие данные 24/7 в BioCube OS.",
    layer: "middle",
    positionInLayer: { x: 15, y: 70 },
  },
  {
    id: 4,
    title: "Matrix Purification",
    description: "Продвинутая многоступенчатая биофильтрация, устраняющая необходимость частых подмен воды.",
    layer: "bottom",
    positionInLayer: { x: 30, y: 50 },
  },
];

// Pulsing hotspot component
function PulsingHotspot({
  isActive,
  onHover,
  onLeave,
  position,
}: {
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  position: { x: number; y: number };
}) {
  return (
    <div
      className="absolute cursor-pointer z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full bg-[#4DB6AC]/30"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{ 
          width: 32, 
          height: 32, 
          left: -16, 
          top: -16,
        }}
      />
      {/* Inner pulse ring */}
      <motion.div
        className="absolute rounded-full bg-[#4DB6AC]/40"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.3,
        }}
        style={{ 
          width: 24, 
          height: 24, 
          left: -12, 
          top: -12,
        }}
      />
      {/* Core dot */}
      <motion.div
        className="relative w-4 h-4 rounded-full bg-[#4DB6AC]"
        style={{
          boxShadow: isActive
            ? "0 0 20px rgba(77, 182, 172, 0.8), 0 0 40px rgba(77, 182, 172, 0.4)"
            : "0 0 10px rgba(77, 182, 172, 0.5)",
        }}
        animate={{
          scale: isActive ? 1.4 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

// Info card that appears on hover
function InfoCard({
  hotspot,
  isVisible,
  side,
}: {
  hotspot: Hotspot;
  isVisible: boolean;
  side: "left" | "right";
}) {
  return (
    <motion.div
      className={`w-72 ${side === "left" ? "text-right" : "text-left"}`}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : side === "left" ? -20 : 20,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-xl shadow-[#4DB6AC]/10">
        <div className={`flex items-center gap-3 mb-3 ${side === "left" ? "justify-end" : ""}`}>
          {side === "right" && (
            <div className="w-3 h-3 rounded-full bg-[#4DB6AC] flex-shrink-0" style={{ boxShadow: "0 0 10px rgba(77, 182, 172, 0.5)" }} />
          )}
          <h4 className="text-base font-semibold text-gray-900">{hotspot.title}</h4>
          {side === "left" && (
            <div className="w-3 h-3 rounded-full bg-[#4DB6AC] flex-shrink-0" style={{ boxShadow: "0 0 10px rgba(77, 182, 172, 0.5)" }} />
          )}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{hotspot.description}</p>
      </div>
    </motion.div>
  );
}

// Mobile card component
function MobileInfoCard({ hotspot, index }: { hotspot: Hotspot; index: number }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl p-4 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-3 h-3 rounded-full bg-[#4DB6AC] flex-shrink-0"
          style={{ boxShadow: "0 0 8px rgba(77, 182, 172, 0.5)" }}
        />
        <h4 className="text-sm font-semibold text-gray-900">{hotspot.title}</h4>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed pl-6">{hotspot.description}</p>
    </motion.div>
  );
}

// Layer component
function AquariumLayer({ 
  type, 
  children,
  isInView,
}: { 
  type: "top" | "middle" | "bottom";
  children?: React.ReactNode;
  isInView: boolean;
}) {
  const floatConfig = {
    top: { y: [0, -6, 0], duration: 4, delay: 0 },
    middle: { y: [0, -4, 0], duration: 5, delay: 0.3 },
    bottom: { y: [0, -5, 0], duration: 4.5, delay: 0.6 },
  };

  const config = floatConfig[type];

  if (type === "top") {
    return (
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { 
          opacity: 1, 
          y: config.y,
        } : { opacity: 0, y: -30 }}
        transition={{
          opacity: { duration: 0.6, delay: config.delay },
          y: { duration: config.duration, repeat: Infinity, ease: "easeInOut", delay: config.delay + 0.6 },
        }}
      >
        <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-xl h-14 md:h-16 shadow-2xl mx-auto max-w-md">
          {/* LED strip */}
          <div className="absolute bottom-2 left-4 right-4 h-1.5 bg-gradient-to-r from-[#4DB6AC]/50 via-[#2DD4BF]/70 to-[#4DB6AC]/50 rounded-full blur-[2px]" />
          <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#4DB6AC] via-[#2DD4BF] to-[#4DB6AC] rounded-full" />
          {/* Vents */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-5 h-0.5 bg-gray-600 rounded-full" />
            ))}
          </div>
          {children}
        </div>
        <div className="text-center mt-2 text-xs text-gray-400 font-medium tracking-wider uppercase">
          Светильник
        </div>
      </motion.div>
    );
  }

  if (type === "middle") {
    return (
      <motion.div
        className="relative w-full my-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1,
          y: config.y,
        } : { opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.6, delay: config.delay },
          scale: { duration: 0.6, delay: config.delay },
          y: { duration: config.duration, repeat: Infinity, ease: "easeInOut", delay: config.delay + 0.6 },
        }}
      >
        <div 
          className="relative h-52 md:h-72 rounded-lg overflow-hidden mx-auto max-w-lg"
          style={{
            background: "linear-gradient(180deg, rgba(77, 182, 172, 0.08) 0%, rgba(45, 212, 191, 0.12) 50%, rgba(77, 182, 172, 0.15) 100%)",
            border: "2px solid rgba(200, 220, 220, 0.5)",
            boxShadow: "0 8px 40px rgba(77, 182, 172, 0.1), inset 0 0 80px rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Water surface */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/40 to-transparent" />
          
          {/* Decorations */}
          <div className="absolute bottom-3 left-8 w-10 h-14 bg-gradient-to-t from-gray-400/30 to-gray-300/15 rounded-t-full" />
          <div className="absolute bottom-3 left-16 w-6 h-10 bg-gradient-to-t from-gray-500/30 to-gray-400/15 rounded-t-full" />
          <div className="absolute bottom-3 right-10 w-14 h-20 bg-gradient-to-t from-emerald-500/25 to-emerald-400/10 rounded-t-lg transform -skew-x-3" />
          <div className="absolute bottom-3 right-24 w-8 h-14 bg-gradient-to-t from-emerald-600/25 to-emerald-500/10 rounded-t-lg" />
          
          {/* Fish */}
          <motion.div
            className="absolute top-16 left-1/4 w-5 h-2.5 bg-orange-400/50 rounded-full"
            animate={{ x: [0, 30, 0], y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-24 right-1/3 w-4 h-2 bg-blue-400/50 rounded-full"
            animate={{ x: [0, -20, 0], y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Glass reflection */}
          <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/25 to-transparent" />
          
          {children}
        </div>
        <div className="text-center mt-2 text-xs text-gray-400 font-medium tracking-wider uppercase">
          Optiwhite™ Аквариум
        </div>
      </motion.div>
    );
  }

  // Bottom layer
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: config.y,
      } : { opacity: 0, y: 30 }}
      transition={{
        opacity: { duration: 0.6, delay: config.delay },
        y: { duration: config.duration, repeat: Infinity, ease: "easeInOut", delay: config.delay + 0.6 },
      }}
    >
      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl h-20 md:h-24 shadow-xl border border-gray-300/50 mx-auto max-w-xl">
        {/* Compartments */}
        <div className="absolute inset-2 flex gap-2">
          {/* Bio filter */}
          <div className="flex-1 bg-white/50 rounded-lg p-2 border border-gray-200/50">
            <div className="h-full bg-gradient-to-b from-[#4DB6AC]/15 to-[#4DB6AC]/5 rounded flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#4DB6AC]/40 rounded-full" />
                ))}
              </div>
            </div>
          </div>
          {/* Pump */}
          <div className="w-1/5 bg-white/50 rounded-lg p-2 border border-gray-200/50">
            <div className="h-full bg-gray-600/10 rounded flex items-center justify-center">
              <motion.div
                className="w-6 h-6 md:w-7 md:h-7 border-2 border-[#4DB6AC]/60 rounded-full border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
          {/* IoT module */}
          <div className="w-1/5 bg-white/50 rounded-lg p-2 border border-gray-200/50">
            <div className="h-full bg-gray-800/90 rounded flex flex-col items-center justify-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#4DB6AC]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-gray-500 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="text-center mt-2 text-xs text-gray-400 font-medium tracking-wider uppercase">
        Фильтрация и IoT
      </div>
    </motion.div>
  );
}

export function EngineeringCore() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const activeHotspotData = hotspots.find(h => h.id === activeHotspot);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#4DB6AC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-[#4DB6AC]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4DB6AC]/10 border border-[#4DB6AC]/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#4DB6AC]" />
            <span className="text-sm font-medium text-[#4DB6AC]">Engineering Excellence</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Анатомия{" "}
            <span className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] bg-clip-text text-transparent">
              совершенства
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Каждый компонент BioCube спроектирован для создания идеальной экосистемы
          </p>
        </motion.div>

        {/* Main content - Desktop: 3 columns, Mobile: stacked */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Left column - info cards */}
          <div className="flex flex-col gap-6 items-end">
            {hotspots.filter((_, i) => i % 2 === 0).map((hotspot) => (
              <InfoCard
                key={hotspot.id}
                hotspot={hotspot}
                isVisible={activeHotspot === hotspot.id}
                side="left"
              />
            ))}
          </div>

          {/* Center - Aquarium */}
          <div className="w-[400px] flex flex-col items-center">
            <AquariumLayer type="top" isInView={isInView}>
              {hotspots.filter(h => h.layer === "top").map((hotspot) => (
                <PulsingHotspot
                  key={hotspot.id}
                  isActive={activeHotspot === hotspot.id}
                  onHover={() => setActiveHotspot(hotspot.id)}
                  onLeave={() => setActiveHotspot(null)}
                  position={hotspot.positionInLayer}
                />
              ))}
            </AquariumLayer>

            <AquariumLayer type="middle" isInView={isInView}>
              {hotspots.filter(h => h.layer === "middle").map((hotspot) => (
                <PulsingHotspot
                  key={hotspot.id}
                  isActive={activeHotspot === hotspot.id}
                  onHover={() => setActiveHotspot(hotspot.id)}
                  onLeave={() => setActiveHotspot(null)}
                  position={hotspot.positionInLayer}
                />
              ))}
            </AquariumLayer>

            <AquariumLayer type="bottom" isInView={isInView}>
              {hotspots.filter(h => h.layer === "bottom").map((hotspot) => (
                <PulsingHotspot
                  key={hotspot.id}
                  isActive={activeHotspot === hotspot.id}
                  onHover={() => setActiveHotspot(hotspot.id)}
                  onLeave={() => setActiveHotspot(null)}
                  position={hotspot.positionInLayer}
                />
              ))}
            </AquariumLayer>
          </div>

          {/* Right column - info cards */}
          <div className="flex flex-col gap-6 items-start">
            {hotspots.filter((_, i) => i % 2 === 1).map((hotspot) => (
              <InfoCard
                key={hotspot.id}
                hotspot={hotspot}
                isVisible={activeHotspot === hotspot.id}
                side="right"
              />
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          {/* Aquarium visualization */}
          <div className="flex flex-col items-center mb-10">
            <AquariumLayer type="top" isInView={isInView} />
            <AquariumLayer type="middle" isInView={isInView} />
            <AquariumLayer type="bottom" isInView={isInView} />
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4">
            {hotspots.map((hotspot, index) => (
              <MobileInfoCard key={hotspot.id} hotspot={hotspot} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom caption */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-gray-400">
            <span className="hidden md:inline">Наведите на точки для просмотра деталей • </span>
            Все компоненты производятся в Германии
          </p>
        </motion.div>
      </div>
    </section>
  );
}
