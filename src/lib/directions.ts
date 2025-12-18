import type { ServiceMode } from "@/contexts/ServiceModeContext";
import type { LucideIcon } from "lucide-react";
import { Droplets, Wrench, Palette, ShieldCheck, Beaker, Sparkles } from "lucide-react";

export type DirectionKind = "mode" | "route";

export type DirectionId = "installation" | "service" | "decor";

export type DirectionTone = "bio" | "amber" | "neutral";

export type DirectionConfig = {
  id: DirectionId;
  kind: DirectionKind;
  title: string;
  subtitle?: string;
  highlight?: string;
  badges?: string[];
  cta: string;
  icon: LucideIcon;
  tone?: DirectionTone;
  /**
   * Visual hint; not tied to ServiceMode.
   */
  isRecommended?: boolean;

  /** kind === "mode" */
  mode?: ServiceMode;
  /** kind === "route" */
  href?: string;
};

/**
 * Deprecated: background is controlled by `ModeSelectDialog` → `DirectionsPicker`
 * so the team photo can be used ONLY inside that modal window.
 *
 * Kept temporarily to avoid breaking imports; do not rely on it.
 */
export const DIRECTIONS_BG_IMAGE = "/placeholder.svg";

/**
 * Single source of truth for “directions” cards.
 * Add a 4th direction by appending a new object to this array.
 */
export const DIRECTIONS: DirectionConfig[] = [
  {
    id: "installation",
    kind: "mode",
    mode: "installation",
    title: "Установка аквариума под ключ",
    highlight: "Проект → производство → запуск",
    badges: ["Под интерьер", "С гарантией"],
    cta: "Рассчитать проект",
    icon: Droplets,
    tone: "bio",
  },
  {
    id: "service",
    kind: "mode",
    mode: "service",
    title: "Обслуживание аквариума",
    subtitle: "Поддержка / спасение / регулярный сервис",
    badges: ["Выезд за 24ч", "Анализ воды"],
    cta: "Вызвать специалиста",
    icon: Wrench,
    tone: "amber",
    isRecommended: true,
  },
  {
    id: "decor",
    kind: "route",
    href: "/decor",
    title: "Декорирование аквариумов",
    subtitle: "Декорирование и художественные композиции",
    badges: ["Стили", "Кастомные решения"],
    cta: "Смотреть декоры",
    icon: Palette,
    tone: "bio",
  },
];

/**
 * Small set of “premium” micro-badges used inside the picker header.
 * Kept here to avoid hardcoding in the component.
 */
export const DIRECTIONS_META_BADGES: { icon: LucideIcon; text: string }[] = [
  { icon: ShieldCheck, text: "Экспертность и контроль" },
  { icon: Beaker, text: "Точные решения, без лишнего" },
  { icon: Sparkles, text: "Премиально — без перегруза" },
];


