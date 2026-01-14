import { useState } from "react";
import { Sparkles } from "lucide-react";

const tabs = [
  { id: "biohacking", label: "Биохакинг-сеты", badge: "Новое!" },
  { id: "biomes", label: "Готовые Биомы" },
  { id: "equipment", label: "Умное Оборудование" },
  { id: "inhabitants", label: "Обитатели" },
];

export function MarketplaceNav() {
  const [activeTab, setActiveTab] = useState("biohacking");

  return (
    <nav className="mb-12">
      <div className="flex gap-2 border-b border-border overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-6 py-4 text-sm font-medium transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-[#4DB6AC] border-b-2 border-[#4DB6AC]"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[#4DB6AC]/10 text-[#4DB6AC] rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
