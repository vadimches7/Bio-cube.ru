import { cn } from "@/lib/utils";

interface BioCubeLogoProps {
  className?: string;
}

/**
 * BioCubeLogo — лёгкий inline-SVG логотип (без внешних ассетов).
 * Если у вас есть финальный файл логотипа в `public/`, можно заменить на <img src="/logo.svg" ... />.
 */
export function BioCubeLogo({ className }: BioCubeLogoProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="bioCubeGrad" x1="10" y1="10" x2="86" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(var(--bio-green))" />
          <stop offset="1" stopColor="hsl(180 55% 35%)" />
        </linearGradient>
      </defs>

      {/* Hex-like outline */}
      <path
        d="M33 10h30c6 0 10 4 13 8l7 12c3 5 3 11 0 16l-7 12c-3 4-7 8-13 8H33c-6 0-10-4-13-8l-7-12c-3-5-3-11 0-16l7-12c3-4 7-8 13-8Z"
        stroke="url(#bioCubeGrad)"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Wave */}
      <path
        d="M16 55c10-8 20-10 32-6c10 3 19 3 32-4"
        stroke="url(#bioCubeGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Leaf */}
      <path
        d="M44 28c9 1 16 8 17 17c-9-1-16-8-17-17Z"
        fill="url(#bioCubeGrad)"
      />

      {/* Small bubble */}
      <circle cx="60.5" cy="38.5" r="3.5" fill="url(#bioCubeGrad)" />
    </svg>
  );
}






