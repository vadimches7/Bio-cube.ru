import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Тип режима услуг
export type ServiceMode = "installation" | "service" | "decoration";

// Интерфейс контекста
interface ServiceModeContextType {
  mode: ServiceMode;
  setMode: (mode: ServiceMode) => void;
  isModeSelected: boolean; // Пользователь явно выбрал режим в модалке
  setModeSelected: () => void;
  suggestedMode: ServiceMode; // Режим из URL (для подсветки в модалке)
}

const ServiceModeContext = createContext<ServiceModeContextType | undefined>(undefined);

// Функция для получения режима из URL
function getModeFromURL(): ServiceMode {
  const params = new URLSearchParams(window.location.search);
  const urlMode = params.get("mode");
  if (urlMode === "installation" || urlMode === "service" || urlMode === "decoration") {
    return urlMode;
  }
  return "installation"; // По умолчанию
}

// Функция для получения UTM-параметров из URL
export function getUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  return utm;
}

// Функция для обновления URL без перезагрузки страницы
function updateURLMode(mode: ServiceMode) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  window.history.replaceState({}, "", url.toString());
}

export function ServiceModeProvider({ children }: { children: ReactNode }) {
  // Режим из URL при загрузке (для подсветки в модалке)
  const [suggestedMode] = useState<ServiceMode>(() => getModeFromURL());
  
  // Текущий активный режим
  const [mode, setModeState] = useState<ServiceMode>(() => getModeFromURL());
  
  // Флаг: пользователь явно выбрал режим (модалку можно закрыть)
  const [isModeSelected, setIsModeSelected] = useState(false);
  
  // Синхронизируем с URL при изменении истории браузера
  useEffect(() => {
    const handlePopState = () => {
      setModeState(getModeFromURL());
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  
  // Функция для установки режима с обновлением URL
  const setMode = (newMode: ServiceMode) => {
    setModeState(newMode);
    updateURLMode(newMode);
  };
  
  // Функция для подтверждения выбора режима
  const setModeSelected = () => {
    setIsModeSelected(true);
  };
  
  return (
    <ServiceModeContext.Provider value={{ 
      mode, 
      setMode, 
      isModeSelected, 
      setModeSelected,
      suggestedMode 
    }}>
      {children}
    </ServiceModeContext.Provider>
  );
}

export function useServiceMode() {
  const context = useContext(ServiceModeContext);
  if (!context) {
    throw new Error("useServiceMode must be used within ServiceModeProvider");
  }
  return context;
}
