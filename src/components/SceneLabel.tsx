import { interpolate, useCurrentFrame } from "remotion";
import { G_BLUE } from "../constants";

interface SceneLabelProps {
  title: string;
  subtitle?: string;
  color?: string;
}

export const SceneLabel: React.FC<SceneLabelProps> = ({
  title,
  subtitle,
  color = G_BLUE,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 80,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 4,
            height: 28,
            backgroundColor: color,
            borderRadius: 2,
          }}
        />
        <span
          style={{
            color: color,
            fontSize: 13,
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          System Design
        </span>
      </div>
      <h2
        style={{
          margin: 0,
          color: "#e2e8f0",
          fontSize: 34,
          fontWeight: 800,
          fontFamily: "'Courier New', monospace",
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: "6px 0 0",
            color: "#718096",
            fontSize: 15,
            fontFamily: "'Courier New', monospace",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
