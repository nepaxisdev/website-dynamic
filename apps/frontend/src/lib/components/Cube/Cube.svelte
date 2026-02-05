<script lang="ts">
	import { Logo } from '$lib/components/Logo';
	import { initCube } from '.';
	let cubeContainer = $state<HTMLElement>();
	let cube = $state<HTMLElement>();
	$effect(() => {
		const parentSection: HTMLElement = document.querySelector('.capabilities__section')!;
		if (cube && cubeContainer && parentSection) {
			initCube(cube, cubeContainer, parentSection);
		}
	});
</script>

<div class="cube-container" aria-hidden="true" bind:this={cubeContainer}>
	<div class="cube" bind:this={cube}>
		<div class="cube-face bottom">
			<Logo width={53} height={27} />
			<span class="sr-only">Nepaxis</span>
		</div>
		<div class="cube-face right">
			<span class="cube-text">Development</span>
		</div>
		<div class="cube-face front">
			<span class="cube-text">Design</span>
		</div>
		<div class="cube-face left">
			<span class="cube-text">Cloud Services</span>
		</div>
		<div class="cube-face back">
			<span class="cube-text">Marketing</span>
		</div>
		<div class="cube-face top">
			<span class="cube-text">Consulting & Support</span>
		</div>
	</div>
</div>
