import * as React from "react";

import { cn } from "@/lib/utils";

type BioCubeLogoProps = React.SVGProps<SVGSVGElement>;

/**
 * Minimal inline SVG logo used in header/footer.
 * Kept self-contained to avoid asset loading issues.
 */
export function BioCubeLogo({ className, ...props }: BioCubeLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* cube outline */}
      <path
        d="M32 6 52 16v32L32 58 12 48V16L32 6Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M12 16l20 10 20-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M32 26v32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* droplet accent */}
      <path
        d="M32 18c4.5 6.2 7.5 10 7.5 14.2A7.5 7.5 0 1 1 24.5 32.2C24.5 28 27.5 24.2 32 18Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M32 20.5c3.6 5.2 6 8.4 6 11.7a6 6 0 1 1-12 0c0-3.3 2.4-6.5 6-11.7Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

export default BioCubeLogo;
