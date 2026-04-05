import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

const STATS = [
  { value: "8.5B", label: "Searches per day", color: G_BLUE, delay: 10 },
  { value: "99.999%", label: "Uptime SLA", color: G_GREEN, delay: 25 },
  { value: "<100ms", label: "Avg. response time", color: G_YELLOW, delay: 40 },
  { value: "200+", label: "Countries served", color: G_RED, delay: 55 },
];

const CHALLENGES = [
  "→  How do you handle millions of concurrent requests?",
  "→  How do you keep data consistent globally?",
  "→  How do you stay fast at planetary scale?",
];

export const ScaleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="The Scale Problem"
        subtitle="Understanding what Google needs to handle"
        color={G_RED}
      />

      {/* Stats grid */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 24,
        }}
      >
        {STATS.map(({ value, label, color, delay }, i) => {
          const progress = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 14, stiffness: 100 },
          });
          const opacity = interpolate(progress, [0, 0.4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(progress, [0, 1], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: "#161b27",
                border: `1.5px solid ${color}44`,
                borderRadius: 16,
                padding: "32px 24px",
                textAlign: "center",
                opacity,
                transform: `scale(${scale})`,
                boxShadow: `0 0 30px ${color}22`,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color,
                  fontFamily: "'Courier New', monospace",
                  textShadow: `0 0 24px ${color}77`,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  color: "#718096",
                  fontSize: 14,
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge list */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 80,
          right: 80,
        }}
      >
        <div
          style={{
            color: "#718096",
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 2,
            marginBottom: 16,
            opacity: interpolate(frame, [80, 100], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          THE CHALLENGES
        </div>
        {CHALLENGES.map((text, i) => {
          const delay = 90 + i * 15;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [delay, delay + 20], [-20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                color: "#e2e8f0",
                fontSize: 20,
                fontFamily: "'Courier New', monospace",
                marginBottom: 12,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
