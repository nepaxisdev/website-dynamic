<script lang="ts">
	import { tick } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import '$lib/scss/components/_input.scss';
	import Sort, { type SortOption } from '$lib/components/Sort/Sort.svelte';
	import { ArticleCard } from '$lib/components/Cards';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import config from '$lib/config.js';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import SEO from '$lib/components/SEO/SEO.svelte';
	import type { Category } from '$backend/src/payload-types.js';

	const SORT_OPTIONS: SortOption[] = [
		{ value: 'latest', name: 'Latest First' },
		{ value: 'oldest', name: 'Oldest First' },
		{ value: 'alpha-asc', name: 'A - Z' },
		{ value: 'alpha-desc', name: 'Z - A' }
	];

	const { data } = $props();

	// Internal State Management
	let isFetching = $state(false);
	let articles = $derived(data.articles.docs);
	let totalArticles = $derived(data.articles.totalDocs);
	let totalPages = $derived(data.articles.totalPages);
	let currentPage = $derived(parseInt(data.articles.page));
	let hasNextPage = $derived(data.articles.hasNextPage);
	let hasPrevPage = $derived(data.articles.hasPrevPage);

	// Filter States
	let search_query = $derived(data.query || '');
	let selectedCategory = $derived(data.category || 'all');
	let currentSort = $state(
		SORT_OPTIONS.find((emt) => emt.value == data.sorting_mode) || SORT_OPTIONS[0]
	) as SortOption;

	// Display labels for the results tag
	let querySubmitted = $derived(data.category !== '' || data.query !== '');
	let display_category = $derived(data.category || 'all');
	let display_search_query = $derived(data.query || '');

	const categories = $derived(data.categories);
	const page_seo = $derived(data.page_seo);

	const getData = async (newPage: number = currentPage) => {
		isFetching = true;
		const params = new URLSearchParams();

		// Build URL Parameters
		if (newPage > 1) params.set('page', newPage.toString());
		if (selectedCategory !== 'all' && selectedCategory !== '')
			params.set('category', selectedCategory);
		if (search_query !== '') params.set('query', search_query);
		if (currentSort.value !== config.blog.sorting) params.set('sort', currentSort.value);

		try {
			const dataResponse = await fetch('/api/findArticles?' + params.toString());
			const newData = await dataResponse.json();

			// Update Local State
			articles = newData.docs;
			totalPages = newData.totalPages;
			hasNextPage = newData.hasNextPage;
			hasPrevPage = newData.hasPrevPage;
			currentPage = parseInt(newData.page);
			totalArticles = newData.totalDocs;

			// Update Browser URL without reload
			const finalPath = params.toString() === '' ? '/blog' : `?${params.toString()}`;
			history.replaceState({}, '', finalPath);

			// DOM & GSAP Updates
			await tick();

			// Optional: Smooth scroll to results
			const section = document.getElementById('blogMainSection');
			if (section) section.scrollIntoView({ behavior: 'smooth' });

			requestAnimationFrame(() => {
				ScrollTrigger.refresh();
			});
		} catch (err) {
			console.error('Fetch Error:', err);
		} finally {
			isFetching = false;
		}
	};

	const handleSortingChange = async () => {
		await getData(1);
	};

	// Initial mount refresh
	$effect(() => {
		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
	});
</script>

<SEO pageSettings={page_seo} />

<section class="blog__header-section mt-8 mb-3 mt-md-6 mt-lg-9">
	<h1 class="heading-1">
		<span class="sr-only">Nepaxis: </span>Article Collection
	</h1>
</section>

<section class="blog__filter">
	<h2 class="sr-only" id="blog__filter-title">Filter specific articles</h2>
	<form
		class="filter__form fl-row gap-1 al-center mb-4 mb-md-6 mb-xl-7"
		onsubmit={(e) => {
			e.preventDefault();
			querySubmitted = true;
			display_category = selectedCategory;
			display_search_query = search_query;
			getData(1);
		}}
	>
		<select class="select--category" bind:value={selectedCategory}>
			<option value={'all'}>All Categories</option>
			{#each categories as category}
				<option value={category.slug}>{category.name}</option>
			{/each}
		</select>

		<div class="form--search">
			<input
				type="search"
				placeholder="Search by title or tag..."
				bind:value={search_query}
				class="form__control w-full"
			/>
		</div>

		<button class="btn--large btn--accent" type="submit" disabled={isFetching}>
			<span class="btn__wrapper">
				<span class="btn__text">{isFetching ? '...' : 'Search'}</span>
			</span>
		</button>
	</form>
</section>

{#if totalArticles > 0 || isFetching}
	<section class="blog__main-section mb-4 mb-md-6 mb-lg-9" id="blogMainSection">
		<div class="fl-row jc-between al-center mb-1 mb-md-3 fl-wrap gap-1">
			<p class="uppercase font-mono neutral-400 mb-0">
				<Tag variant="fill" color="accent" size="small">
					<span>
						{#if isFetching}
							<strong>LOADING RESULTS...</strong>
						{:else}
							<strong>{totalArticles}</strong> Article{totalArticles > 1 ? 's ' : ' '} found
							{#if querySubmitted && display_search_query !== ''}
								for <strong> '{display_search_query}' </strong>
							{/if}
							{#if querySubmitted && display_category !== 'all' && display_category !== ''}
								in <strong>
									'{categories.find((c: Category) => c.slug === display_category)?.name ||
										display_category}'
								</strong>
							{/if}
						{/if}
					</span>
				</Tag>
			</p>
			<Sort bind:current={currentSort} options={SORT_OPTIONS} onAction={handleSortingChange} />
		</div>

		<ul class="blog__articles-grid strip-style" style:opacity={isFetching ? 0.5 : 1}>
			{#each articles as article, i (article.id)}
				<ArticleCard {article} tag="li" index={i} />
			{/each}
		</ul>

		<div class="pagination__wrapper mt-6">
			<Pagination {currentPage} {totalPages} {getData} {hasNextPage} {hasPrevPage} />
		</div>
	</section>
{:else}
	<section
		class="no__blog py-4 py-pd-6 py-lg-9 mb-4 mb-md-6 mb-lg-9 px-4 bg-dark-600 rounded-md"
		id="blogMainSection"
	>
		<p class="heading-2 font-mono text-uppercase">No Articles Found</p>
		<button
			class="btn--small btn--primary"
			onclick={() => {
				selectedCategory = 'all';
				search_query = '';
				getData(1);
			}}
		>
			Clear Filters
		</button>
	</section>
{/if}

<style lang="scss">
	.blog__articles-grid {
		display: grid;
		container-name: article-card-wrapper;
		container-type: inline-size;
		transition: opacity 0.2s ease;
	}
	.select--category {
		inline-size: min(15rem, 100%);
	}
	.form--search {
		inline-size: min(100%, 20rem);
		max-inline-size: 100%;
		display: flex;
		.form__control {
			inline-size: 100%;
		}
	}
	.filter__form {
		@media screen and (max-width: 767px) {
			flex-direction: column;
			background-color: var(--clr-dark-1000);
			padding: 2rem 1rem;
			border-radius: 1rem;
			& > * {
				inline-size: 100%;
			}
		}
	}
</style>
