<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	let showModal = $state(false);
	let showErrorInModal = $state(false);

	let email = $state('');
	let loading = $state(false);
	const modal = {
		headerText: '',
		contentText: ''
	};
	async function handleSubscribe() {
		loading = true;

		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await res.json();
			if (res.ok) {
				modal.headerText = email;
				modal.contentText = `Successfully subscribed to Nepaxis' Newsletter!`;
				email = '';
				showErrorInModal = false;
				showModal = true;
			} else {
				if (data.title === 'Member Exists') {
					modal.headerText = 'You already are subscribed.';
					modal.contentText = `${email} is already subscribed to our newsletter.`;
				}
				modal.headerText = data.title || 'Failed to subscribe';
				modal.contentText = data.detail || 'This email might not work.';
				showErrorInModal = false;
				showModal = true;
			}
		} catch (err) {
			modal.headerText = 'Something went wrong.';
			modal.contentText = '';
			console.error(err);
			showErrorInModal = true;
			showModal = true;
		} finally {
			loading = false;
		}
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleSubscribe();
	}}
	id="newsletter"
	class="fl-md-row jc-md-between gap-4 w-100 mb-5"
>
	<h6 class="uppercase leading-120 medium-15 shrink-0 w-md-30 mb-3 mb-md-0">Newsletter</h6>
	<div class="w-100">
		<label for="newsletterEmail" class="form__group mb-2">
			<div class="form__input">
				<input
					type="email"
					class="form__control inverted"
					name="newsletterEmail"
					placeholder="Email Address"
					id="newsletterEmail"
					bind:value={email}
					required
				/>
			</div>
		</label>
		<button
			class="btn--black btn--subscribe"
			id="newsletterSubmit"
			disabled={loading}
			class:disabled={loading}
		>
			<span class="btn__wrapper">
				<span class="btn__icon"></span><span class="btn__text"
					>{loading ? 'Subscribing...' : 'Subscribe'}</span
				>
			</span>
		</button>
	</div>
</form>

{#if showModal}
	<Modal bind:showModal>
		{#snippet header()}
			{modal.headerText}
		{/snippet}
		{#snippet content()}
			{modal.contentText}
			{#if showErrorInModal}
				<div class="mt-1">
					If it persists after some time, please email us at: <a
						class="link"
						href="mailto:support@nepaxis.com">support@nepaxis.com</a
					>
				</div>
			{/if}
		{/snippet}
	</Modal>
{/if}
