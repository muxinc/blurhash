<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  const player = import('@mux/mux-player');
</script>

<main>
  <div
    class="wrapper"
    style:aspect-ratio={data.sourceWidth / data.sourceHeight}
  >
    {#await player}
      <div
        class="placeholder"
        style:background-image={`url(${data.blurHashBase64})`}
      />
    {:then}
      <mux-player
        stream-type="on-demand"
        playback-id={data.playbackId}
        placeholder={data.blurHashBase64}
        metadata-video-title="Test VOD"
        metadata-viewer-user-id="user-id-007"
      />
    {/await}
  </div>
</main>

<style>
  .wrapper {
    width: 100%;
    position: relative;
  }
  .placeholder {
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    inset: 0;
  }
  /* We use this pseudo-element to darken the placholder, just as mux-player will with its controls overlay */
  .placeholder:after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  mux-player {
    position: absolute;
    inset: 0;
  }
</style>
