<script lang="ts">
  import { onMount } from 'svelte';
  import LoadingOverlay from './_LoadingOverlay.svelte';

  export let blurHashBase64: string;
  export let width: number;
  export let height: number;

  let isPlayerImported = false;
  onMount(() => {
    import('@mux/mux-player').then(() => {
      isPlayerImported = true;
    });
  });
</script>

<div data-mux-player-lazy>
  <img src={blurHashBase64} {width} {height} alt="" />
  {#if isPlayerImported}
    <mux-player {...$$props} />
  {:else}
    <LoadingOverlay />
  {/if}
</div>

<style>
  [data-mux-player-lazy] {
    background-color: #000;
    overflow: hidden;
    position: relative;
    display: flex;
  }

  /* Size the container with the image placeholder */
  [data-mux-player-lazy] img {
    width: 100%;
    height: auto;
  }

  /* Fill the container with the player */
  [data-mux-player-lazy] mux-player {
    position: absolute;
    inset: 0;
  }
</style>
