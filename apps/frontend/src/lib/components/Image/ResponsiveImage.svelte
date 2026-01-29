<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import type { Media } from '$backend/src/payload-types';

	const {
		image,
		alternate_alt,
		...restProps
	}: { image: Media; alternate_alt: string } & HTMLAttributes<HTMLImageElement> = $props();
</script>

{#if image.sizes}
	<img
		loading="lazy"
		src={media_url + image.sizes.small?.url ? image.sizes.small?.url : image.url}
		srcset="
				{image.sizes.small ? `${media_url + image.sizes.small.url} 234w,` : ''}
				{image.sizes.card ? `${media_url + image.sizes.card.url} 500w,` : ''}
				{image.sizes.tablet ? `${media_url + image.sizes.tablet.url} 750w,` : ''}
				{image.sizes.desktop ? `${media_url + image.sizes.desktop.url} 1000w,` : ''}"
		class="w-full h-full object-cover"
		alt="Cover of {image.alt ?? image.alt ?? alternate_alt}"
		{...restProps}
	/>
{/if}

<style lang="scss">
	.article {
		&__image {
			aspect-ratio: 16 /9;
			inline-size: 100%;
		}
	}
</style>
