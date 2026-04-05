import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedNode } from "../components/AnimatedNode";
import { Background } from "../components/Background";
import { FlowArrow } from "../components/FlowArrow";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

export const DNSScene: React.FC = () => {
  const frame = useCurrentFrame();

  const infoOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Packet animation progress (loops)
  const packetT = (frame % 60) / 60;

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="DNS & Load Balancing"
        subtitle="Routing 8.5B queries to the right server"
        color={G_BLUE}
      />

      {/* SVG Diagram */}
      <svg
        viewBox="0 0 1760 700"
        style={{ position: "absolute", top: 160, left: 80, width: 1760, height: 700 }}
      >
        {/* ── Row 1: User → DNS → LB ── */}

        {/* User */}
        <AnimatedNode x={120} y={180} label="👤 User" color={G_GREEN} delay={5} width={120} height={60} />

        {/* DNS Resolver */}
        <AnimatedNode x={360} y={180} label="DNS Resolver" icon="🔍" color={G_BLUE} delay={15} sublabel="ISP / 8.8.8.8" />

        {/* Arrows: User → DNS */}
        <FlowArrow x1={180} y1={180} x2={280} y2={180} color={G_BLUE} delay={20} label="query" />
        <FlowArrow x1={280} y1={195} x2={180} y2={195} color={G_GREEN} delay={50} label="IP" />

        {/* Google NS */}
        <AnimatedNode x={620} y={180} label="Google NS" icon="📡" color={G_YELLOW} delay={25} sublabel="Authoritative DNS" />
        <FlowArrow x1={440} y1={180} x2={540} y2={180} color={G_BLUE} delay={30} label="query" />
        <FlowArrow x1={540} y1={195} x2={440} y2={195} color={G_YELLOW} delay={55} label="anycast IP" />

        {/* Anycast LB */}
        <AnimatedNode x={920} y={180} label="Load Balancer" icon="⚖️" color={G_RED} delay={35} sublabel="Maglev / Anycast" width={180} />
        <FlowArrow x1={700} y1={180} x2={820} y2={180} color={G_YELLOW} delay={60} />

        {/* ── Row 2: LB → Web Servers ── */}
        <AnimatedNode x={1260} y={80} label="Web Server 1" icon="🖥️" color={G_BLUE} delay={65} sublabel="GWS" />
        <AnimatedNode x={1260} y={220} label="Web Server 2" icon="🖥️" color={G_BLUE} delay={75} sublabel="GWS" />
        <AnimatedNode x={1260} y={360} label="Web Server 3" icon="🖥️" color={G_BLUE} delay={85} sublabel="GWS" />

        <FlowArrow x1={1010} y1={160} x2={1160} y2={90} color={G_RED} delay={90} />
        <FlowArrow x1={1010} y1={180} x2={1160} y2={220} color={G_RED} delay={95} />
        <FlowArrow x1={1010} y1={200} x2={1160} y2={355} color={G_RED} delay={100} />

        {/* Animated packet */}
        {frame > 60 && (
          <circle
            cx={180 + (920 - 180) * packetT}
            cy={180}
            r={7}
            fill={G_GREEN}
            opacity={0.9}
            style={{ filter: `drop-shadow(0 0 6px ${G_GREEN})` }}
          />
        )}

        {/* ── Info panel ── */}
        <g opacity={infoOpacity}>
          {/* Health check badge */}
          <rect x={860} y={290} width={220} height={80} rx={10} fill="#161b27" stroke={G_RED} strokeWidth={1} />
          <text x={970} y={318} textAnchor="middle" fill={G_RED} fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700}>
            MAGLEV LB
          </text>
          <text x={970} y={338} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            L4 + L7 balancing
          </text>
          <text x={970} y={355} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Consistent hashing
          </text>

          {/* DNS info */}
          <rect x={240} y={290} width={220} height={80} rx={10} fill="#161b27" stroke={G_BLUE} strokeWidth={1} />
          <text x={350} y={318} textAnchor="middle" fill={G_BLUE} fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700}>
            ANYCAST DNS
          </text>
          <text x={350} y={338} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Routes to nearest PoP
          </text>
          <text x={350} y={355} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Sub-10ms resolution
          </text>
        </g>
      </svg>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          display: "flex",
          gap: 32,
          opacity: infoOpacity,
        }}
      >
        {[
          { color: G_BLUE, label: "DNS Layer" },
          { color: G_RED, label: "Load Balancing" },
          { color: G_GREEN, label: "Data Flow" },
        ].map(({ color, label }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 24,
                height: 3,
                backgroundColor: color,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                color: "#718096",
                fontSize: 13,
                fontFamily: "'Courier New', monospace",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
