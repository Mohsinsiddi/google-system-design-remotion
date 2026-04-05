import { AbsoluteFill, Composition, Sequence } from "remotion";
import {
  CACHE_DUR,
  CDN_DUR,
  DB_DUR,
  DNS_DUR,
  FPS,
  HEIGHT,
  OUTRO_DUR,
  SCALE_DUR,
  SEARCH_DUR,
  TITLE_DUR,
  TOTAL,
  WIDTH,
} from "./constants";
import { CacheScene } from "./scenes/CacheScene";
import { CDNScene } from "./scenes/CDNScene";
import { DatabaseScene } from "./scenes/DatabaseScene";
import { DNSScene } from "./scenes/DNSScene";
import { OutroScene } from "./scenes/OutroScene";
import { ScaleScene } from "./scenes/ScaleScene";
import { SearchScene } from "./scenes/SearchScene";
import { TitleScene } from "./scenes/TitleScene";

const S0 = 0;
const S1 = S0 + TITLE_DUR;
const S2 = S1 + SCALE_DUR;
const S3 = S2 + DNS_DUR;
const S4 = S3 + CACHE_DUR;
const S5 = S4 + DB_DUR;
const S6 = S5 + SEARCH_DUR;
const S7 = S6 + CDN_DUR;

const Main: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={S0} durationInFrames={TITLE_DUR}>
      <TitleScene />
    </Sequence>
    <Sequence from={S1} durationInFrames={SCALE_DUR}>
      <ScaleScene />
    </Sequence>
    <Sequence from={S2} durationInFrames={DNS_DUR}>
      <DNSScene />
    </Sequence>
    <Sequence from={S3} durationInFrames={CACHE_DUR}>
      <CacheScene />
    </Sequence>
    <Sequence from={S4} durationInFrames={DB_DUR}>
      <DatabaseScene />
    </Sequence>
    <Sequence from={S5} durationInFrames={SEARCH_DUR}>
      <SearchScene />
    </Sequence>
    <Sequence from={S6} durationInFrames={CDN_DUR}>
      <CDNScene />
    </Sequence>
    <Sequence from={S7} durationInFrames={OUTRO_DUR}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition
      id="GoogleSystemDesign"
      component={Main}
      durationInFrames={TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
