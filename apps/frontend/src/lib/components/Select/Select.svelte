<script lang="ts">
	import { createSelect } from './select.svelte';

	let options: string[] = ['Option 1', 'Option 2', 'Option 3'];
	let currentValue = $state('');

	const select = createSelect();
</script>

<button class="select__button">
	<span class="btn__wrapper">
		<span class="btn__text">{currentValue}</span>
		<span class="btn__icon"></span>
	</span>
</button>

<!-- <style lang="scss">
	.select_button {
	}
</style> -->
