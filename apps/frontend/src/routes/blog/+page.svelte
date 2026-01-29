<script lang="ts">
	import '$lib/scss/components/_input.scss';
	import Sort, { type SortOption } from '$lib/components/Sort/Sort.svelte';
	import { ArticleCard } from '$lib/components/Cards';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import config from '$lib/config.js';
	import { goto, replaceState } from '$app/navigation';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import { page } from '$app/state';
	import type { Category } from '$backend/src/payload-types.js';

	const SORT_OPTIONS: SortOption[] = [
		{
			value: 'latest',
			name: 'Latest First'
		},
		{
			value: 'oldest',
			name: 'Oldest First'
		},
		{
			value: 'alpha-asc',
			name: 'A - Z'
		},
		{
			value: 'alpha-desc',
			name: 'Z - A'
		}
	];

	const { data } = $props();
	const page_data = $derived(data.articles);
	const categories = $derived(data.categories);
	let hasNextPage = $derived(page_data.hasNextPage);
	let hasPrevPage = $derived(page_data.hasPrevPage);
	let search_query = $derived(data.query);
	let querySubmitted = $derived(data.category !== '' || data.query !== '');
	let selectedCategory = $derived<string>(data.category !== '' ? data.category : 'all');
	let display_category = $derived(data.category !== '' ? data.category : 'all');
	let display_search_query = $derived(data.query);

	let currentSort = $state(
		SORT_OPTIONS.find((emt) => emt.value == data.sorting_mode)
	) as SortOption;
	let articles = $derived(page_data.docs);
	let currentPage = $derived(parseInt(page_data.page));
	let totalPages = $derived(page_data.totalPages);
	let totalArticles = $derived(page_data.totalDocs);

	const getData = async (newPage: number = currentPage) => {
		const params = new URLSearchParams();

		if (newPage === 1) {
			params.delete('page');
		} else {
			params.set('page', newPage.toString());
		}
		if (selectedCategory == 'all' || selectedCategory == '') {
			params.delete('category');
		} else {
			params.set('category', selectedCategory);
		}
		if (search_query !== '') {
			params.set('query', search_query);
		} else {
			params.delete('query');
		}
		if (currentSort.value !== config.blog.sorting) {
			params.set('sort', currentSort.value);
		} else {
			params.delete('sort');
		}

		const dataResponse = await fetch('/api/findArticles?' + params.toString());
		const newData = await dataResponse.json();
		articles = newData.docs;
		totalPages = newData.totalPages;
		hasNextPage = newData.hasNextPage;
		hasPrevPage = newData.hasPrevPage;
		currentPage = parseInt(newData.page);
		totalArticles = newData.totalDocs;

		const newUrl = `?${params.toString()}`;
		replaceState(newUrl === '?' ? '/blog' : newUrl, { page: page.state });
		goto('#blogMainSection');
	};
	const handleSortingChange = async () => {
		getData(1);
	};
</script>

<section class="blog__header-section mt-8 mb-3 mt-md-6 mt-lg-9">
	<h1 class="heading-1">
		<span class="sr-only">Nepaxis: </span>Article Collection
	</h1>
</section>
<section class="blog__filter">
	<h2 class="font-mono heading-6 text-center mb-3 sr-only neutral-400" id="blog__filter-title">
		Filter specific articles
	</h2>
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
			<option value={'all'}>All</option>

			{#each categories as category}
				<option value={category.slug}>{category.name}</option>
			{/each}
		</select>
		<div class="form--search">
			<input
				type="search"
				placeholder="Search by title or tag..."
				bind:value={search_query}
				class="form__control w-full form--search"
			/>
		</div>

		<button class="btn--large btn--accent" type="submit">
			<span class="btn__wrapper">
				<span class="btn__text">Search</span>
			</span>
		</button>
	</form>
</section>
{#if totalArticles > 0}
	<section class="blog__main-section mb-4 mb-md-6 mb-lg-9" id="blogMainSection">
		<div class="fl-row jc-between al-center mb-1 mb-md-3 fl-wrap gap-1">
			<p class="uppercase font-mono neutral-400 mb-0">
				<Tag variant="fill" color="accent" size="small">
					<span
						><strong>{totalArticles}</strong> Article{totalArticles > 1 ? 's ' : ' '} found
						{#if querySubmitted && display_search_query !== ''}
							found for <strong> '{display_search_query}' </strong>
						{/if}
						{#if querySubmitted && display_category !== 'all' && display_category !== ''}
							in <strong>
								'{categories.find((category: Category) => category.slug === display_category).name}'
							</strong>
						{/if}
					</span>
				</Tag>
			</p>
			<Sort bind:current={currentSort} options={SORT_OPTIONS} onAction={handleSortingChange} />
		</div>
		<ul class="blog__articles-grid strip-style">
			{#each articles as article}
				<ArticleCard {article} tag="li" />
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
		<Tag variant="fill" color="accent" size="small">
			<span
				><strong>{totalArticles}</strong> Article{totalArticles > 1 ? 's ' : ' '} found
				{#if querySubmitted && display_search_query !== ''}
					found for <strong> '{display_search_query}' </strong>
				{/if}
				{#if querySubmitted && display_category !== 'all' && display_category !== ''}
					in <strong>
						'{categories.find((category: Category) => category.slug === display_category).name}'
					</strong>
				{/if}
			</span>
		</Tag>
		<p class="heading-2 font-mono text-uppercase">No Articles found</p>
	</section>
{/if}

<style lang="scss">
	.blog__articles-grid {
		display: grid;
		container-name: article-card-wrapper;
		container-type: inline-size;
	}

	.select--category {
		inline-size: min(15rem, 100%);
	}
	.form--search {
		inline-size: min(100%, 20rem);
		max-inline-size: 100%;
		display: flex;

		.form__control {
			position: relative;
			inline-size: 100%;
		}
	}

	.filter__form {
		@media screen and (max-width: 767px) {
			flex-direction: column;
			& > * {
				max-inline-size: 100%;
				inline-size: 100%;
			}
		}
	}

	@media screen and (max-width: 767px) {
		.filter__form {
			background-color: var(--clr-dark-1000);
			padding: 2rem 1rem;
			border-radius: 1rem;
		}
	}
</style>
