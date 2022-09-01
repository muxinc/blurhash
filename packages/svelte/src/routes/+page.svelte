<script lang="ts">
  import type { PageData } from './$types';
  // import MuxPlayer from '@mux/mux-player-svelte-lazy';
  import MuxPlayer from '$lib/index.svelte';

  export let data: PageData;
</script>

<MuxPlayer
  blurHashBase64={data.blurHashBase64}
  width={data.width}
  height={data.height}
  playback-id={data.playbackId}
  stream-type="on-demand"
/>
