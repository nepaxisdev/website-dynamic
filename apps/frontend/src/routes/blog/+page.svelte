<script lang="ts">
	import Sort, { type SortOption } from '$lib/components/Sort/Sort.svelte';
	import { ArticleCard } from '$lib/components/Cards';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import config from '$lib/config.js';
	const { data } = $props();

	const page_data = $derived(data.articles);

	let hasNextPage = $derived(page_data.hasNextPage);
	let hasPrevPage = $derived(page_data.hasPrevPage);

	let search_query = $state('');

	const SORT_OPTIONS: SortOption[] = [
		{
			value: '-createdAt',
			name: 'Latest'
		},
		{
			value: 'createdAt',
			name: 'Oldest'
		}
	];

	let currentSort = $state(
		SORT_OPTIONS.find((emt) => emt.value == config.blog.sorting)
			? SORT_OPTIONS.find((emt) => emt.value == config.blog.sorting)
			: SORT_OPTIONS[0]
	) as SortOption;

	let articles = $derived(page_data.docs);
	let currentPage = $derived(parseInt(page_data.page));
	let totalPages = $derived(page_data.totalPages);

	const pageChange = async () => {
		const params = new URLSearchParams({
			page: currentPage.toString(),
			query: search_query ? search_query : '',
			sort: currentSort ? currentSort.value : ''
		});

		const dataResponse = await fetch('/api/findArticles?' + params.toString());
		const newData = await dataResponse.json();
		articles = newData.docs;
		totalPages = newData.totalPages;
		hasNextPage = newData.hasNextPage;
		hasPrevPage = newData.hasPrevPage;
		currentPage = newData.page;
	};
	const handleSortingChange = async () => {
		pageChange();
	};
</script>

<section class="blog__header-section my-4 my-md-6 mt-lg-9">
	<h1 class="heading-1">
		<span class="sr-only">Nepaxis: </span>Article Collection
	</h1>
</section>
<section class="blog__filter"></section>
<section class="blog__main-section mb-4 mb-md-6 mb-lg-9">
	<div class="fl-row jc-between mb-3">
		<p class="uppercase font-mono neutral-400">Showing: {articles.length} Articles</p>
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
