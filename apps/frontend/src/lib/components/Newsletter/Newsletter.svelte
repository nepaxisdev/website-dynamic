<script lang="ts">
	let email = $state('');
	let loading = $state(false);
	let message = $state('');

	async function handleSubscribe() {
		loading = true;
		message = '';

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
				message = 'Successfully subscribed!';
				email = ''; // Clear input
			} else {
				message = data.message || 'Failed to subscribe';
			}
		} catch (err) {
			message = 'Network error. Please try again.';
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
		{#if message}
			<p>{message}</p>
		{/if}
	</div>
</form>
