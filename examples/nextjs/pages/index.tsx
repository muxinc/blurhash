import { CSSProperties } from 'react';
import type { GetStaticProps, NextPage } from 'next';

import muxPlaceholder from '@mux/mux-placeholder';
import MuxPlayer from '@mux/mux-player-react-lazy';

type Props = {
  playbackId: string;
  blurHashBase64: string;
  width: number;
  height: number;
};
const Home: NextPage<Props> = ({
  playbackId,
  blurHashBase64,
  width,
  height,
}: Props) => (
  <MuxPlayer
    streamType="on-demand"
    playbackId={playbackId}
    width={width}
    height={height}
    blurHashBase64={blurHashBase64}
    style={{
      maxWidth: '568px',
    }}
  />
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHashBase64, width, height } = await muxPlaceholder(playbackId);

  return {
    props: {
      playbackId,
      blurHashBase64,
      width,
      height,
    },
  };
};

export default Home;
