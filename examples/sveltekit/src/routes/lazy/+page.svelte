<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const player = import('@mux/mux-player');
</script>

<main>
	<div class="wrapper" style:aspect-ratio={data.sourceWidth / data.sourceHeight}>
		{#await player}
			<div class="placeholder" style:background-image={`url(${data.blurHashBase64})`} />
		{:then}
			<mux-player
				stream-type="on-demand"
				playback-id={data.playbackId}
				metadata-video-title="Test VOD"
				metadata-viewer-user-id="user-id-007"
				placeholder={data.blurHashBase64}
			/>
		{/await}
	</div>
</main>

<style>
	.wrapper {
		width: 100%;
		position: relative;
	}
	mux-player, .placeholder {
		position: absolute;
		inset: 0;
	}
	.placeholder {
		background-repeat: no-repeat;
		background-size: contain;
	}
	.placeholder:after {
		/* We use this pseudo-element to darken the placholder, just as mux-player will with its controls overlay */
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>
