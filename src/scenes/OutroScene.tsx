import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

const TAKEAWAYS = [
  { icon: "🔍", label: "DNS + Anycast", desc: "Route to nearest PoP in <10ms", color: G_BLUE },
  { icon: "⚖️", label: "Maglev LB", desc: "L4+L7 with consistent hashing", color: G_RED },
  { icon: "⚡", label: "Multi-tier Cache", desc: "95%+ hit rate, never hit the DB", color: G_YELLOW },
  { icon: "🗄️", label: "Spanner + Bigtable", desc: "SQL + NoSQL + TrueTime", color: G_RED },
  { icon: "🕷️", label: "Search Pipeline", desc: "Offline index + online ranking", color: G_GREEN },
  { icon: "🌐", label: "Global CDN", desc: "200+ PoPs + private fiber", color: G_GREEN },
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <AbsoluteFill>
      <Background />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${titleProgress})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            marginBottom: 10,
          }}
        >
          {["G", "o", "o", "g", "l", "e"].map((ch, i) => (
            <span
              key={i}
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: [G_BLUE, G_RED, G_YELLOW, G_BLUE, G_GREEN, G_RED][i],
                fontFamily: "'Courier New', monospace",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <h2
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: 30,
            fontWeight: 800,
            fontFamily: "'Courier New', monospace",
          }}
        >
          System Design — Key Takeaways
        </h2>
      </div>

      {/* Takeaway grid */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {TAKEAWAYS.map(({ icon, label, desc, color }, i) => {
          const delay = i * 12;
          const progress = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 14, stiffness: 100 },
          });
          const opacity = interpolate(progress, [0, 0.4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(progress, [0, 1], [0.8, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: "#161b27",
                border: `1.5px solid ${color}44`,
                borderRadius: 14,
                padding: "24px 20px",
                opacity,
                transform: `scale(${scale})`,
                boxShadow: `0 0 20px ${color}22`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
              <div
                style={{
                  color: color,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Courier New', monospace",
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: "#718096",
                  fontSize: 13,
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            color: "#718096",
            fontSize: 16,
            fontFamily: "'Courier New', monospace",
            margin: 0,
          }}
        >
          Made with Remotion 4 · System Design Series
        </p>
      </div>
    </AbsoluteFill>
  );
};
