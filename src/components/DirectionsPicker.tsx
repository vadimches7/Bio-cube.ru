import { cn } from "@/lib/utils";
import { BioCubeLogo } from "@/components/BioCubeLogo";
import type { DirectionConfig } from "@/lib/directions";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TEAM_MODAL_PHOTO_IMAGE } from "@/lib/brand";

type DirectionsPickerProps = {
  title: string;
  subtitle?: string;
  directions: DirectionConfig[];
  onPick: (direction: DirectionConfig) => void;
  /** Background image used ONLY in this picker instance (e.g. team photo for the modal). */
  backgroundImageSrc?: string;
  /** Banner image displayed above title (defaults to backgroundImageSrc). */
  bannerImageSrc?: string;
};

export function DirectionsPicker({
  title,
  subtitle,
  directions,
  onPick,
  backgroundImageSrc,
  bannerImageSrc, // kept for backward compatibility, not used by default layout
}: DirectionsPickerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-white/10 bg-black/25",
        "backdrop-blur-xl shadow-[0_0_110px_hsl(145_60%_45%/0.10)]",
      )}
    >
      {/* Emotional background */}
      {backgroundImageSrc ? (
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${backgroundImageSrc})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/80" aria-hidden="true" />

      {/* Accent glows (reduce “grey” feel) */}
      <div className="absolute -top-20 -left-24 w-[520px] h-[520px] bg-bio/18 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -right-28 w-[520px] h-[520px] bg-amber/16 rounded-full blur-3xl" aria-hidden="true" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <BioCubeLogo variant="svg" className="h-56 w-56 opacity-[0.10] blur-[0.2px]" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex flex-col items-center gap-3 mb-4">
            {/* Team photo (stretched to the top area) */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={TEAM_MODAL_PHOTO_IMAGE}
                alt="Команда Bio‑Cube"
                className="h-28 sm:h-32 md:h-44 lg:h-52 w-full object-cover object-[50%_30%]"
                loading="lazy"
                onError={(e) => {
                  // Hide broken image icon if the file is missing; keep layout clean.
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/45" aria-hidden="true" />
            </div>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        {/* Cards (vertical stack) */}
        <div className="grid gap-3 sm:gap-4 md:gap-6">
          {directions.map((d) => (
            <DirectionCard key={d.id} direction={d} onPick={onPick} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ direction, onPick }: { direction: DirectionConfig; onPick: (d: DirectionConfig) => void }) {
  const Icon = direction.icon;
  const tone = direction.tone ?? "bio";

  const toneClasses: Record<
    NonNullable<DirectionConfig["tone"]>,
    {
      accent: string;
      badgeBg: string;
      focusRing: string;
      borderIdle: string;
      borderHover: string;
      innerTint: string;
    }
  > = {
    bio: {
      accent: "text-bio",
      badgeBg: "bg-bio text-primary-foreground shadow-[0_0_40px_hsl(145_60%_45%/0.28)]",
      focusRing: "focus:ring-bio/45",
      borderIdle: "from-bio/25 via-white/10 to-transparent",
      borderHover: "from-bio/55 via-white/20 to-transparent",
      innerTint: "from-bio/12 via-white/8 to-white/[0.04]",
    },
    amber: {
      accent: "text-amber",
      badgeBg: "bg-amber text-primary-foreground shadow-[0_0_40px_hsl(38_90%_55%/0.28)]",
      focusRing: "focus:ring-amber/45",
      borderIdle: "from-amber/25 via-white/10 to-transparent",
      borderHover: "from-amber/55 via-white/20 to-transparent",
      innerTint: "from-amber/12 via-white/8 to-white/[0.04]",
    },
    neutral: {
      accent: "text-foreground/80",
      badgeBg: "bg-white/15 text-foreground shadow-[0_0_40px_rgba(255,255,255,0.10)]",
      focusRing: "focus:ring-white/25",
      borderIdle: "from-white/18 via-white/10 to-transparent",
      borderHover: "from-white/28 via-white/16 to-transparent",
      innerTint: "from-white/10 via-white/6 to-white/[0.04]",
    },
  };

  const t = toneClasses[tone];

  return (
    <button
      type="button"
      onClick={() => onPick(direction)}
      className={cn(
        "group relative h-full rounded-2xl p-[1px] text-left",
        "transition-all duration-300",
        "hover:-translate-y-1 active:translate-y-0",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black",
        t.focusRing,
      )}
    >
      {/* Gradient border layer */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br transition-opacity duration-300",
          direction.isRecommended ? t.borderHover : t.borderIdle,
          "opacity-80 group-hover:opacity-100",
        )}
        aria-hidden="true"
      />

      {/* Inner glass layer */}
      <div
        className={cn(
          "relative h-full rounded-2xl p-5 sm:p-6",
          "backdrop-blur-xl border border-white/10",
          "bg-gradient-to-br",
          t.innerTint,
          "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.35)]",
          "group-hover:border-white/18 transition-colors duration-300",
        )}
      >
      {/* Recommended */}
      {direction.isRecommended && (
        <div
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2",
            "px-3 py-1 rounded-full text-xs font-medium",
            "flex items-center gap-1.5",
            t.badgeBg,
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Рекомендуем
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl mb-4 flex items-center justify-center",
          "bg-white/10 border border-white/12",
          "group-hover:scale-110 transition-transform duration-300",
        )}
      >
        <Icon className={cn("h-6 w-6", t.accent)} />
      </div>

      {/* Title / subtitle */}
      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug mb-1 text-foreground">
        {direction.title}
      </h3>
      {direction.subtitle && <p className="text-sm text-muted-foreground leading-relaxed mb-3">{direction.subtitle}</p>}

      {/* Highlight */}
      {direction.highlight && (
        <div className="text-sm font-medium text-foreground/90 mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-black/20 border border-white/10">
            {direction.highlight}
          </span>
        </div>
      )}

      {/* Badges */}
      {direction.badges && direction.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {direction.badges.map((b) => (
            <span key={b} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-black/20 border border-white/10 text-foreground/80">
              {b}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/90">{direction.cta}</span>
        <ArrowRight className={cn("h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all", t.accent)} />
      </div>

      {/* Glass border highlight */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "ring-1 ring-inset ring-white/20",
        )}
        aria-hidden="true"
      />
      </div>
    </button>
  );
}


