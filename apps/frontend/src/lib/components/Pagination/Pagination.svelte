<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	const {
		class: className,
		currentPage,
		totalPages,
		hasNextPage,
		hasPrevPage,
		pageChange = $bindable()
	}: {
		currentPage: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
		pageChange: (page: number) => void;
	} & HTMLAttributes<HTMLElement> = $props();

	$inspect(currentPage);

	const totalPageArray = $derived.by<number[]>(() => {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	});
</script>

<div class={['pagination__wrapper', className]}>
	<a
		href={hasPrevPage ? `/blog?page=${currentPage - 1}` : `/blog?page=${currentPage}`}
		class={'btn--icon btn--ghost btn--pagination'}
		class:disabled={!hasPrevPage}
	>
		<span class="btn__wrapper">
			<span class="btn__text sr-only">Previous Page</span>
			<span class="btn__icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15 6L9 12L15 18"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</span>
	</a>
	<ul class="pagination__list strip-style">
		{#each totalPageArray as page}
			<li>
				<a
					href={`/blog?page=${page}`}
					class={'btn--icon btn--pagination'}
					class:btn--ghost={page !== currentPage}
					class:btn--active={page === currentPage}
					class:btn--accent={page === currentPage}
					onclick={(e) => {
						if (page == currentPage) {
							e.preventDefault();
						}
					}}
					aria-current={page === currentPage ? 'page' : undefined}
				>
					<span class="btn__wrapper">
						<span class="btn__text">
							{page}
						</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
	<a
		href={hasNextPage ? `/blog?page=${currentPage + 1}` : `/blog?page=${currentPage}`}
		class={'btn--icon btn--ghost btn--pagination'}
		class:disabled={!hasNextPage}
	>
		<span class="btn__wrapper">
			<span class="btn__text sr-only">Next Page</span>
			<span class="btn__icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 6L15 12L9 18"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</span>
	</a>
</div>

<style lang="scss">
	.pagination__list {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pagination {
		&__wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
