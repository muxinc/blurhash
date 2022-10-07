import muxBlurHash from '@mux/blurhash';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(
    playbackId
  );
  return {
    blurHashBase64,
    sourceWidth,
    sourceHeight,
    playbackId,
  };
};
