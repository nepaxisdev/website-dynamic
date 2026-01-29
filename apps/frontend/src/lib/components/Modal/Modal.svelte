<script>
	let { showModal = $bindable(), header, content, dismiss = null } = $props();

	let dialog = $state();
	let isShown = $state(false);
	$effect(() => {
		if (showModal) {
			dialog.showModal();
			isShown = true;
		}

		if (!showModal && isShown) {
			dialog.close();
			isShown = false;
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<div class="modal" class:modal--active={showModal}>
	<div class="modal__overlay"></div>
	<dialog
		class="modal__dialog"
		bind:this={dialog}
		onclose={() => (showModal = false)}
		onclick={(e) => {
			if (e.target === dialog) dialog.close();
		}}
	>
		<div>
			<button aria-label="Close Modal" class="modal__close" onclick={() => dialog.close()}>
				<svg width="20" viewBox="0 0 110 85" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 3L108 82M108 3L2 82" stroke="white" stroke-width="10" />
				</svg>
			</button>
			<div class="modal__body">
				{#if header}
					<div class="modal__header">
						<h5 class="modal__title">{@render header?.()}</h5>
					</div>
				{/if}
				{#if content}
					<div class="modal__content">
						{#if content}
							{@render content?.()}
						{/if}
					</div>
				{/if}
			</div>
			<div class="modal__actions fl-row jc-end al-center">
				<button
					onclick={(e) => {
						e.preventDefault();
						dialog.close();
					}}
					class="modal__dismiss btn--outline btn--white"
				>
					<span class="btn__text">
						{#if !dismiss}
							Dismiss
						{:else}
							{@render dismiss?.()}
						{/if}
					</span>
				</button>
			</div>
			<!-- svelte-ignore a11y_autofocus -->
		</div>
	</dialog>
</div>
