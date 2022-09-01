import muxPlaceholder from '@mux/mux-placeholder';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHashBase64, width, height } = await muxPlaceholder(playbackId);
  return {
    blurHashBase64,
    width,
    height,
    playbackId,
  };
};
