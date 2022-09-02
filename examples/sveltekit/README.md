# A Lazy Mux Player

## Usage
This package's usage should be _approximately_ equivalent to that of mux-player. Please refer to the [Mux Player Documentation](https://docs.mux.com/guides/video/mux-player).

This package is intended to be used alongside `@mux/placeholder`. In this example, we use [SvelteKit](https://kit.svelte.dev) to fetch the placeholder server-side with `+page.server.ts`.

`+page.server.load`
```ts
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
```
`+page`
```svelte
<script lang="ts">
  import type { PageData } from './$types';
  import MuxPlayer from '$lib/MuxPlayer.svelte';

  export let data: PageData;
</script>

<MuxPlayer
  blurHashBase64={data.blurHashBase64}
  width={data.width}
  height={data.height}
  playback-id={data.playbackId}
  stream-type="on-demand"
/>
```

## Styling
### CSS
Use the following CSS to target the component:
```css
:global([data-mux-player-lazy]) {
  max-width: 500px;
}
```

## Usage Without Placeholder
When I have more time, I'll test this component without `blurHash`, `width`, and `height`. Theoretically, it should still be helpful for lazy-loading MuxPlayer, so long as something else enforces its dimensions. This might be CSS `aspect-ratio`, or it might be a low-res poster fetched from `image.mux.com`. Gotta think that through, still.