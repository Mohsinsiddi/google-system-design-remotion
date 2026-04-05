import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedNode } from "../components/AnimatedNode";
import { Background } from "../components/Background";
import { FlowArrow } from "../components/FlowArrow";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

export const DatabaseScene: React.FC = () => {
  const frame = useCurrentFrame();

  const infoOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="Database Layer"
        subtitle="Google's proprietary storage stack — built for planet scale"
        color={G_RED}
      />

      <svg
        viewBox="0 0 1760 680"
        style={{ position: "absolute", top: 165, left: 80, width: 1760, height: 680 }}
      >
        {/* App Servers */}
        <AnimatedNode x={160} y={250} label="App Server" icon="⚙️" color={G_BLUE} delay={0} sublabel="Business logic" />

        {/* Spanner - globally distributed relational */}
        <AnimatedNode x={560} y={120} label="Cloud Spanner" icon="🌐" color={G_YELLOW} delay={20} sublabel="Global SQL + ACID" width={190} />

        {/* Bigtable - wide-column NoSQL */}
        <AnimatedNode x={560} y={280} label="Bigtable" icon="📊" color={G_RED} delay={30} sublabel="Wide-column NoSQL" width={190} />

        {/* Colossus - distributed FS */}
        <AnimatedNode x={560} y={440} label="Colossus" icon="💿" color={G_GREEN} delay={40} sublabel="Distributed filesystem" width={190} />

        {/* Arrows from App Server */}
        <FlowArrow x1={240} y1={230} x2={460} y2={135} color={G_YELLOW} delay={25} label="SQL" />
        <FlowArrow x1={240} y1={250} x2={460} y2={280} color={G_RED} delay={35} label="KV" />
        <FlowArrow x1={240} y1={270} x2={460} y2={435} color={G_GREEN} delay={45} label="files" dashed />

        {/* Shards */}
        <AnimatedNode x={960} y={120} label="Shard A" icon="🔷" color={G_YELLOW} delay={55} width={130} height={55} />
        <AnimatedNode x={960} y={220} label="Shard B" icon="🔷" color={G_YELLOW} delay={60} width={130} height={55} />
        <AnimatedNode x={960} y={320} label="Shard C" icon="🔷" color={G_YELLOW} delay={65} width={130} height={55} />

        <FlowArrow x1={655} y1={100} x2={880} y2={120} color={G_YELLOW} delay={70} />
        <FlowArrow x1={655} y1={120} x2={880} y2={220} color={G_YELLOW} delay={72} />
        <FlowArrow x1={655} y1={140} x2={880} y2={320} color={G_YELLOW} delay={74} />

        {/* Replicas */}
        <AnimatedNode x={1260} y={100} label="Replica (US)" color={G_BLUE} delay={85} width={150} height={55} />
        <AnimatedNode x={1260} y={220} label="Replica (EU)" color={G_BLUE} delay={90} width={150} height={55} />
        <AnimatedNode x={1260} y={340} label="Replica (APAC)" color={G_BLUE} delay={95} width={160} height={55} />

        <FlowArrow x1={1025} y1={120} x2={1180} y2={110} color={G_BLUE} delay={100} label="sync" dashed />
        <FlowArrow x1={1025} y1={220} x2={1180} y2={220} color={G_BLUE} delay={103} label="sync" dashed />
        <FlowArrow x1={1025} y1={320} x2={1180} y2={340} color={G_BLUE} delay={106} label="sync" dashed />

        {/* Spanner TrueTime badge */}
        <g opacity={infoOpacity}>
          <rect x={400} y={530} width={260} height={90} rx={10} fill="#161b27" stroke={G_YELLOW} strokeWidth={1.5} />
          <text x={530} y={558} textAnchor="middle" fill={G_YELLOW} fontSize={12} fontFamily="'Courier New', monospace" fontWeight={700}>
            TRUETIME API
          </text>
          <text x={530} y={578} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Atomic clocks + GPS satellites
          </text>
          <text x={530} y={596} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            External consistency globally
          </text>
        </g>

        {/* Bigtable badge */}
        <g opacity={infoOpacity}>
          <rect x={800} y={410} width={240} height={90} rx={10} fill="#161b27" stroke={G_RED} strokeWidth={1.5} />
          <text x={920} y={438} textAnchor="middle" fill={G_RED} fontSize={12} fontFamily="'Courier New', monospace" fontWeight={700}>
            BIGTABLE SCALE
          </text>
          <text x={920} y={458} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Petabytes of data
          </text>
          <text x={920} y={476} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Millions of rows/sec
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
