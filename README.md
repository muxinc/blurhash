# Mux Player React (Suspense)
The best-loading player this side of the Mississippi

### Installation
```bash
npm install @mux/mux-player-lazy
# or
yarn add @mux/mux-player-lazy
```
## Usage
This package's usage should be _approximately_ equivalent to that of MuxPlayerReact. Please refer to the [Mux Player Documentation](https://docs.mux.com/guides/video/mux-player).
```jsx
import MuxPlayer from "@mux/mux-player-lazy"
import "@mux/mux-player-lazy/src/styles.css"

export default function App() {
  return (
    <MuxPlayer 
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
```

## Styling
### Aspect Ratio
By default, Mux Player React Suspense renders with a [CSS aspect ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) of `aspect-ratio: 16/9`. You can get your video's aspect ratio (in the form `width:height`) from the [Mux Asset API](https://docs.mux.com/api-reference/video#operation/get-asset).

### React
Mux Player React Suspense should be compatible with any React styling solution that uses the `style` or `className` attributes.

```jsx
import styled from 'styled-components'
import MuxPlayer from '@mux/mux-player-lazy'

const StyledMuxPlayer = styled(MuxPlayer)`
  max-width: 500px;
  aspect-ratio: 4/3;
`
```
### CSS
Use the following CSS to target the component:
```css
[data-mux-player-lazy] {
  max-width: 500px;
  aspect-ratio: 4/3;
}
```