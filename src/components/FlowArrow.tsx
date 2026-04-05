import { interpolate, useCurrentFrame } from "remotion";

interface FlowArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  delay?: number;
  label?: string;
  dashed?: boolean;
  curved?: boolean;
}

export const FlowArrow: React.FC<FlowArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = "#4285F4",
  delay = 0,
  label,
  dashed = false,
  curved = false,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(Math.max(0, frame - delay), [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Curve control point
  const cx = (x1 + x2) / 2 + (curved ? -40 : 0);
  const cy = (y1 + y2) / 2 + (curved ? -40 : 0);

  const pathD = curved
    ? `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y2}`;

  const approxLength = curved ? length * 1.15 : length;

  // Midpoint for label
  const midX = curved ? cx : (x1 + x2) / 2;
  const midY = curved ? cy - 10 : (y1 + y2) / 2 - 10;

  const arrowOpacity = interpolate(Math.max(0, frame - delay), [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow head direction
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <g opacity={progress}>
      <defs>
        <marker
          id={`arrow-${x1}-${y1}-${x2}-${y2}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "6,4" : "none"}
        strokeDashoffset={dashed ? 0 : undefined}
        markerEnd={`url(#arrow-${x1}-${y1}-${x2}-${y2})`}
        opacity={0.8}
        style={{
          strokeDasharray: `${approxLength}`,
          strokeDashoffset: `${approxLength * (1 - progress)}`,
        }}
      />
      {label && progress > 0.5 && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          fill={color}
          fontSize={10}
          fontFamily="'Courier New', monospace"
          opacity={interpolate(progress, [0.5, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          {label}
        </text>
      )}
    </g>
  );
};
