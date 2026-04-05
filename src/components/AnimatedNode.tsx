import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BORDER, SURFACE } from "../constants";

interface NodeProps {
  x: number;
  y: number;
  label: string;
  icon?: string;
  color?: string;
  delay?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  sublabel?: string;
}

export const AnimatedNode: React.FC<NodeProps> = ({
  x,
  y,
  label,
  icon = "",
  color = "#4285F4",
  delay = 0,
  width = 160,
  height = 70,
  fontSize = 13,
  sublabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Glow */}
      <rect
        x={-width / 2 - 2}
        y={-height / 2 - 2}
        width={width + 4}
        height={height + 4}
        rx={12}
        fill={color}
        opacity={0.15}
        style={{ filter: "blur(8px)" }}
      />
      {/* Main box */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={10}
        fill={SURFACE}
        stroke={color}
        strokeWidth={1.5}
      />
      {/* Top accent bar */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={3}
        rx={10}
        fill={color}
        opacity={0.8}
      />
      {/* Icon + Label */}
      {icon && (
        <text
          y={sublabel ? -8 : 3}
          textAnchor="middle"
          fontSize={18}
          dominantBaseline="middle"
        >
          {icon}
        </text>
      )}
      <text
        y={icon ? (sublabel ? 6 : 14) : (sublabel ? -4 : 4)}
        textAnchor="middle"
        fill={color}
        fontSize={fontSize}
        fontWeight={700}
        fontFamily="'Courier New', monospace"
        dominantBaseline="middle"
      >
        {label}
      </text>
      {sublabel && (
        <text
          y={icon ? 20 : 12}
          textAnchor="middle"
          fill="#718096"
          fontSize={10}
          fontFamily="'Courier New', monospace"
          dominantBaseline="middle"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
};
