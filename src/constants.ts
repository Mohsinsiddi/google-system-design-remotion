// Google brand colors
export const G_BLUE = "#4285F4";
export const G_RED = "#EA4335";
export const G_YELLOW = "#FBBC05";
export const G_GREEN = "#34A853";

export const BG = "#0b0f1a";
export const SURFACE = "#161b27";
export const BORDER = "#2d3748";
export const TEXT = "#e2e8f0";
export const MUTED = "#718096";

// Video config
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene durations (frames at 30fps)
export const TITLE_DUR = 90;       // 3s
export const SCALE_DUR = 150;      // 5s
export const DNS_DUR = 180;        // 6s
export const LB_DUR = 150;         // 5s
export const CACHE_DUR = 150;      // 5s
export const DB_DUR = 180;         // 6s
export const SEARCH_DUR = 210;     // 7s
export const CDN_DUR = 150;        // 5s
export const OUTRO_DUR = 100;      // ~3.3s

export const TOTAL =
  TITLE_DUR + SCALE_DUR + DNS_DUR + LB_DUR +
  CACHE_DUR + DB_DUR + SEARCH_DUR + CDN_DUR + OUTRO_DUR;

// Helper: clamp interpolation
export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
