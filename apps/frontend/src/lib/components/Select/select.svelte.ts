import type { HTMLOptionAttributes } from 'svelte/elements';
import { SvelteMap } from 'svelte/reactivity';
type Option = {
	value: string;
	label: string;
};
class SelectState {
	id = $state<string>();
	options = $state<Option[]>([]);
	currentValue = $state<Option>();
	constructor(id: string) {
		this.id = id;
	}

	addOption(option: Option) {
		this.options.push(option);
	}
}

export const selects = new SvelteMap();

export function createSelect(): SelectState {
	const id = crypto.randomUUID();
	return new SelectState(id);
}
