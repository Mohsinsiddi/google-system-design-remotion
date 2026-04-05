import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedNode } from "../components/AnimatedNode";
import { Background } from "../components/Background";
import { FlowArrow } from "../components/FlowArrow";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

export const CDNScene: React.FC = () => {
  const frame = useCurrentFrame();

  const pulseT = Math.sin(frame * 0.12) * 0.5 + 0.5;
  const badgeOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="Global Infrastructure & CDN"
        subtitle="200+ PoPs · Private fiber · 35%+ of internet traffic"
        color={G_GREEN}
      />

      <svg
        viewBox="0 0 1760 680"
        style={{ position: "absolute", top: 160, left: 80, width: 1760, height: 680 }}
      >
        {/* User */}
        <AnimatedNode x={120} y={340} label="👤 User" color={G_GREEN} delay={0} width={120} height={60} />

        {/* CDN Edge Nodes */}
        <text x={280} y={60} fill="#718096" fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700} letterSpacing={2}>
          CDN EDGE (PoP — Point of Presence)
        </text>
        <AnimatedNode x={460} y={140} label="Edge — Mumbai" icon="📍" color={G_YELLOW} delay={15} sublabel="India PoP" />
        <AnimatedNode x={460} y={320} label="Edge — Singapore" icon="📍" color={G_YELLOW} delay={25} sublabel="SEA PoP" />
        <AnimatedNode x={460} y={500} label="Edge — Tokyo" icon="📍" color={G_YELLOW} delay={35} sublabel="Japan PoP" />

        <FlowArrow x1={180} y1={320} x2={360} y2={160} color={G_YELLOW} delay={20} label="nearest" />
        <FlowArrow x1={180} y1={340} x2={360} y2={320} color={G_GREEN} delay={30} label="anycast" />
        <FlowArrow x1={180} y1={360} x2={360} y2={490} color={G_YELLOW} delay={40} label="route" />

        {/* Google Private Backbone */}
        <text x={720} y={60} fill="#718096" fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700} letterSpacing={2}>
          GOOGLE PRIVATE BACKBONE
        </text>

        {/* Backbone node */}
        <rect
          x={720} y={80}
          width={280} height={540}
          rx={16}
          fill="#161b27"
          stroke={G_BLUE}
          strokeWidth={1.5}
          strokeDasharray="8,4"
          opacity={interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />

        <AnimatedNode x={860} y={180} label="B4 Network" icon="🔗" color={G_BLUE} delay={50} sublabel="SDN backbone" width={180} />
        <AnimatedNode x={860} y={340} label="Private Fiber" icon="🌐" color={G_BLUE} delay={60} sublabel="100+ Tbps capacity" width={180} />
        <AnimatedNode x={860} y={490} label="Submarine Cables" icon="🌊" color={G_BLUE} delay={70} sublabel="Owned + leased" width={200} />

        <FlowArrow x1={540} y1={140} x2={760} y2={180} color={G_YELLOW} delay={75} />
        <FlowArrow x1={540} y1={320} x2={760} y2={340} color={G_GREEN} delay={78} />
        <FlowArrow x1={540} y1={500} x2={760} y2={490} color={G_YELLOW} delay={81} />

        {/* Data Centers */}
        <text x={1090} y={60} fill="#718096" fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700} letterSpacing={2}>
          DATA CENTERS
        </text>
        <AnimatedNode x={1280} y={160} label="DC — US-EAST" icon="🏢" color={G_RED} delay={85} sublabel="Virginia" width={180} />
        <AnimatedNode x={1280} y={320} label="DC — EUROPE" icon="🏢" color={G_RED} delay={92} sublabel="Belgium / Netherlands" width={200} />
        <AnimatedNode x={1280} y={480} label="DC — APAC" icon="🏢" color={G_RED} delay={99} sublabel="Singapore / Taiwan" width={200} />

        <FlowArrow x1={955} y1={180} x2={1175} y2={170} color={G_RED} delay={106} />
        <FlowArrow x1={955} y1={340} x2={1175} y2={325} color={G_RED} delay={109} />
        <FlowArrow x1={955} y1={490} x2={1175} y2={478} color={G_RED} delay={112} />

        {/* Pulsing indicator */}
        <circle
          cx={860} cy={340} r={5 + pulseT * 8}
          fill="none"
          stroke={G_BLUE}
          strokeWidth={1.5}
          opacity={0.4 * (1 - pulseT)}
        />

        {/* Stats badge */}
        <g opacity={badgeOpacity}>
          <rect x={1450} y={200} width={230} height={140} rx={12} fill="#161b27" stroke={G_GREEN} strokeWidth={1.5} />
          <text x={1565} y={228} textAnchor="middle" fill={G_GREEN} fontSize={12} fontFamily="'Courier New', monospace" fontWeight={700}>
            CDN STATS
          </text>
          <text x={1565} y={252} textAnchor="middle" fill="#e2e8f0" fontSize={20} fontFamily="'Courier New', monospace" fontWeight={900}>
            200+ PoPs
          </text>
          <text x={1565} y={275} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            {">"} 100 countries
          </text>
          <text x={1565} y={295} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            35%+ internet traffic
          </text>
          <text x={1565} y={315} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Private B4 SDN backbone
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
