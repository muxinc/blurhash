<script lang="ts">
  import type { PageData } from './$types';
  import MuxPlayer from '@mux/mux-player-svelte-lazy';

  export let data: PageData;
</script>

<main>
  <MuxPlayer
    blurHashBase64={data.blurHashBase64}
    width={data.width}
    height={data.height}
    playback-id={data.playbackId}
    stream-type="on-demand"
  />
</main>

<style>
  main :global([data-mux-player-lazy]) {
    max-width: 568px;
  }
</style>
