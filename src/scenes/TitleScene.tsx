import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

const GOOGLE_LETTERS = [
  { ch: "G", color: G_BLUE },
  { ch: "o", color: G_RED },
  { ch: "o", color: G_YELLOW },
  { ch: "g", color: G_BLUE },
  { ch: "l", color: G_GREEN },
  { ch: "e", color: G_RED },
];

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const subtitleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [55, 85], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Google Logo Letters */}
        <div
          style={{
            display: "flex",
            gap: 4,
            transform: `scale(${titleProgress})`,
            marginBottom: 24,
          }}
        >
          {GOOGLE_LETTERS.map(({ ch, color }, i) => {
            const delay = i * 5;
            const letterProgress = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 10, stiffness: 120 },
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 100,
                  fontWeight: 900,
                  color,
                  fontFamily: "'Courier New', monospace",
                  lineHeight: 1,
                  textShadow: `0 0 40px ${color}55`,
                  transform: `scale(${letterProgress})`,
                  display: "inline-block",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, ${G_BLUE}, ${G_GREEN})`,
            borderRadius: 1,
            marginBottom: 24,
          }}
        />

        {/* System Design */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#e2e8f0",
              fontSize: 56,
              fontWeight: 800,
              margin: 0,
              fontFamily: "'Courier New', monospace",
              letterSpacing: -1,
            }}
          >
            System Design
          </h1>
        </div>

        {/* Tagline */}
        <p
          style={{
            opacity: taglineOpacity,
            color: "#718096",
            fontSize: 20,
            margin: "16px 0 0",
            fontFamily: "'Courier New', monospace",
            letterSpacing: 1,
          }}
        >
          How Google Serves 8.5 Billion Searches Per Day
        </p>
      </AbsoluteFill>

      {/* Corner badge */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 80,
          opacity: taglineOpacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: G_GREEN,
            boxShadow: `0 0 12px ${G_GREEN}`,
          }}
        />
        <span
          style={{
            color: "#718096",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
          }}
        >
          DEEP DIVE
        </span>
      </div>
    </AbsoluteFill>
  );
};
