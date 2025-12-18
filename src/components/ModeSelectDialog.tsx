import { useEffect, useCallback } from "react";
import { useServiceMode, ServiceMode } from "@/contexts/ServiceModeContext";
import { useNavigate } from "react-router-dom";
import { DIRECTIONS } from "@/lib/directions";
import type { DirectionConfig } from "@/lib/directions";
import { DirectionsPicker } from "@/components/DirectionsPicker";

/**
 * ModeSelectDialog - Модальное окно выбора режима услуг
 * 
 * Показывается ВСЕГДА при открытии сайта.
 * Закрыть можно ТОЛЬКО выбором одного из режимов.
 * Без крестика, без клика по фону, без Esc.
 * 
 * Если в URL есть ?mode=, соответствующая карточка подсвечивается как "рекомендуем".
 */
export function ModeSelectDialog() {
  const { setMode, setModeSelected, isModeSelected, suggestedMode } = useServiceMode();
  const navigate = useNavigate();

  // Блокировка закрытия по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Блокируем Escape только пока модалка открыта
      if (!isModeSelected && e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isModeSelected]);

  // Блокировка скролла body пока модалка открыта
  useEffect(() => {
    if (!isModeSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModeSelected]);

  const handleSelectMode = useCallback(
    (mode: ServiceMode) => {
      setMode(mode);
      setModeSelected();
    },
    [setMode, setModeSelected],
  );

  const handlePickDirection = useCallback(
    (direction: DirectionConfig) => {
      if (direction.kind === "mode" && direction.mode) {
        handleSelectMode(direction.mode);
        return;
      }
      if (direction.kind === "route" && direction.href) {
        setModeSelected();
        navigate(direction.href);
      }
    },
    [handleSelectMode, navigate, setModeSelected],
  );

  // Если режим уже выбран, ничего не рендерим
  if (isModeSelected) return null;

  const directions = DIRECTIONS.map((d) => ({
    ...d,
    // Default “recommended” is defined in config; additionally, if URL suggests a mode,
    // we can highlight it ONLY when config doesn't already mark something as recommended.
    isRecommended:
      d.isRecommended ??
      (DIRECTIONS.every((x) => !x.isRecommended) && d.kind === "mode" && d.mode === suggestedMode),
  }));

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="mode-select-title" className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Overlay - блокирует фон, нет клика для закрытия */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />
      
      {/* Декоративные свечения на фоне */}
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-bio/10 rounded-full blur-[100px] animate-float" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-amber/10 rounded-full blur-[100px] animate-float delay-2" />
      
      {/* Контент модалки */}
      <div className="relative z-10 min-h-full flex items-start justify-center py-8 sm:py-10">
        <div className="w-full max-w-5xl mx-4 animate-scale-in">
          <DirectionsPicker
            title="С чем мы можем Вам помочь?"
            subtitle="Выберите направление — мы подскажем следующий шаг и аккуратно проведём к заявке."
            directions={directions}
            onPick={handlePickDirection}
            // Keep overall background dark (no team photo behind cards)
            backgroundImageSrc={undefined}
          />
        </div>
      </div>
    </div>
  );
}
