import { BG } from "../constants";

export const Background: React.FC<{ color?: string }> = ({ color = BG }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: color,
      overflow: "hidden",
    }}
  >
    {/* Dot grid */}
    <svg
      style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.06 }}
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#4285F4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>

    {/* Subtle radial gradient overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(66,133,244,0.06) 0%, transparent 70%)",
      }}
    />
  </div>
);
