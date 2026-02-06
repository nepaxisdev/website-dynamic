<script lang="ts">
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { type Article } from '$backend/src/payload-types';
	import defaultImage from '$lib/assets/default-image.webp';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import moment from 'moment';
	const {
		article: _article,
		tag,
		index = 0
	}: { article: Article; tag: 'li' | 'article'; index?: number } = $props();

	const article = $derived(_article);

	const tags = $derived(article.tags);
	const cover_image = $derived(article.cover_image);
	const category = $derived.by(() => {
		if (typeof article.category === 'number') {
			return null;
		} else {
			return article.category;
		}
	});
	const parent_tag = $derived(tag);
	const created_on = $derived(moment(article.createdAt).format('MMM DD, YYYY'));

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

{#if parent_tag === 'li'}
	<li
		class="card article-card overflow-hidden fl-col"
		in:fly={{ y: 25, duration: 300, delay: index * 100, easing: cubicOut }}
	>
		<div class="article-card__image-wrapper">
			{#if typeof cover_image === 'number'}
				<!-- Handle the case where cover_image is a number -->
				<img
					src={defaultImage}
					alt="Default Placeholder"
					class="article-card__image w-100"
					loading="lazy"
				/>
			{:else}
				<img
					src={media_url + thumbnail}
					alt={typeof cover_image === 'number' ? 'Default Placeholder' : cover_image.alt}
					class="article-card__image w-100"
					loading="lazy"
				/>
			{/if}
		</div>
		<div class="article-card__content">
			<div class="article-card__tag_wrapper">
				<Tag variant="outline" color="accent" size="small">{created_on}</Tag>
				{#if category}
					<Tag color="white" size="small">{category.name}</Tag>
				{/if}
			</div>
			<div class="article-card__content-info">
				<div class="fl-row">
					<h3 class="article-card__title regular-56 mb-2">
						{article.title}
					</h3>
				</div>
				{#if tags && tags.length > 0}
					<div>
						<ul class="article-card__category strip-style fl-row gap-1">
							{#each tags as tag}
								<Tag variant="outline" color="light" size="small">{tag.tag}</Tag>
							{/each}
						</ul>
					</div>
				{/if}
				<div class="link-wrapper">
					<a href={`/blog/${article.slug}`} class="article-card__read-more"> Read </a>
				</div>
			</div>
		</div>
	</li>
{:else}
	<article
		class="card article-card overflow-hidden fl-col"
		in:fly={{ y: 25, duration: 300, delay: index * 100, easing: cubicOut }}
	>
		<div class="article-card__image-wrapper">
			<img
				src={thumbnail}
				alt={typeof cover_image === 'number' ? 'Default Placeholder' : cover_image.alt}
				class="article-card__image w-100"
				loading="lazy"
			/>
		</div>
		<div class="article-card__content">
			<div class="article-card__tag_wrapper">
				<Tag variant="outline" color="accent" size="small">{created_on}</Tag>
				{#if category}
					<Tag color="white" size="small">{category.name}</Tag>
				{/if}
			</div>
			<div class="article-card__content-info">
				<div class="fl-row">
					<h3 class="article-card__title regular-56 mb-2">
						{article.title}
					</h3>
				</div>
				<div>
					<ul class="article-card__category strip-style fl-row gap-1">
						{#each article.tags as tag}
							<Tag variant="outline" color="light" size="small">{tag}</Tag>
						{/each}
					</ul>
				</div>
				<div class="link-wrapper">
					<a href={`/blog/${article.slug}`} class="article-card__read-more"> Read </a>
				</div>
			</div>
		</div>
	</article>
{/if}

<style lang="scss">
	.article {
		&-card {
			--_card-gap: 1.5rem;
			--_image-size: 15rem;
			--_padding-x: 0;
			--_padding-y: 2rem;
			--_padding: var(--_padding-y, 2rem) var(--_padding-x, 2rem);
			--_image-object-position: center left;
			--_border-color: var(--clr-neutral-600);
			--card-hover-radius: 1rem;

			display: flex;
			flex-direction: column;
			gap: var(--_card-gap);
			padding: var(--_padding);
			position: relative;
			overflow: hidden;
			transition:
				padding 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
				background-color 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
				border-radius 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
				border-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

			border-block-start: 1px solid var(--_border-color);
			&:first-child {
				border-block-start: none;
			}

			&__image-wrapper {
				img {
					inline-size: min(17rem, 100%);
					aspect-ratio: 1;
					object-fit: cover;
					border-radius: var(--card-hover-radius);
					object-position: var(--_image-object-position, center left);
					transition: object-position 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
					background-color: var(--clr-neutral-400);
				}
			}
			&__content {
				display: flex;
				flex-direction: column;
				flex: 1 1 auto;
				gap: 1.5rem;
				flex-wrap: wrap;
			}
			&__title {
				max-inline-size: min(100%, 50rem);
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			&__read-more {
				// visibility: hidden;
				opacity: 0;
				inline-size: 0;
				block-size: 0;
				&:after {
					content: '';
					position: absolute;
					inset: 0;
				}
			}

			&__tag_wrapper,
			&__category {
				flex-wrap: wrap;
			}
		}
	}

	@container article-card-wrapper (min-width: 768px) {
		.article-card {
			flex-direction: row;
			--_card-gap: 2.5rem;
			&__image-wrapper {
				flex: 1 1 min(var(--_image-size), 100%);
				img {
					border-radius: 1.5rem;
				}
			}
			&__content {
				justify-content: space-between;
			}

			&__content {
				flex: 1 1 calc(100% - var(--_card-gap) - var(--_image-size));
			}

			&:hover {
				background-color: var(--clr-neutral-1000);
				--_padding-x: var(--_padding-y);
				--_image-object-position: center right;
				border-radius: var(--card-hover-radius);

				&,
				& + :global(.article-card) {
					--_border-color: transparent;
				}
			}
		}
	}

	@media (min-width: 768px) {
		.article {
			&-card {
				&:hover {
					background-color: var(--clr-neutral-1000);
					--_padding-x: var(--_padding-y);
					--_image-object-position: center right;
					border-radius: var(--card-hover-radius);

					&,
					& + :global(.article-card) {
						--_border-color: transparent;
					}
				}
			}
		}
	}
	@container article-card-wrapper (min-width: 1200px) {
		.article-card {
			--_card-gap: 4rem;
			--_padding-y: 3rem;
		}
	}
</style>
