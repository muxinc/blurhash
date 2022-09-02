Using [woltapp/blurhash](https://github.com/woltapp/blurhash) to make nice placeholders for a Mux video. Works nicely with [Mux Player](https://docs.mux.com/guides/video/mux-player), especially with our lazy libraries:
- [`@mux/mux-player-react-lazy`](../react/)
- [`@mux/mux-player-svelte-lazy`](../svelte/)
  

## API
```js
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHash, blurHashBase64, width, height } = await muxPlaceholder(playbackId);
```
