<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { ScrollSmoother } from 'gsap/ScrollSmoother';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const {
		class: className,
		href,
		onClick = undefined,
		scrollTo = undefined,
		children,
		...restProps
	} = $props();
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	type SmoothType = { smooth: ScrollSmoother | null };

	const smoothInstance = $derived<ScrollSmoother | null>(getContext<SmoothType>('smooth').smooth);

	let pathName = $derived(page.url.pathname);

	function handleClick(e: MouseEvent) {
		e.preventDefault();
		if (onClick) {
			onClick();
		}
		if (scrollTo && smoothInstance) {
			const targetUrl = new URL(href, window.location.origin);

			if (targetUrl.pathname === pathName) {
				const hash = targetUrl.hash;
				if (hash) {
					smoothInstance.scrollTo(hash, true);
					history.pushState(null, '', hash);
				} else {
					history.pushState(null, '', pathName);
					smoothInstance.scrollTo(0, true);
				}
			} else {
				goto(href);
			}
		} else {
			goto(href);
		}
	}
</script>

<a class={className} {href} {...restProps} onclick={handleClick}>
	{@render children()}
</a>
