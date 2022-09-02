# A Lazy Mux Player

## Usage
This package's usage should be _approximately_ equivalent to that of MuxPlayerReact. Please refer to the [Mux Player Documentation](https://docs.mux.com/guides/video/mux-player).

This package is intended to be used alongside `@mux/placeholder`. In this example, we use [Next.js](https://nextjs.org) to fetch the placeholder server-side with the `getServerSideProps` component.

```jsx
import MuxPlayer from "@mux/mux-**player**-react-lazy"
import "@mux/mux-player-react-lazy/src/styles.css"

export default function Page({ width, height, blurHashBase64 }) {
  return (
    <MuxPlayer 
      /* Placeholder Attributes */
      width={width}
      height={height}
      blurHashBase64={blurHashBase64}
      /* Standard MuxPlayer Attributes */
      streamType="on-demand"
      playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
      metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
      }}
    />
  );
}

export const getStaticProps = async () => {
  const playbackId = '3fevCt00ntwf7WxwvBhRo1EZ01IoABwo2d';
  const { blurHashBase64, width, height } = await muxPlaceholder(playbackId);

  return {
    props: {
      playbackId,
      blurHashBase64,
      width,
      height,
    },
  };
};
```

## Styling
Mux Player React Suspense should be compatible with any React styling solution that uses the `style` or `className` attributes.

```jsx
import styled from 'styled-components'
import MuxPlayer from '@mux/mux-player-react-lazy'

const StyledMuxPlayer = styled(MuxPlayer)`
  max-width: 500px;
`
```
### CSS
Use the following CSS to target the component:
```css
[data-mux-player-lazy] {
  max-width: 500px;
}
```

## Usage Without Placeholder
When I have more time, I'll test this component without `blurHash`, `width`, and `height`. Theoretically, it should still be helpful for lazy-loading MuxPlayer, so long as something else enforces its dimensions. This might be CSS `aspect-ratio`, or it might be a low-res poster fetched from `image.mux.com`. Gotta think that through, still.