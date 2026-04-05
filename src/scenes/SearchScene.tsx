import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedNode } from "../components/AnimatedNode";
import { Background } from "../components/Background";
import { FlowArrow } from "../components/FlowArrow";
import { SceneLabel } from "../components/SceneLabel";
import { G_BLUE, G_GREEN, G_RED, G_YELLOW } from "../constants";

export const SearchScene: React.FC = () => {
  const frame = useCurrentFrame();

  const rankOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <SceneLabel
        title="Search Pipeline"
        subtitle="From a 5-word query to ranked results in under 100ms"
        color={G_GREEN}
      />

      <svg
        viewBox="0 0 1760 680"
        style={{ position: "absolute", top: 160, left: 80, width: 1760, height: 680 }}
      >
        {/* ── Offline Pipeline (top row) ── */}
        <text x={60} y={80} fill="#718096" fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700} letterSpacing={2}>
          OFFLINE PIPELINE (runs continuously)
        </text>

        <AnimatedNode x={160} y={150} label="Web Crawler" icon="🕷️" color={G_RED} delay={5} sublabel="Googlebot" />
        <AnimatedNode x={440} y={150} label="Doc Processor" icon="📄" color={G_YELLOW} delay={20} sublabel="Parse + Extract" />
        <AnimatedNode x={720} y={150} label="Inverted Index" icon="📇" color={G_BLUE} delay={35} sublabel="Term → DocIDs" width={175} />
        <AnimatedNode x={1000} y={150} label="PageRank" icon="🏆" color={G_GREEN} delay={50} sublabel="Link graph scoring" />

        <FlowArrow x1={240} y1={150} x2={340} y2={150} color={G_RED} delay={25} label="HTML" />
        <FlowArrow x1={520} y1={150} x2={630} y2={150} color={G_YELLOW} delay={40} label="tokens" />
        <FlowArrow x1={810} y1={150} x2={900} y2={150} color={G_BLUE} delay={55} label="graph" />

        {/* ── Online Serving (bottom row) ── */}
        <text x={60} y={310} fill="#718096" fontSize={11} fontFamily="'Courier New', monospace" fontWeight={700} letterSpacing={2}>
          ONLINE SERVING (&lt;100ms)
        </text>

        <AnimatedNode x={120} y={430} label="User Query" icon="🔍" color={G_GREEN} delay={10} sublabel='"best pizza NYC"' width={160} />
        <AnimatedNode x={380} y={430} label="Query Parser" icon="🔬" color={G_YELLOW} delay={25} sublabel="Spelling / NLP" />
        <AnimatedNode x={640} y={430} label="Index Lookup" icon="⚡" color={G_BLUE} delay={40} sublabel="Retrieve candidates" />
        <AnimatedNode x={900} y={430} label="Ranker" icon="📈" color={G_RED} delay={55} sublabel="200+ signals" />
        <AnimatedNode x={1160} y={430} label="Snippets" icon="✂️" color={G_YELLOW} delay={70} sublabel="Featured excerpts" />
        <AnimatedNode x={1420} y={430} label="SERP" icon="📋" color={G_GREEN} delay={85} sublabel="10 results" width={130} />

        <FlowArrow x1={200} y1={430} x2={300} y2={430} color={G_GREEN} delay={30} />
        <FlowArrow x1={460} y1={430} x2={560} y2={430} color={G_YELLOW} delay={45} />
        <FlowArrow x1={720} y1={430} x2={820} y2={430} color={G_BLUE} delay={58} />
        <FlowArrow x1={980} y1={430} x2={1080} y2={430} color={G_RED} delay={72} />
        <FlowArrow x1={1240} y1={430} x2={1340} y2={430} color={G_YELLOW} delay={88} />

        {/* Index flows into online serving */}
        <FlowArrow x1={720} y1={175} x2={640} y2={405} color={G_BLUE} delay={65} dashed label="serve" curved />
        <FlowArrow x1={1000} y1={175} x2={900} y2={405} color={G_GREEN} delay={70} dashed label="rank" curved />

        {/* Ranking signals badge */}
        <g opacity={rankOpacity}>
          <rect x={820} y={530} width={250} height={110} rx={10} fill="#161b27" stroke={G_RED} strokeWidth={1.5} />
          <text x={945} y={556} textAnchor="middle" fill={G_RED} fontSize={12} fontFamily="'Courier New', monospace" fontWeight={700}>
            RANKING SIGNALS
          </text>
          <text x={945} y={575} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            PageRank • Freshness • Relevance
          </text>
          <text x={945} y={592} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            User location • Device type
          </text>
          <text x={945} y={609} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            RankBrain (ML) • BERT (NLP)
          </text>
          <text x={945} y={626} textAnchor="middle" fill="#718096" fontSize={10} fontFamily="'Courier New', monospace">
            200+ signals total
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
