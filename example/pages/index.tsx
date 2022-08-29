import { CSSProperties } from 'react';
import type { GetStaticProps, NextPage } from 'next';

import MuxPlayer from '@mux/mux-player-react-suspense';

type Props = {
  playbackId: string;
  aspectRatio: CSSProperties['aspectRatio'];
};
const Home: NextPage<Props> = ({ playbackId, aspectRatio }) => (
  <>
    <h1>
      Mux Player React (<i>Suspense</i>)
    </h1>
    <p>The best-loading player this side of the Mississippi</p>
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      style={{
        aspectRatio,
        maxWidth: '568px',
      }}
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  // let's pretend we're calling a db here to get our playbackId and aspectRatio
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const aspectRatioMux = '630:377';

  const aspectRatioCss = aspectRatioMux.replace(':', '/');

  return {
    props: {
      playbackId,
      aspectRatio: aspectRatioCss,
    },
  };
};

export default Home;
