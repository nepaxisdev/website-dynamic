<script lang="ts">
	import { getContext } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import Link from '$lib/components/Link/Link.svelte';
	import Newsletter from '$lib/components/Newsletter/Newsletter.svelte';
	import { page } from '$app/state';
	import type { SiteSetting } from '$backend/src/payload-types';

	const siteSettings = getContext<{ settings: SiteSetting }>('site-settings')
		.settings as SiteSetting;
	const siteInfo = $derived(siteSettings.basic_settings);
	const socials = $derived(siteSettings.social_media);

	const currentPage = $derived(page.route.id);
	const CURRENT_YEAR = new Date().getFullYear();

	let footer: HTMLElement | null = null;
	let contactPinTrigger: ScrollTrigger | null = null;

	function initContactPinAnimation() {
		// Kill existing trigger
		if (contactPinTrigger) {
			contactPinTrigger.kill();
			contactPinTrigger = null;
		}

		if (currentPage !== '/' || !footer || !browser) {
			return;
		}

		const contactSection = document.querySelector<HTMLElement>('.contact__section');

		if (!contactSection) {
			// Element doesn't exist, silently return
			return;
		}

		const footerHeight = footer.offsetHeight;
		const slideOutDuration = contactSection.offsetHeight * 1.25;
		const totalDuration = footerHeight + slideOutDuration;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: contactSection,
				start: 'bottom bottom',
				end: `+=${totalDuration}`,
				scrub: true,
				pin: contactSection,
				pinSpacing: false,
				id: 'contact-pin-slide',
				onRefresh: (self) => {
					contactPinTrigger = self;
				}
			}
		});

		tl.to(
			contactSection,
			{
				duration: footerHeight,
				y: 0,
				ease: 'none'
			},
			0
		);

		tl.to(
			contactSection,
			{
				duration: slideOutDuration,
				y: -contactSection.offsetHeight,
				ease: 'none'
			},
			footerHeight
		);
	}

	afterNavigate(() => {
		if (browser) {
			requestAnimationFrame(() => {
				setTimeout(() => {
					initContactPinAnimation();
				}, 150);
			});
		}
	});

	$effect(() => {
		if (browser) {
			gsap.registerPlugin(ScrollTrigger);

			const timeout = setTimeout(() => {
				initContactPinAnimation();
			}, 150);

			return () => {
				clearTimeout(timeout);
				if (contactPinTrigger) {
					contactPinTrigger.kill();
					contactPinTrigger = null;
				}
			};
		}
	});
</script>

<footer
	bind:this={footer}
	class="bg-neutral-100 neutral-700 content-grid full-width py-2 pt-md-2 pt-lg-0 footer__section"
	data-section="light"
>
	<div class="grid-md-row pt-4 pb-2 py-md-5 py-lg-7 ai-center">
		<div class="col-md-5 col-lg-4">
			<div class="footer__logo-wrapper mb-4 mb-lg-5">
				<img src="/logo-dark.svg" alt="Nepaxis Icon" />
			</div>
			<h5 class="footer__tagline regular-36 uppercase mb-4 mb-lg-5 me-xl-7">
				{siteInfo?.cta_tagline
					? siteInfo?.cta_tagline
					: `Start your digital transformation with us!`}
			</h5>
			<div class="social__link-wrapper fl-row gap-2 gap-lg-4 mb-4">
				{#if socials?.facebook}
					<a
						href={socials.facebook}
						class="social--facebook"
						target="_blank"
						title={`${siteInfo.name} facebook Profile`}
					>
						<div class="sr-only">{siteInfo.name} facebook Profile</div>
					</a>
				{/if}
				{#if socials?.instagram}
					<a
						href={socials.instagram}
						class="social--instagram"
						target="_blank"
						title={`${siteInfo.name} instagram profile`}
					>
						<div class="sr-only">{siteInfo.name} instagram profile</div>
					</a>
				{/if}
				{#if socials?.linkedin}
					<a
						href={socials.linkedin}
						class="social--linkedin"
						target="_blank"
						title={`${siteInfo.name} linkedin Profile`}
					>
						<div class="sr-only">{siteInfo.name} linkedin Profile</div>
					</a>
				{/if}
				{#if socials?.pinterest}
					<a
						href={socials.pinterest}
						class="social--pinterest"
						target="_blank"
						title={`${siteInfo.name} pinterest profile`}
					>
						<div class="sr-only">{siteInfo.name} pinterest profile</div>
					</a>
				{/if}
				{#if socials?.threads}
					<a
						href={socials.threads}
						class="social--threads"
						target="_blank"
						title={`${siteInfo.name} threads profile`}
					>
						<div class="sr-only">{siteInfo.name} threads profile</div>
					</a>
				{/if}
				{#if socials?.tiktok}
					<a
						href={socials.tiktok}
						class="social--tiktok"
						target="_blank"
						title={`${siteInfo.name} tiktok profile`}
					>
						<div class="sr-only">{siteInfo.name} tiktok profile</div>
					</a>
				{/if}
				{#if socials?.whatsapp}
					<a
						href={socials.whatsapp}
						class="social--whatsapp"
						target="_blank"
						title={`${siteInfo.name} whatsapp Profile`}
					>
						<div class="sr-only">{siteInfo.name} whatsapp Profile</div>
					</a>
				{/if}

				{#if socials?.x}
					<a
						href={socials.x}
						class="social--x"
						target="_blank"
						title={`${siteInfo.name} X Profile`}
					>
						<div class="sr-only">{siteInfo.name} X Profile</div>
					</a>
				{/if}

				{#if socials?.youtube}
					<a
						href={socials.youtube}
						class="social--youtube"
						target="_blank"
						title={`${siteInfo.name} youtube profile`}
					>
						<div class="sr-only">{siteInfo.name} youtube profile</div>
					</a>
				{/if}

				<!-- <a href="#" class="social--youtube" target="_blank">
									<div class="sr-only">Youtube</div>
								</a> -->
			</div>
		</div>
		<div class="col-start-md-7 col-start-lg-7 col-start-2xl-9 col-end-md-13">
			<div class="fl-md-row jc-md-between gap-4 w-100 mb-5">
				<h6 class="uppercase leading-120 medium-15 shrink-0 w-md-30 mb-3 mb-md-0">Quick Links</h6>
				<div class="w-100 grid grid-template-col-2 gap-1 w-lg-70">
					<Link href="#about-section" scrollTo="#about-section" class="regular-13 footer__link"
						>About us</Link
					>

					<Link
						href="#services-section"
						class="regular-13 footer__link"
						scrollTo="#services-section">Our Services</Link
					>
					<Link
						href="#approach-section"
						class="regular-13 footer__link"
						scrollTo="#approach-section">Our Approach</Link
					>
					<Link href="#contact-section" class="regular-13 footer__link" scrollTo="#contact-section"
						>Contact Form</Link
					>
				</div>
			</div>
			<Newsletter />
		</div>
	</div>
	<div class="legal regular-12 font-mono uppercase tracking-wide text-center neutral-400 py-lg-2">
		{siteInfo.name} © <span id="currentYear">{CURRENT_YEAR}</span>
	</div>
</footer>
