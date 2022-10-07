# @mux/blurhash
A server-side package for node that uses [woltapp/blurhash](https://github.com/woltapp/blurhash) to make placeholders for Mux videos. Works nicely with [Mux Player](https://docs.mux.com/guides/video/mux-player).


## Installation
```shell
npm install @mux/blurhash
```

or

```shell
yarn add @mux/blurhash
```

## Usage
Run `@mux/blurhash` server-side. `@mux/blurhash` will not work in the browser.

```js
import muxBlurHash from '@mux/blurhash'

const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
const { blurHash, blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId);
```

### Using `blurHashBase64` with Mux Player
- **mux-player element**: `<mux-player placeholder={blurHashBase64} />`
- **mux-player-react and mux-player-react/lazy**: `<MuxPlayer placeholder={blurHashBase64} /> `

See the [examples directory](./examples) to learn more

### Using `blurHashBase64` with native elements
- **HTML**: `<img src={blurHashBase64}/>` 
- **CSS**: `background-image: url({blurHashBase64})`

### Using `blurHash` in JavaScript
- **Canvas**: See documentation for [blurhash.decode](https://github.com/woltapp/blurhash/tree/master/TypeScript#decodeblurhash-string-width-number-height-number-punch-number--uint8clampedarray)

### Options
`@mux/blurhash` will accept an optional second parameter that will allow configuration of the blurhash. 

| Parameter | Type | Description | Default |
|---|---|---|---|
| blurWidth | number | The image will be compressed to this width before blurring. Lower values load faster but have less detail. | 32 |
| blurHeight | number | The image will be compressed to this height before blurring. Lower values load faster but have less detail. | 32 |
| time | number | The video timestamp from which to grab the blurhash | 0 |
| thumbnailToken | string | Videos with playback restrictions may require a thumbnail token. See https://docs.mux.com/guides/video/secure-video-playback for details | |

#### For example...
```js
import muxBlurHash from '@mux/blurhash'

// a lower resolution blurHash that will load more quickly
const options = { blurWidth: 16, blurHeight: 16 }
const { blurHash } = await muxBlurHash(playbackId, options);
```

## Examples
- NextJS and mux-player-react [[Source Code](./examples/nextjs)] [[Live Example](https://mux-blurhash-react.vercel.app)]
- SvelteKit and mux-player [[Source Code](./examples/sveltekit)] [[Live Example](https://mux-blurhash-svelte.vercel.app)]
