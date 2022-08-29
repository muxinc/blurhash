import sharp from 'sharp';
import { encode, decode } from 'blurhash';

const bufferToBlurHash = async (buffer: Buffer) => {
  const image = sharp(buffer);
  const { width, height } = await image.metadata();

  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const blurHash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  );

  return {
    playerWidth: width,
    playerHeight: height,
    blurWidth: info.width,
    blurHeight: info.height,
    blurHash,
  };
};

const blurHashToBase64 = async (
  hash: string,
  width: number,
  height: number
) => {
  const hashWidth = width;
  const hashHeight = Math.round(hashWidth * (height / width));

  const pixels = decode(hash, hashWidth, hashHeight);

  const resizedImageBuf = await sharp(Buffer.from(pixels), {
    raw: {
      channels: 4,
      width: hashWidth,
      height: hashHeight,
    },
  })
    .jpeg({
      overshootDeringing: true,
      quality: 40,
    })
    .toBuffer();

  return `data:image/jpeg;base64,${resizedImageBuf.toString('base64')}`;
};

const muxPlaceholder = async (playbackId: string) => {
  const url = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
  const response = await fetch(url);

  // from our response we now need a Buffer
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));

  // we can use that buffer with sharp to get aspectRatio and blurHash with sharp!!
  const { playerWidth, playerHeight, blurWidth, blurHeight, blurHash } =
    await bufferToBlurHash(buffer);

  if (typeof playerWidth !== 'number' || typeof playerHeight !== 'number') {
    throw new Error('Could not get player width and height');
  }

  // and since it's easier to deal with, a base64 string as well...
  const blurHashBase64 = await blurHashToBase64(
    blurHash,
    blurWidth,
    blurHeight
  );

  return { blurHash, blurHashBase64, width: playerWidth, height: playerHeight };
};
export default muxPlaceholder;
