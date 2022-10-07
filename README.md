# @mux/blurhash
Using [woltapp/blurhash](https://github.com/woltapp/blurhash) to make nice placeholders for Mux videos. Works nicely with [Mux Player](https://docs.mux.com/guides/video/mux-player).


## Installation
```shell
npm install @mux/blurhash
```

or

```shell
yarn add @mux/blurhash
```

## Usage
```js
import muxBlurHash from '@mux/blurhash'

const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
const { blurHash, blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId);
```

### Options
`@mux/blurhash` will accept an optional second parameter that will allow configuration of the blurhash. 

| Parameter | Type | Description | Default |
|---|---|---|---|
| blurWidth | number | The image will be compressed to this width before blurring | 32 |
| blurHeight | number | The image will be compressed to this height before blurring | 32 |
| time | number | The timestamp from which to grab the blurhash | 0 |
| thumbnailToken | string | Videos with playback restrictions may require a thumbnailToken. See https://docs.mux.com/guides/video/secure-video-playback for details | |

#### For example...
```js
import muxBlurHash from '@mux/blurhash'

// a lower resolution blurHash that will load more quickly
const options = { blurWidth: 16, blurHeight: 16 }
const { blurHash } = await muxBlurHash(playbackId, options);
```

## Examples
- MuxPlayerReact & NextJS [[Repo](./examples/nextjs)] [[Live Example](https://mux-blurhash-react.vercel.app)]
- mux-player & SvelteKit [[Repo](./examples/sveltekit)] [[Live Example](https://mux-blurhash-svelte.vercel.app)]
