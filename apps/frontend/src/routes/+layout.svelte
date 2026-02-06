<script lang="ts">
	import '$lib/scss/styles.scss';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';

	import Header from '$lib/components/Header.svelte';
	import favicon from '$lib/assets/logo.svg';
	import faviconDark from '$lib/assets/logo-dark.svg';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { initAnimations } from '$lib/js/animations';
	import { tick, onMount, setContext, type Snippet } from 'svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import type { SiteSetting } from '$backend/src/payload-types';
	import Loader from '$lib/components/Loader/Loader.svelte';
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	interface Props {
		children: Snippet;
		data: {
			siteSettings: SiteSetting;
		};
	}
	let { data, children }: Props = $props();

	setContext('site-settings', {
		get settings() {
			return data.siteSettings;
		}
	});

	let showLoader = $state(true);
	let smooth = $state<ScrollSmoother>();
	setContext('smooth', {
		get smooth() {
			return smooth;
		}
	});

	beforeNavigate(() => {
		showLoader = true;
		if (smooth) smooth.paused(true);
	});
	afterNavigate(async () => {
		await tick();

		// 2. Re-run your animation initializations
		initAnimations();

		// 3. Ensure ScrollTrigger knows about new page height
		// We wait two frames to ensure layout paints are finished
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				ScrollTrigger.refresh();

				// 4. Handle Hash jump if it exists in the new URL
				const hash = window.location.hash;
				if (smooth) {
					if (hash) {
						smooth.scrollTo(hash, true);
					} else {
						smooth.scrollTo(0, true);
					}
				}

				// 5. Cleanup
				if (smooth) smooth.paused(false);
				showLoader = false;
			});
		});
	});

	onMount(() => {
		smooth = ScrollSmoother.create({
			smooth: 1,
			effects: true,
			smoothTouch: 0,
			wrapper: '#smooth-wrapper',
			content: '#smooth-content'
		});
	});
</script>

<svelte:head>
	<!-- Google Fonts API -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>

	<link rel="icon" href={favicon} type="image/svg+xml" media="(prefers-color-scheme: dark)" />
	<link rel="icon" href={faviconDark} type="image/svg+xml" media="(prefers-color-scheme: light)" />
</svelte:head>

<Header />
<svelte:body style:overflow={showLoader ? 'hidden' : 'auto'} />
<main id="smooth-wrapper" class="content">
	<div id="smooth-content" class="content-grid smooth-content">
		{@render children()}
		<Footer />
	</div>
</main>
<Loader show={showLoader} message="Syncing Interface" />
