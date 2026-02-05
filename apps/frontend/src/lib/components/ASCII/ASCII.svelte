<script lang="ts">
	import { ASCII_CONTENT as ascii } from './ascii';
	import { initAsciiTimeline } from '$lib/components/ASCII/logo';
	import { destroyASCIIAnimation } from './ascii_animations';
	let asciiText = $state<HTMLElement>();
	let asciiCard = $state<HTMLElement>();
	$effect(() => {
		if (asciiText && asciiCard) {
			initAsciiTimeline(asciiText, asciiCard);
		} else {
			console.error("ASCII Error: AsciiText element wasn't bound");
		}

		return () => {
			destroyASCIIAnimation();
		};
	});
</script>

<div class="ascii__card" bind:this={asciiCard}>
	<!-- eslint-disable-next-line  -->
	<div class="ascii__art" bind:this={asciiText}>{@html ascii}</div>
</div>
