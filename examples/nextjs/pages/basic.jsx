import MuxPlayer from '@mux/mux-player-react';
import muxBlurHash from '@mux/blurhash';

const Basic = ({
  playbackId,
  blurHashBase64,
  sourceWidth,
  sourceHeight,
}) => (
  <MuxPlayer
    streamType="on-demand"
    playbackId={playbackId}
    placeholder={blurHashBase64}
    style={{ aspectRatio: `${sourceWidth / sourceHeight}` }}
    metadata={{
      video_id: 'video-id-54321',
      video_title: 'Test video title',
      viewer_user_id: 'user-id-007',
    }}
  />
);

export const getStaticProps = async () => {
  const playbackId = '23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I';
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(
    playbackId
  );

  return {
    props: {
      playbackId,
      blurHashBase64,
      sourceWidth,
      sourceHeight,
    },
  };
};

export default Basic;
