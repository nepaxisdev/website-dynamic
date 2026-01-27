<script lang="ts">
	import Sort, { type SortOption } from '$lib/components/Sort/Sort.svelte';
	import { ArticleCard } from '$lib/components/Cards';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import config from '$lib/config.js';
	import { goto, replaceState } from '$app/navigation';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import { page } from '$app/state';

	const { data } = $props();
	const page_data = $derived(data.articles);
	let hasNextPage = $derived(page_data.hasNextPage);
	let hasPrevPage = $derived(page_data.hasPrevPage);
	let search_query = $state('');

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

	let currentSort = $state(
		SORT_OPTIONS.find((emt) => emt.value == data.sorting_mode)
	) as SortOption;

	let articles = $derived(page_data.docs);
	let currentPage = $derived(parseInt(page_data.page));
	let totalPages = $derived(page_data.totalPages);
	const totalArticles = $derived(page_data.totalDocs);

	const pageChange = async (newPage: number = currentPage) => {
		const params = new URLSearchParams();

		if (newPage === 1) {
			params.delete('page');
		} else {
			params.set('page', newPage.toString());
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

		const newUrl = `?${params.toString()}`;
		replaceState(newUrl === '?' ? '/blog' : newUrl, { page: page.state });
		goto('#blogMainSection');
	};
	const handleSortingChange = async () => {
		pageChange(1);
	};
</script>

<section class="blog__header-section my-4 mt-md-6 mt-lg-9">
	<h1 class="heading-1">
		<span class="sr-only">Nepaxis: </span>Article Collection
	</h1>
</section>
<section class="blog__filter bg-dark-600 rounded-md p-4 mb-4">
	<h2 class="font-mono font-regular uppercase dark-500 regular-16" id="blog__filter-title">
		Filter
	</h2>

	<div class="select--category fl-row gap-1 al-center jc-center">
		<select></select>
		<input type="search" bind:value={search_query} />
		<button class="btn--large btn--accent">
			<span class="btn__wrapper">
				<span class="btn__text">Search</span>
			</span>
		</button>
	</div>
</section>
<section class="blog__main-section mb-4 mb-md-6 mb-lg-9" id="blogMainSection">
	<div class="fl-row jc-between al-center mb-3">
		<p class="uppercase font-mono neutral-400 mb-0">
			<Tag variant="fill" color="accent" size="small"
				><span><strong>{totalArticles}</strong> Articles</span></Tag
			>
		</p>
		<Sort bind:current={currentSort} options={SORT_OPTIONS} onAction={handleSortingChange} />
	</div>
	<ul class="blog__articles-grid strip-style">
		{#each articles as article}
			<ArticleCard {article} tag="li" />
		{/each}
	</ul>
	<div class="pagination__wrapper mt-6">
		<Pagination {currentPage} {totalPages} {pageChange} {hasNextPage} {hasPrevPage} />
	</div>
</section>

<style lang="scss">
	.blog__articles-grid {
		display: grid;
		container-name: article-card-wrapper;
		container-type: inline-size;
	}
</style>
