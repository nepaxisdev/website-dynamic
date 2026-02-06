<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Logo from '../Logo/Logo.svelte';

	interface Props {
		show?: boolean;
		message?: string;
	}

	let { show = true, message = 'LOADING' }: Props = $props();
	let progress = $state(0);

	$effect(() => {
		let interval: ReturnType<typeof setInterval>;

		if (show) {
			// Reset progress when shown
			progress = 0;
			interval = setInterval(() => {
				if (progress < 95) {
					// Randomized increments for a "natural" feel
					progress += Math.random() * 15;
				}
			}, 100);
		} else {
			// Snap to 100 when the layout signals it's ready
			progress = 100;
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	});
</script>

{#if show}
	<div class="loader-wrapper" out:fade={{ duration: 400, easing: cubicOut }}>
		<div class="loader-content">
			<div class="loader-status">
				<div class="msg" out:fly={{ y: -10, duration: 300, easing: cubicOut }}>
					<Logo width={16} />
					{message}
				</div>
				<span class="pct">{Math.min(Math.floor(progress), 100)}%</span>
			</div>

			<div class="progress-track">
				<div class="progress-fill" style:width="{Math.min(progress, 100)}%"></div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.loader-wrapper {
		position: fixed;
		inset: 0;
		z-index: 10000;
		background: var(--clr-neutral-700, #000);
		display: grid;
		place-items: center;
		padding: 0 10%;
	}

	.loader-content {
		width: 100%;
		max-width: 600px;
	}

	.loader-status {
		display: flex;
		justify-content: space-between;
		font-family: 'Space Mono', monospace;
		font-size: 10px;
		letter-spacing: 0.2em;
		margin-bottom: 12px;
		color: var(--clr-neutral-100, #fff);
		text-transform: uppercase;
	}

	.progress-track {
		width: 100%;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--clr-primary, #fff);
		// Smooth transition for the bar width
		transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}
</style>
