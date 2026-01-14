import { Card } from "@/components/ui/card";
import { Activity, Droplet, Sun } from "lucide-react";

export function BioScoreDashboard() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Card className="relative overflow-hidden backdrop-blur-2xl bg-card/80 border-border/50 shadow-2xl shadow-[#4DB6AC]/5 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4DB6AC]/5 via-transparent to-[#26A69A]/5 pointer-events-none" />

          <div className="relative p-8 md:p-12">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4DB6AC]/20 to-[#26A69A]/20 blur-2xl" />

                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-secondary"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#bioScoreGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${98 * 2.64} ${100 * 2.64}`}
                      className="drop-shadow-lg"
                    />
                    <defs>
                      <linearGradient id="bioScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4DB6AC" />
                        <stop offset="100%" stopColor="#26A69A" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-light text-foreground">98%</span>
                    <span className="text-sm font-medium text-muted-foreground mt-1">Отличное состояние</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mt-6">Био-индекс системы</h3>
                <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
                  Ваша экосистема процветает с отличным качеством воды и сбалансированными параметрами
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid sm:grid-cols-3 gap-4">
                  <MetricCard icon={<Droplet className="w-5 h-5" />} label="Чистота воды" value="99.2%" trend="+0.3%" />
                  <MetricCard icon={<Sun className="w-5 h-5" />} label="Циркадный ритм" value="94%" trend="+2.1%" />
                  <MetricCard icon={<Activity className="w-5 h-5" />} label="Биоактивность" value="Высокая" trend="Стабильно" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <WaveChart title="Чистота воды" subtitle="За последние 24 часа" color="primary" />
                  <WaveChart title="Синхронизация циркадного ритма" subtitle="Соответствие световому циклу" color="accent" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-secondary/50 border border-border/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4DB6AC]/10 to-[#26A69A]/10 flex items-center justify-center text-[#4DB6AC]">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs font-medium text-[#4DB6AC]">{trend}</span>
      </div>
    </div>
  );
}

function WaveChart({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: "primary" | "accent";
}) {
  const generateWavePath = () => {
    const points: string[] = [];
    for (let i = 0; i <= 100; i += 2) {
      const y = 50 + Math.sin(i * 0.08) * 20 + Math.sin(i * 0.15) * 10;
      points.push(`${i},${y}`);
    }
    return `M0,50 ${points.map((p) => `L${p}`).join(" ")}`;
  };

  const gradientId = `wave-${color}`;
  const strokeColor = color === "primary" ? "#4DB6AC" : "#26A69A";
  const gradientStart = color === "primary" ? "rgba(77,182,172,0.3)" : "rgba(38,166,154,0.3)";

  return (
    <div className="p-5 rounded-2xl bg-secondary/30 border border-border/30 backdrop-blur-sm">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>

      <div className="h-24 w-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <path d={`${generateWavePath()} L100,100 L0,100 Z`} fill={`url(#${gradientId})`} />
          <path
            d={generateWavePath()}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}

