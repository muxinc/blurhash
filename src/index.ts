import fetch from 'node-fetch';
import sharp from 'sharp';
import { encode, decode } from 'blurhash';

const bufferToBlurHash = async (buffer: Buffer, blurWidth: number, blurHeight: number) => {
	const image = sharp(buffer);
	const { width, height } = await image.metadata();

	const { data, info } = await image
		.raw()
		.ensureAlpha()
		.resize(blurWidth, blurHeight, { fit: 'inside' })
		.toBuffer({ resolveWithObject: true });

	const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);

	return {
		sourceWidth: width,
		sourceHeight: height,
		blurWidth: info.width,
		blurHeight: info.height,
		blurHash
	};
};

const blurHashToBase64 = async (hash: string, width: number, height: number) => {
	const hashWidth = width;
	const hashHeight = Math.round(hashWidth * (height / width));

	const pixels = decode(hash, hashWidth, hashHeight);

	const resizedImageBuf = await sharp(Buffer.from(pixels), {
		raw: {
			channels: 4,
			width: hashWidth,
			height: hashHeight
		}
	})
		.jpeg({
			overshootDeringing: true,
			quality: 40
		})
		.toBuffer();

	return `data:image/jpeg;base64,${resizedImageBuf.toString('base64')}`;
};

export interface MuxBlurHashOptions {
	blurWidth?: number;
	blurHeight?: number;
	time?: number;
	thumbnailToken?: string;
}
const defaultOptions = {
	blurWidth: 32,
	blurHeight: 32
} as const;
const muxBlurHash = async (playbackId: string, options: MuxBlurHashOptions = {}) => {
	if (typeof playbackId !== 'string') {
		throw new TypeError(
			`[@mux/blurhash] playbackId error. Expected a string, got ${typeof playbackId}`
		);
	}
	let url = `https://image.mux.com/${playbackId}/thumbnail.png`;

	if (typeof options.time !== 'undefined' || typeof options.thumbnailToken !== 'undefined') {
		if (typeof options.time !== 'undefined' && typeof options.thumbnailToken !== 'undefined') {
			console.warn(
				'[@mux/blurhash] When thumbnailToken is set, time will have no effect. Encode time in your token. See https://docs.mux.com/guides/video/secure-video-playback for more information.'
			);
		}
		url += '?';
		if (typeof options.time !== 'undefined') {
			url += `&time=${options.time}`;
		}
		if (typeof options.thumbnailToken !== 'undefined') {
			url += `&token=${options.thumbnailToken}`;
		}
	}

	const response = await fetch(url);

	if (response.status === 403) {
		if (typeof options.thumbnailToken !== 'undefined') {
			throw new Error(
				`[@mux/blurhash] Error fetching thumbnail. 403: Forbidden. The thumbnailToken option may be invalid. See https://docs.mux.com/guides/video/secure-video-playback for more information.`
			);
		} else {
			throw new Error(
				`[@mux/blurhash] Error fetching thumbnail. 403: Forbidden. This Playback ID may require a thumbnail token. See https://docs.mux.com/guides/video/secure-video-playback for more information.`
			);
		}
	} else if (response.status >= 400) {
		throw new Error(
			`[@mux/blurhash] Error fetching thumbnail. ${response.status}: ${response.statusText}`
		);
	}

	// from our response we now need a Buffer
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(new Uint8Array(arrayBuffer));

	// we can use that buffer with sharp to get aspectRatio and blurHash with sharp!
	const { sourceWidth, sourceHeight, blurWidth, blurHeight, blurHash } = await bufferToBlurHash(
		buffer,
		options.blurWidth ?? defaultOptions.blurWidth,
		options.blurHeight ?? defaultOptions.blurHeight
	);

	if (typeof sourceWidth !== 'number' || typeof sourceHeight !== 'number') {
		throw new Error('Could not get source width and height');
	}

	// and since it's easier to deal with, a base64 string as well...
	const blurHashBase64 = await blurHashToBase64(blurHash, blurWidth, blurHeight);

	return {
		blurHash,
		blurHashBase64,
		sourceWidth,
		sourceHeight
	};
};
export default muxBlurHash;
