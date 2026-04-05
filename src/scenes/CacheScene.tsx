import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedNode } from "../components/AnimatedNode";
import { Background } from "../components/Background";
import { FlowArrow } from "../components/FlowArrow";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

export const CacheScene: React.FC = () => {
  const frame = useCurrentFrame();

  const hitOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="Caching Layer"
        subtitle="Serving 95%+ traffic from cache — never touch the DB"
        color={G_YELLOW}
      />

      <svg
        viewBox="0 0 1760 680"
        style={{ position: "absolute", top: 165, left: 80, width: 1760, height: 680 }}
      >
        {/* Request */}
        <AnimatedNode x={120} y={200} label="Request" icon="📨" color={G_GREEN} delay={0} width={130} height={65} />

        {/* L1: In-process cache */}
        <AnimatedNode x={400} y={120} label="L1 Cache" icon="⚡" color={G_YELLOW} delay={15} sublabel="In-memory (ms)" />
        {/* L2: Memcache */}
        <AnimatedNode x={400} y={280} label="L2 Cache" icon="💾" color={G_BLUE} delay={25} sublabel="Memcache cluster" />
        {/* L3: DB / Bigtable */}
        <AnimatedNode x={400} y={440} label="Database" icon="🗄️" color={G_RED} delay={35} sublabel="Bigtable / Spanner" />

        {/* Arrows: Request → caches */}
        <FlowArrow x1={185} y1={185} x2={300} y2={130} color={G_GREEN} delay={20} label="check" />
        <FlowArrow x1={185} y1={200} x2={300} y2={280} color={G_GREEN} delay={30} label="miss →" />
        <FlowArrow x1={185} y1={215} x2={300} y2={440} color={G_RED} delay={40} dashed label="miss →" />

        {/* Cache HIT result */}
        <AnimatedNode x={780} y={120} label="✅ Cache HIT" color={G_GREEN} delay={55} sublabel="~1ms response" width={170} />
        <FlowArrow x1={480} y1={120} x2={680} y2={120} color={G_YELLOW} delay={60} label="HIT!" />

        {/* Cache MISS → populate */}
        <AnimatedNode x={780} y={280} label="❌ Cache MISS" color={G_RED} delay={45} sublabel="Go to next layer" width={170} />
        <FlowArrow x1={480} y1={280} x2={680} y2={280} color={G_BLUE} delay={48} label="MISS" />

        {/* Populate cache */}
        <AnimatedNode x={1100} y={200} label="Populate Cache" icon="📥" color={G_YELLOW} delay={65} width={180} sublabel="Write-through / aside" />
        <FlowArrow x1={860} y1={265} x2={1000} y2={215} color={G_YELLOW} delay={70} />

        {/* Final response */}
        <AnimatedNode x={1440} y={200} label="Response" icon="✉️" color={G_GREEN} delay={80} sublabel="Serve to user" width={150} />
        <FlowArrow x1={1190} y1={200} x2={1360} y2={200} color={G_GREEN} delay={85} />

        {/* Hit rate badge */}
        <g opacity={hitOpacity}>
          <rect x={900} y={370} width={250} height={100} rx={12} fill="#161b27" stroke={G_YELLOW} strokeWidth={1.5} />
          <text x={1025} y={400} textAnchor="middle" fill={G_YELLOW} fontSize={13} fontFamily="'Courier New', monospace" fontWeight={700}>
            CACHE STATS
          </text>
          <text x={1025} y={422} textAnchor="middle" fill="#e2e8f0" fontSize={22} fontFamily="'Courier New', monospace" fontWeight={900}>
            95-99%
          </text>
          <text x={1025} y={445} textAnchor="middle" fill="#718096" fontSize={11} fontFamily="'Courier New', monospace">
            cache hit rate at Google scale
          </text>
        </g>

        {/* TTL info */}
        <g opacity={hitOpacity}>
          <rect x={50} y={370} width={230} height={100} rx={12} fill="#161b27" stroke={G_BLUE} strokeWidth={1.5} />
          <text x={165} y={400} textAnchor="middle" fill={G_BLUE} fontSize={13} fontFamily="'Courier New', monospace" fontWeight={700}>
            TTL STRATEGY
          </text>
          <text x={165} y={422} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            L1: ~100ms   L2: ~60s
          </text>
          <text x={165} y={440} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Consistent hashing for sharding
          </text>
          <text x={165} y={458} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            Replication for HA
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
