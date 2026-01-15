import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Brain, Sun } from "lucide-react";

// Функция для генерации случайных колебаний
const fluctuate = (base: number, range: number): number => {
  return base + (Math.random() - 0.5) * range * 2;
};

// Генерация данных для sparkline
const generateSparklineData = (baseValue: number, range: number, points: number = 20): number[] => {
  const data: number[] = [];
  let current = baseValue;
  for (let i = 0; i < points; i++) {
    current = baseValue + (Math.random() - 0.5) * range * 2;
    data.push(current);
  }
  return data;
};

// Sparkline SVG компонент
function Sparkline({ data, color = "#4DB6AC", width = 60, height = 16 }: { 
  data: number[]; 
  color?: string; 
  width?: number; 
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60">
      <defs>
        <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={`url(#sparkGradient-${color})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        style={{ filter: `drop-shadow(0 0 2px ${color})` }}
      />
    </svg>
  );
}

// Glassmorphism Widget компонент
function GlassWidget({ 
  label, 
  value, 
  unit, 
  color, 
  sparkData,
  style,
}: { 
  label: string; 
  value: string; 
  unit?: string;
  color: string; 
  sparkData: number[];
  style?: React.CSSProperties;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="backdrop-blur-2xl rounded-lg sm:rounded-2xl px-2 sm:px-4 py-1.5 sm:py-3 border transition-all duration-300 cursor-default"
      style={{
        background: isHovered 
          ? 'rgba(255, 255, 255, 0.18)' 
          : 'rgba(255, 255, 255, 0.08)',
        borderColor: isHovered 
          ? 'rgba(255, 255, 255, 0.3)' 
          : 'rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered
          ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1), 0 0 20px ${color}40`
          : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
        <div 
          className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full animate-pulse"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}` 
          }} 
        />
        <span className="text-[8px] sm:text-[10px] text-white/60 font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5 sm:gap-1">
        <span className="text-base sm:text-2xl font-light text-white tabular-nums tracking-tight">{value}</span>
        {unit && <span className="text-[10px] sm:text-xs text-white/50">{unit}</span>}
      </div>
      <div className="mt-1 sm:mt-2 hidden sm:block">
        <Sparkline data={sparkData} color={color} width={70} height={14} />
      </div>
    </motion.div>
  );
}

export function NewHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Transform for parallax effect (inverse movement)
  const widget1X = useTransform(smoothMouseX, [-300, 300], [15, -15]);
  const widget1Y = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const widget2X = useTransform(smoothMouseX, [-300, 300], [12, -12]);
  const widget2Y = useTransform(smoothMouseY, [-300, 300], [8, -8]);
  const widget3X = useTransform(smoothMouseX, [-300, 300], [10, -10]);
  const widget3Y = useTransform(smoothMouseY, [-300, 300], [12, -12]);
  const widget4X = useTransform(smoothMouseX, [-300, 300], [8, -8]);
  const widget4Y = useTransform(smoothMouseY, [-300, 300], [15, -15]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Динамические параметры морского аквариума
  const [params, setParams] = useState({
    ph: 8.2,
    temp: 25.5,
    salinity: 35.0,
    orp: 380,
    kh: 8.5,
    ca: 430,
    mg: 1320,
  });

  // Sparkline data для каждого параметра
  const [sparkData, setSparkData] = useState({
    ph: generateSparklineData(8.2, 0.05),
    temp: generateSparklineData(25.5, 0.3),
    salinity: generateSparklineData(35.0, 0.3),
    orp: generateSparklineData(380, 10),
  });

  // Имитация живых данных с IoT-датчиков
  useEffect(() => {
    const interval = setInterval(() => {
      const newPh = fluctuate(8.2, 0.01);
      const newTemp = fluctuate(25.5, 0.05);
      const newSalinity = fluctuate(35.0, 0.1);
      const newOrp = fluctuate(380, 2);
      
      setParams({
        ph: newPh,
        temp: newTemp,
        salinity: newSalinity,
        orp: newOrp,
        kh: fluctuate(8.5, 0.05),
        ca: fluctuate(430, 2),
        mg: fluctuate(1320, 5),
      });

      // Update sparklines
      setSparkData(prev => ({
        ph: [...prev.ph.slice(1), newPh],
        temp: [...prev.temp.slice(1), newTemp],
        salinity: [...prev.salinity.slice(1), newSalinity],
        orp: [...prev.orp.slice(1), newOrp],
      }));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4DB6AC]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content - теперь первый на мобильных */}
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50/80 ring-1 ring-inset ring-amber-600/20 mb-6 shadow-sm"
            >
              <span className="text-sm">🏆</span>
              <span className="text-xs font-semibold tracking-wide text-amber-800">СЕРВИС ПРЕМИАЛЬНОЙ АКВАРИУМИСТИКИ №1 В&nbsp;РФ</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1] text-balance"
            >
              Верните природе{" "}
              <span className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] bg-clip-text text-transparent font-normal">
                контроль над&nbsp;вашим стрессом.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty"
            >
              Живая экосистема, которая не&nbsp;требует вашего времени. 
              Умные технологии и&nbsp;профессиональный сервис берут всю рутину на&nbsp;себя.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:opacity-90 text-white rounded-full px-5 sm:px-6 shadow-xl shadow-[#4DB6AC]/25 hover:shadow-2xl hover:shadow-[#4DB6AC]/30 transition-all hover:-translate-y-0.5"
              >
                Спроектировать экосистему
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-5 sm:px-6 border-border hover:bg-secondary/80 bg-transparent"
              >
                Смотреть демо
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
            >
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Влажность</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Оптимальный уровень</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Антистресс</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">98% эффективность</div>
              </div>
              <div className="flex flex-col items-center text-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 flex items-center justify-center mb-2 sm:mb-3">
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-[#4DB6AC]" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-foreground">Циркадный свет</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Синхронизация</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Aquarium Video with AR Overlay - теперь второй на мобильных */}
          <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-[#4DB6AC]/15">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto aspect-[4/3] object-cover"
                poster="/images/hero/aquarium-hero.jpg"
              >
                <source src="/video/video-2.mp4" type="video/mp4" />
                <img
                  src="/images/hero/aquarium-hero.jpg"
                  alt="Умный аквариум BioCube"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              </video>

              {/* Vignette overlay for depth */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
              }} />

              {/* pH Widget - Top Left with Parallax */}
              <motion.div 
                className="absolute top-2 sm:top-4 left-2 sm:left-4"
                style={{ x: widget1X, y: widget1Y }}
              >
                <GlassWidget
                  label="pH"
                  value={params.ph.toFixed(2)}
                  color="#4DB6AC"
                  sparkData={sparkData.ph}
                />
              </motion.div>

              {/* Temperature Widget - Top Right with Parallax */}
              <motion.div 
                className="absolute top-2 sm:top-4 right-2 sm:right-4"
                style={{ x: widget2X, y: widget2Y }}
              >
                <GlassWidget
                  label="Темп."
                  value={params.temp.toFixed(1)}
                  unit="°C"
                  color="#F97316"
                  sparkData={sparkData.temp}
                />
              </motion.div>

              {/* Salinity Widget - Middle Left with Parallax */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4"
                style={{ x: widget3X, y: widget3Y }}
              >
                <GlassWidget
                  label="Солен."
                  value={params.salinity.toFixed(1)}
                  unit="ppt"
                  color="#3B82F6"
                  sparkData={sparkData.salinity}
                />
              </motion.div>

              {/* ORP Widget - Middle Right with Parallax */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4"
                style={{ x: widget4X, y: widget4Y }}
              >
                <GlassWidget
                  label="ORP"
                  value={Math.round(params.orp).toString()}
                  unit="mV"
                  color="#A855F7"
                  sparkData={sparkData.orp}
                />
              </motion.div>

              {/* Bottom Status Pill - Floating Capsule */}
              <motion.div 
                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full backdrop-blur-2xl border"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderColor: 'rgba(77, 182, 172, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(77, 182, 172, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Pulsing indicator */}
                  <div className="relative flex-shrink-0">
                    <div 
                      className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#4DB6AC]"
                      style={{ boxShadow: '0 0 10px #4DB6AC, 0 0 20px #4DB6AC' }}
                    />
                    <div 
                      className="absolute inset-0 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#4DB6AC] animate-ping opacity-75"
                    />
                  </div>
                  
                  {/* Короткий текст на мобильных, полный на десктопе */}
                  <span className="text-[8px] sm:text-sm font-medium text-white/90 whitespace-nowrap">
                    <span className="sm:hidden">Online</span>
                    <span className="hidden sm:inline">BioCube OS: Online</span>
                  </span>
                  
                  {/* Mini metrics - только на больших экранах */}
                  <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-white/20">
                    <span className="text-[11px] text-white/60 tabular-nums">kH {params.kh.toFixed(1)}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[11px] text-white/60 tabular-nums">Ca {Math.round(params.ca)}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[11px] text-white/60 tabular-nums">Mg {Math.round(params.mg)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
