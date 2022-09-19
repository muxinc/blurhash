import type { GetStaticProps, NextPage } from 'next';

import muxBlurHash from '@mux/blurhash';

type Props = {
  playbackId: string;
  blurHashBase64: string;
  sourceWidth: number;
  sourceHeight: number;
};
const Lazy: NextPage<Props> = ({
  playbackId,
  blurHashBase64,
  sourceWidth,
  sourceHeight,
}: Props) => (
  <>
    {JSON.stringify({ playbackId, blurHashBase64, sourceWidth, sourceHeight })}
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId);

  return {
    props: {
      playbackId,
      blurHashBase64,
      sourceWidth,
      sourceHeight,
    },
  };
};

export default Lazy;
