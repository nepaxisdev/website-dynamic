<script module lang="ts">
	export type AvailableSocialIcons = 'pinterest' | 'x' | 'facebook' | 'threads' | 'linkedin';
	export interface ArticleShareAttributes {
		title: string;
		cover_image: string;
		addresses: AvailableSocialIcons[];
		mode?: 'light' | 'dark';
	}
	interface Props extends ArticleShareAttributes {
		share_label?: Snippet;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Social from '$lib/components/Social/Social.svelte';

	const { share_label, title, cover_image, addresses, mode = 'dark' }: Props = $props();

	let copySuccess = $state(false);
	const copyCurrentLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = window.location.href;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		}
	};

	const icon_color = $derived(mode === 'dark' ? '#eaeaea' : '#151515');
</script>

<div class="socials__wrapper">
	{#if share_label}
		<div class="uppercase text-lg mb-2 font-mono">{@render share_label()}</div>
	{:else}
		<div class="uppercase text-lg mb-2 font-mono">Share</div>
	{/if}
	<div class="left-section fl-row gap-2 items-center justify-between">
		{#if addresses.find((addr) => addr === 'pinterest')}
			<button
				onclick={() => {
					const text = encodeURIComponent(title);
					const image = encodeURIComponent(cover_image);
					const url = encodeURIComponent(window.location.href);
					return window.open(
						`https://pinterest.com/pin/create/link/?url=${url}&media=${image}&description=${text}`,
						'_blank',
						'width=500,height=500'
					);
				}}
				title="Pin this article"
				class="social__button"
			>
				<span class="sr-only">Pin this Article</span>
				<Social color={icon_color} name="pinterest" size={20} />
			</button>
		{/if}
		{#if addresses.find((addr) => addr === 'x')}
			<button
				type="button"
				title="Share on X (fka Twitter)"
				onclick={() => {
					const text = encodeURIComponent(title);
					const url = encodeURIComponent(window.location.href);
					return window.open(
						`https://x.com/intent/tweet?text=${text}&url=${url}`,
						'_blank',
						'width=500,height=500'
					);
				}}
				class="social__button"
			>
				<span class="sr-only">Share on X (f.k.a Twitter)</span>
				<Social color={icon_color} name="x" size={20} />
			</button>
		{/if}
		{#if addresses.find((addr) => addr === 'facebook')}
			<button
				onclick={() => {
					return window.open(
						`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
						'_blank',
						'width=500,height=500'
					);
				}}
				class="social__button"
				title="Share on Facebook"
			>
				<span class="sr-only">Share on Facebook</span>

				<Social color={icon_color} name="facebook" size={20} />
			</button>
		{/if}
		{#if addresses.find((addr) => addr === 'threads')}
			<button
				title="Share on Threads"
				onclick={() => {
					const text = encodeURIComponent(title);
					const url = encodeURIComponent(window.location.href);
					return window.open(
						`https://www.threads.net/intent/post?url=${url}&text=${text}`,
						'_blank',
						'width=500,height=500'
					);
				}}
				class="social__button"
			>
				<span class="sr-only">Share on Threads</span>
				<Social color={icon_color} name="threads" size={20} />
			</button>
		{/if}
		{#if addresses.find((addr) => addr === 'linkedin')}
			<button
				title="Share on LinkedIn"
				onclick={() => {
					const url = encodeURIComponent(window.location.href);
					return window.open(
						`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
						'_blank',
						'width=500,height=500'
					);
				}}
				class="social__button"
			>
				<span class="sr-only">Share on LinkedIn</span>
				<Social color={icon_color} name="linkedin" size={20} />
			</button>
		{/if}

		<button
			class="social__button relative after:content-['Copied'] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:translate-y-2 {!copySuccess
				? 'after:opacity-0'
				: 'after:opacity-1'} after:transition after:duration-[300ms] after:bg-black after:px-2 after:py-1 after:rounded-sm after:text-white"
			title="Copy Link"
			onclick={copyCurrentLink}
		>
			<Social color={icon_color} name="link" size={20} />
		</button>
	</div>
</div>
