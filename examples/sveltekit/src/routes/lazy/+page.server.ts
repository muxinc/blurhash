import muxBlurHash from '@mux/blurhash';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId);
  return {
    blurHashBase64,
    sourceWidth,
    sourceHeight,
    playbackId,
  };
};
