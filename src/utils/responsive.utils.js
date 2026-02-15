import React from "react";
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
  "3xl": 1600,
};

/**
 * Hook for responsive values
 */
export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: windowWidth < breakpoints.md,
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: windowWidth >= breakpoints.lg,
    width: windowWidth,
  };
};

/**
 * Responsive spacing classes
 */
export const spacing = {
  xs: "gap-2 sm:gap-3",
  sm: "gap-3 sm:gap-4 md:gap-6",
  md: "gap-4 sm:gap-6 md:gap-8",
  lg: "gap-6 sm:gap-8 md:gap-10 lg:gap-12",
  xl: "gap-8 sm:gap-10 md:gap-12 lg:gap-16",
};

/**
 * Responsive padding classes
 */
export const padding = {
  xs: "p-2 sm:p-3",
  sm: "p-3 sm:p-4 md:p-6",
  md: "p-4 sm:p-6 md:p-8",
  lg: "p-6 sm:p-8 md:p-10 lg:p-12",
  xl: "p-8 sm:p-10 md:p-12 lg:p-16",
};
