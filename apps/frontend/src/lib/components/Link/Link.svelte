<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother as SSM } from 'gsap/ScrollSmoother';
	import type { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const {
		class: className,
		href,
		children,
		onClick = undefined,
		scrollTo = undefined,
		...restProps
	} = $props();
	gsap.registerPlugin(ScrollTrigger, SSM);

	type SmoothType = { smooth: ScrollSmoother | null };

	const smoothInstance = $derived<ScrollSmoother | null>(getContext<SmoothType>('smooth').smooth);

	let pathName = $derived(page.url.pathname);

	function handleClick(e: MouseEvent) {
		e.preventDefault();
		if (onClick) {
			onClick();
		}
		if (scrollTo && smoothInstance) {
			if (!href) {
				console.log(href);
				return;
			}
			const linkAddress = new URL(href, page.url.origin);
			const linkPath = linkAddress.pathname;
			const linkHash = linkAddress.hash;

			if (linkAddress) {
				if (linkPath === '') {
					smoothInstance.scrollTo(linkAddress.toString(), true, 'top 100px');
				} else {
					if (pathName === linkPath) {
						smoothInstance.scrollTo(linkHash, true, 'top 100px');
					} else {
						goto(linkAddress);
					}
				}
			}
		}

		if (!smoothInstance || !scrollTo) {
			goto(href);
		}
	}
</script>

<a class={className} {href} {...restProps} onclick={handleClick}>
	{@render children()}
</a>
