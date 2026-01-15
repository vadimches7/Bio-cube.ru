import { useState, useEffect } from "react";
import { Activity, Droplets, Thermometer, Wifi, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntelligentCore() {
  const [phValue, setPhValue] = useState(7.2);
  const [tempValue, setTempValue] = useState(26);

  // Animate values slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setPhValue(7.2 + (Math.random() - 0.5) * 0.1);
      setTempValue(26 + (Math.random() - 0.5) * 0.5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    "IoT-сенсоры: pH, температура, жёсткость в реальном времени",
    "Push-уведомления вам и нашим биологам",
    "История параметров и аналитика",
    "Профессиональное сервисное обслуживание",
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0a0f0f] via-[#0d1212] to-[#0a0f0f] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4DB6AC]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#2DD4BF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: iPhone with Neon Glow */}
          <div className="relative flex justify-center">
            {/* Phone glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[320px] h-[600px] bg-[#4DB6AC]/20 rounded-[60px] blur-[60px]" />
            </div>

            {/* iPhone frame with neon border */}
            <div
              className="relative w-[280px] rounded-[45px] p-[2px]"
              style={{
                background: "linear-gradient(135deg, #4DB6AC 0%, #0d1212 40%, #0d1212 60%, #2DD4BF 100%)",
                boxShadow: "0 0 40px rgba(77, 182, 172, 0.3), 0 0 80px rgba(77, 182, 172, 0.1)",
              }}
            >
              <div className="bg-[#0d1212] rounded-[43px] p-4">
                {/* Screen */}
                <div className="bg-gradient-to-b from-[#111818] to-[#0d1212] rounded-[35px] overflow-hidden">
                  <div className="p-6">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-400 text-xs font-medium">BioCube OS</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#4DB6AC] animate-pulse" />
                        <span className="text-[#4DB6AC] text-xs">Online</span>
                      </div>
                    </div>

                    {/* Aquarium name */}
                    <div className="mb-6">
                      <h3 className="text-white text-lg font-medium">Панорама 100L</h3>
                    </div>

                    {/* Parameter cards with glow */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {/* pH Card */}
                      <div
                        className="bg-[#1a2222] rounded-2xl p-4 border border-[#4DB6AC]/20"
                        style={{
                          boxShadow: "0 0 20px rgba(77, 182, 172, 0.1), inset 0 1px 0 rgba(77, 182, 172, 0.1)",
                        }}
                      >
                        <div className="text-gray-400 text-xs mb-2">pH</div>
                        <div className="text-[#4DB6AC] text-2xl font-light">{phValue.toFixed(1)}</div>
                        <div className="mt-2 h-1 bg-[#0d1212] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#4DB6AC] to-[#2DD4BF] rounded-full"
                            style={{ width: "70%", boxShadow: "0 0 10px #4DB6AC" }}
                          />
                        </div>
                      </div>

                      {/* Temperature Card */}
                      <div
                        className="bg-[#1a2222] rounded-2xl p-4 border border-[#4DB6AC]/20"
                        style={{
                          boxShadow: "0 0 20px rgba(77, 182, 172, 0.1), inset 0 1px 0 rgba(77, 182, 172, 0.1)",
                        }}
                      >
                        <div className="text-gray-400 text-xs mb-2">Температура</div>
                        <div className="text-[#4DB6AC] text-2xl font-light">{tempValue.toFixed(0)}°C</div>
                        <div className="mt-2 h-1 bg-[#0d1212] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#4DB6AC] to-[#2DD4BF] rounded-full"
                            style={{ width: "85%", boxShadow: "0 0 10px #4DB6AC" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Graph card */}
                    <div
                      className="bg-[#1a2222] rounded-2xl p-4 mb-6 border border-[#4DB6AC]/10"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(77, 182, 172, 0.05)",
                      }}
                    >
                      <div className="text-gray-400 text-xs mb-3">Параметры воды (7 дней)</div>
                      {/* Mini chart */}
                      <svg className="w-full h-16" viewBox="0 0 200 50" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#4DB6AC" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,35 Q20,30 40,32 T80,28 T120,30 T160,25 T200,28"
                          fill="none"
                          stroke="#4DB6AC"
                          strokeWidth="2"
                          style={{ filter: "drop-shadow(0 0 6px #4DB6AC)" }}
                        />
                        <path
                          d="M0,35 Q20,30 40,32 T80,28 T120,30 T160,25 T200,28 L200,50 L0,50 Z"
                          fill="url(#chartGlow)"
                        />
                      </svg>
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[#1a2222] rounded-xl p-3 text-center border border-[#4DB6AC]/10">
                        <Activity className="w-5 h-5 text-[#4DB6AC] mx-auto mb-1" />
                        <span className="text-gray-400 text-[10px]">Мониторинг pH</span>
                      </div>
                      <div className="flex-1 bg-[#1a2222] rounded-xl p-3 text-center border border-[#4DB6AC]/10">
                        <Droplets className="w-5 h-5 text-[#4DB6AC] mx-auto mb-1" />
                        <span className="text-gray-400 text-[10px]">Контроль воды</span>
                      </div>
                      <div className="flex-1 bg-[#1a2222] rounded-xl p-3 text-center border border-[#4DB6AC]/10">
                        <Wifi className="w-5 h-5 text-[#4DB6AC] mx-auto mb-1" />
                        <span className="text-gray-400 text-[10px]">Умные уведомлен</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-[#4DB6AC]/30"
              style={{
                background: "linear-gradient(135deg, rgba(77, 182, 172, 0.1), transparent)",
                boxShadow: "0 0 20px rgba(77, 182, 172, 0.1)",
              }}
            >
              <Activity className="w-4 h-4 text-[#4DB6AC]" />
              <span className="text-sm text-[#4DB6AC] font-medium">BioCube OS Dashboard</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Технологии на&nbsp;страже{" "}
              <span
                className="bg-gradient-to-r from-[#4DB6AC] via-[#2DD4BF] to-[#06B6D4] bg-clip-text text-transparent"
                style={{ textShadow: "0 0 40px rgba(77, 182, 172, 0.5)" }}
              >
                баланса
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              BioCube OS мониторит 12&nbsp;параметров воды 24/7. Вы&nbsp;видите статус в&nbsp;приложении, 
              а&nbsp;наши биологи получают уведомления и&nbsp;поддерживают здоровье экосистемы.
            </p>

            {/* Features list */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full bg-[#4DB6AC]/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ boxShadow: "0 0 10px rgba(77, 182, 172, 0.3)" }}
                  >
                    <Check className="w-3.5 h-3.5 text-[#4DB6AC]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              className="px-8 py-6 text-base rounded-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:from-[#45a399] hover:to-[#1e8a82] text-white"
              style={{
                boxShadow: "0 0 30px rgba(77, 182, 172, 0.4), 0 10px 40px rgba(77, 182, 172, 0.2)",
              }}
            >
              Попробовать демо
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
