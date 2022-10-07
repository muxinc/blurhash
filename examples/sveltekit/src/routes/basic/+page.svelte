<script lang="ts">
  import '@mux/mux-player';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  <mux-player
    stream-type="on-demand"
    playback-id={data.playbackId}
    placeholder={data.blurHashBase64}
    style:aspect-ratio={data.sourceWidth / data.sourceHeight}
    metadata-video-title="Test VOD"
    metadata-viewer-user-id="user-id-007"
  />
</main>
