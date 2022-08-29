const getPoster = (
  playbackId: string | undefined,
  thumbnailTime: number | undefined = 0,
  placeholder: boolean
) =>
  playbackId
    ? placeholder
      ? `https://image.mux.com/${playbackId}/thumbnail.jpg?width=16&time=${thumbnailTime}`
      : `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${thumbnailTime}`
    : null;

export default getPoster;
