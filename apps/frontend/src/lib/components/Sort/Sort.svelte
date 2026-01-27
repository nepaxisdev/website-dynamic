<script module lang="ts">
	export interface SortOption {
		name: string;
		value: string;
	}
</script>

<script lang="ts">
	import type { ChangeEventHandler, HTMLAttributes } from 'svelte/elements';

	let {
		options,
		current = $bindable(),
		onAction,
		class: className
	}: {
		options: SortOption[];
		current: SortOption;
		onAction: ChangeEventHandler<HTMLSelectElement>;
	} & HTMLAttributes<HTMLSelectElement> = $props();
</script>

<div class="sort-wrapper fl-row gap-1 al-center">
	<span class="regular-14 font-mono uppercase">Sorting</span>
	<select
		class={[className, 'btn btn--ghost select--sort']}
		bind:value={current.value}
		onchange={onAction}
	>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.select {
		&--sort {
			appearance: none;
		}
	}
</style>
