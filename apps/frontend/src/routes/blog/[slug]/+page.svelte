<script lang="ts">
	import { type Article, type Media } from '$backend/src/payload-types';
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import '$lib/scss/pages/_blogs.scss';
	import Share from '$lib/components/Share/Share.svelte';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import moment from 'moment';
	import ResponsiveImage from '$lib/components/Image/ResponsiveImage.svelte';
	import RichText from '$lib/components/RichText/RichText.svelte';

	const { data }: { data: { article: Article } } = $props();
	const mainData = $derived(data.article) as Article;

	const created_on = $derived.by(() => {
		return moment(mainData.createdAt).format('MMM DD, YYYY');
	});

	const cover_image = $derived(mainData.cover_image) as Media;
	const thumbnail = $derived.by(() => {
		if (typeof cover_image === 'number') {
			return null;
		}
		if (cover_image.sizes) {
			if (cover_image.sizes.thumbnail) {
				return cover_image.sizes.thumbnail.url;
			} else if (cover_image.sizes.small) {
				return cover_image.sizes.small.url;
			} else if (cover_image.sizes.card) {
				return cover_image.sizes.card.url;
			} else if (cover_image.sizes.tablet) {
				return cover_image.sizes.tablet.url;
			} else if (cover_image.sizes.desktop) {
				return cover_image.sizes.desktop.url;
			} else {
				return cover_image.url;
			}
		} else {
			return cover_image.url;
		}
	});
</script>

<!-- <Seo {media_url} siteSettings={{}} pageSettings={{}} /> -->
<section class="article__section content-grid py-4 py-md-6 py-lg-9">
	<div class="mb-5">
		<a href="/blog" class="pretty-link" aria-label="Back to Articles">
			<span class="btn__wrapper">
				<span class="btn__icon"
					><svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 7H15C16.3261 7 17.5979 7.52678 18.5355 8.46447C19.4732 9.40215 20 10.6739 20 12C20 13.3261 19.4732 14.5979 18.5355 15.5355C17.5979 16.4732 16.3261 17 15 17M4 7L7 4M4 7L7 10M8 17H11"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span><span class="btn__text">Back to Articles </span></span
			>
		</a>
	</div>
	<article id={`article-` + mainData.slug + '_'}>
		<div class="fl-row al-center gap-1 mb-3">
			<Tag variant="outline" color="accent" size="small">{created_on}</Tag>
			<!-- <span class="neutral-500">|</span> -->
			{#if typeof mainData.category !== 'number'}
				<Tag color="white" size="small">{mainData.category.name}</Tag>
			{/if}
		</div>
		<h1 class="heading-1 mb-4">{mainData.title}</h1>
		{#if cover_image && typeof cover_image !== 'number'}
			<ResponsiveImage
				image={cover_image}
				alternate_alt={mainData.title}
				class="rounded-image article__image"
			/>
		{/if}
		{#if mainData.tags && mainData.tags.length > 0}
			<div class="fl-row gap-1 my-3">
				{#each mainData.tags as tag}
					<Tag variant="outline" color="light" size="small" curvature="large">{tag.tag}</Tag>
				{/each}
			</div>
		{/if}
		<div class="grid-row jc-between ai-center mt-7 mb-7">
			<div class="col-4">
				<Share
					title={mainData.title}
					cover_image={media_url + thumbnail}
					addresses={['facebook', 'x', 'linkedin', 'pinterest', 'threads']}
				/>
			</div>
			<div class="col-8">
				<p class="regular-48">{mainData.short_quote}</p>
			</div>
		</div>
		<div class="article-content">
			<RichText content={mainData.text} />
		</div>
	</article>
</section>
<section class="additional__section py-4 py-md-6 py-lg-8 full-width content-grid">
	<div class="grid-row">
		<div class="col-lg-4">
			<h2 class="heading-2 mb-2 mb-md-3 mb-lg-4">Thank you for reading the article.</h2>
			<Share
				title={mainData.title}
				cover_image={media_url + thumbnail}
				addresses={['facebook', 'x', 'linkedin', 'pinterest', 'threads']}
				>{#snippet share_label()}Share this article{/snippet}</Share
			>
		</div>
		<div class="additional__wrapper col-start-lg-6 col-end-lg-13">
			<div class="mb-3 mb-md-4">
				<a href="/blog" class="pretty-link" aria-label="Back to Articles">
					<span class="btn__wrapper">
						<span class="btn__icon"
							><svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4 7H15C16.3261 7 17.5979 7.52678 18.5355 8.46447C19.4732 9.40215 20 10.6739 20 12C20 13.3261 19.4732 14.5979 18.5355 15.5355C17.5979 16.4732 16.3261 17 15 17M4 7L7 4M4 7L7 10M8 17H11"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span><span class="btn__text">Back to Articles </span></span
					>
				</a>
			</div>
			<ul class="strip-style" aria-label="Additional Articles">
				<li></li>
			</ul>
		</div>
	</div>
</section>
