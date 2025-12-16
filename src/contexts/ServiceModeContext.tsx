import { createContext, useContext, useState, ReactNode } from "react";

type ServiceMode = "installation" | "service";

interface ServiceModeContextType {
  mode: ServiceMode;
  setMode: (mode: ServiceMode) => void;
}

const ServiceModeContext = createContext<ServiceModeContextType | undefined>(undefined);

export function ServiceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ServiceMode>("installation");
  
  return (
    <ServiceModeContext.Provider value={{ mode, setMode }}>
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
