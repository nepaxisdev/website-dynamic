<script lang="ts">
	import '$lib/scss/styles.scss';
	import { navigating } from '$app/state';

	import Header from '$lib/components/Header.svelte';
	import favicon from '$lib/assets/logo.svg';
	import faviconDark from '$lib/assets/logo-dark.svg';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import Newsletter from '$lib/components/Newsletter/Newsletter.svelte';

	const CURRENT_YEAR = new Date().getFullYear();

	let { children } = $props();

	let showLoader = $state(true);

	if (navigating) {
		beforeNavigate(() => {
			showLoader = true;
		});
	}
	afterNavigate(() => {
		showLoader = false;
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

<main id="smooth-wrapper" class="content">
	<div id="smooth-content" class="content-grid smooth-content">
		{@render children()}
		<footer
			class="bg-neutral-100 neutral-700 content-grid full-width py-2 pt-md-2 pt-lg-0 footer__section"
			data-section="light"
		>
			<div class="grid-md-row pt-4 pb-2 py-md-5 py-lg-7 ai-center">
				<div class="col-md-5 col-lg-4">
					<div class="footer__logo-wrapper mb-4 mb-lg-5">
						<img src="/logo-dark.svg" alt="Nepaxis Icon" />
					</div>
					<h5 class="footer__tagline regular-36 uppercase mb-4 mb-lg-5 me-xl-7">
						Start your digital transformation with us!
					</h5>
					<div class="social__link-wrapper fl-row gap-2 gap-lg-4 mb-4">
						<a
							href="https://www.linkedin.com/company/nepaxis/"
							class="social--linkedin"
							target="_blank"
						>
							<div class="sr-only">Linked In</div>
						</a>
						<a href="https://x.com/nepaxis" class="social--x" target="_blank">
							<div class="sr-only">X</div>
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=61583287982556"
							class="social--facebook"
							target="_blank"
						>
							<div class="sr-only">Facebook</div>
						</a>
						<a href="https://wa.me/971561448979" class="social--whatsapp" target="_blank">
							<div class="sr-only">Whatsapp</div>
						</a>
						<a href="https://www.instagram.com/nepaxis" class="social--instagram" target="_blank">
							<div class="sr-only">Instagram</div>
						</a>
						<!-- <a href="#" class="social--youtube" target="_blank">
									<div class="sr-only">Youtube</div>
								</a> -->
					</div>
				</div>
				<div class="col-start-md-7 col-start-lg-7 col-start-2xl-9 col-end-md-13">
					<div class="fl-md-row jc-md-between gap-4 w-100 mb-5">
						<h6 class="uppercase leading-120 medium-15 shrink-0 w-md-30 mb-3 mb-md-0">
							Quick Links
						</h6>
						<div class="w-100 grid grid-template-col-2 gap-1 w-lg-70">
							<a
								href="#about-section"
								data-scroll-to="#about-section"
								class="regular-13 footer__link">About us</a
							>
							<a
								href="#services-section"
								class="regular-13 footer__link"
								data-scroll-to="#services-section">Our Services</a
							>
							<a
								href="#approach-section"
								class="regular-13 footer__link"
								data-scroll-to="#approach-section">Our Approach</a
							>
							<a
								href="#contact-section"
								class="regular-13 footer__link"
								data-scroll-to="#contact-section">Contact Form</a
							>
						</div>
					</div>
					<Newsletter />
				</div>
			</div>
			<div
				class="legal regular-12 font-mono uppercase tracking-wide text-center neutral-400 py-lg-2"
			>
				Nepaxis Technologies, LLC © <span id="currentYear">{CURRENT_YEAR}</span>
			</div>
		</footer>
	</div>
</main>
{#if showLoader}
	<div id="loader" class="loading__screen">
		<div id="loader-percent" class="loading__value"></div>
		<canvas id="loading-matrix" class="loading__background"></canvas>
	</div>
{/if}
