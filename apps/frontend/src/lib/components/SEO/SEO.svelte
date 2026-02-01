<script lang="ts">
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import { page } from '$app/state';
	import type { SiteSetting } from '$backend/src/payload-types';
	import { getContext } from 'svelte';
	const { pageSettings } = $props();

	const siteSettings = getContext<{ settings: SiteSetting }>('site-settings')
		.settings as SiteSetting;

	const globalSEO = $derived(siteSettings.page_seo);
	const pageURL = $derived(page.url.href);
	const homepageURL = $derived(page.url.origin);

	const basicSettings = $derived(siteSettings.basic_settings);

	const title = $derived.by(() => {
		if (pageSettings && pageSettings.page_title) {
			return pageSettings.page_title;
		}
		return globalSEO.default_title;
	});

	const og_title = $derived.by(() => {
		if (pageSettings && pageSettings.page_seo && pageSettings.page_seo.meta_title) {
			return pageSettings.page_seo.meta_title;
		}
		if (title) {
			return title;
		}
		return globalSEO.default_title;
	});

	const site_name = $derived(globalSEO.site_name ?? globalSEO.default_title);
	const og_image = $derived.by(() => {
		if (pageSettings && pageSettings.page_seo && pageSettings.page_seo.meta_image) {
			return pageSettings.page_seo.meta_image;
		}
		return globalSEO.default_og_image;
	});
	const keywords = $derived.by(() => {
		if (pageSettings && pageSettings.page_seo && pageSettings.page_seo.keywords) {
			return pageSettings.page_seo.keywords;
		}
		return globalSEO.default_keywords;
	});

	const og_description = $derived.by(() => {
		if (pageSettings && pageSettings.page_seo && pageSettings.page_seo.meta_description) {
			return pageSettings.page_seo.meta_description;
		}
		return basicSettings.description ?? basicSettings.tagline ?? basicSettings.name ?? 'Nepaxis';
	});
	let preventIndexing = $derived.by(() => {
		if (pageSettings && pageSettings.page_seo) {
			return pageSettings.page_seo;
		}
		return false;
	});
</script>

<svelte:head>
	<title>{title} | {globalSEO.title_suffix ?? basicSettings.name}</title>

	<link rel="canonical" href={pageURL} />
	<meta name="description" content={og_description} />
	<meta property="og:description" content={og_description} />
	<meta itemprop="description" content={og_description} />
	<meta name="twitter:description" content={og_description} />

	<meta property="og:title" content="{og_title} | {globalSEO.title_suffix ?? basicSettings.name}" />
	<meta itemprop="name" content="{og_title} | {globalSEO.title_suffix ?? basicSettings.name}" />
	<meta
		name="twitter:title"
		content="{og_title} | {globalSEO.title_suffix ?? basicSettings.name}"
	/>

	<meta name="keywords" content={keywords} />

	{#if og_image}
		<meta
			itemprop="image"
			content={media_url +
				(og_image?.sizes?.small.url ??
					og_image?.sizes?.thumbnail?.url ??
					og_image.thumbnailURL ??
					og_image.url)}
		/>
		<meta
			name="twitter:image"
			content={media_url +
				(og_image?.sizes?.small.url ??
					og_image?.sizes?.thumbnail?.url ??
					og_image.thumbnailURL ??
					og_image.url)}
		/>
		<meta
			name="og:image"
			content={media_url +
				(og_image?.sizes?.small.url ??
					og_image?.sizes?.thumbnail?.url ??
					og_image.thumbnailURL ??
					og_image.url)}
		/>
	{/if}

	<meta property="og:url" content={pageURL} />
	<meta property="og:site_name" content={site_name} />
	<meta property="og:see_also" content={homepageURL} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={pageURL} />
	{#if !preventIndexing}
		<meta name="robots" content="noindex, follow" />
	{/if}
</svelte:head>
