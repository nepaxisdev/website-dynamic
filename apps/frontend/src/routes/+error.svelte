<script lang="ts">
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Tag from '$lib/components/Tag/Tag.svelte';

	const ERROR_MAP: Record<number, { title: string; message: string }> = {
		400: {
			title: 'Bad Request',
			message: 'The server could not interpret the request parameters. Check your query syntax.'
		},
		401: {
			title: 'Unauthorized',
			message:
				'Access denied. Valid credentials or an active session are required to view this sector.'
		},
		403: {
			title: 'Forbidden',
			message:
				'Administrative lock in place. You do not have the clearance levels to access this resource.'
		},
		404: {
			title: 'Route Not Found',
			message:
				'The requested coordinates do not exist in the current database. It may have been relocated or purged.'
		},
		408: {
			title: 'Request Timeout',
			message: 'The connection window closed before the server could complete the handshake.'
		},
		429: {
			title: 'Rate Limit Exceeded',
			message: 'Too many requests detected. Connection throttled to prevent system instability.'
		},
		500: {
			title: 'System Failure',
			message:
				'An internal critical error has occurred. Our engineers have been notified of the breach.'
		},
		502: {
			title: 'Bad Gateway',
			message:
				'The upstream server returned an invalid response. Network bridge instability detected.'
		},
		503: {
			title: 'Service Unavailable',
			message: 'The server is currently offline for scheduled maintenance or capacity overload.'
		}
	};

	// Fallback for codes not explicitly defined
	const getError = (status: number) =>
		ERROR_MAP[status] || {
			title: 'Unknown Error',
			message: 'An undocumented exception has occurred.'
		};
	const status = $derived(page.status);
	const errorDetails = $derived(getError(status));
</script>

<section class="error-page">
	<div class="error-container">
		<div class="error-header" in:fly={{ y: 20, duration: 600, easing: cubicOut }}>
			<Tag variant="fill" color="accent" size="small">ERROR CODE: {status}</Tag>
		</div>

		<h1
			class="heading-1 error-title"
			in:fly={{ y: 20, duration: 600, delay: 100, easing: cubicOut }}
		>
			{errorDetails.title}
		</h1>

		<p
			class="error-message font-mono"
			in:fly={{ y: 20, duration: 600, delay: 200, easing: cubicOut }}
		>
			{errorDetails.message}
		</p>

		<div class="error-actions" in:fade={{ duration: 400, delay: 400, easing: cubicOut }}>
			<a href="/" class="btn--large btn--accent">
				<span class="btn__wrapper">
					<span class="btn__text">Return Home</span>
				</span>
			</a>

			<button class="btn--small btn--outline btn--white" onclick={() => window.location.reload()}>
				<span class="btn__wrapper">
					<span class="btn__text">Retry Connection</span>
				</span>
			</button>
		</div>
	</div>

	<div class="bg-decoration" aria-hidden="true">
		<span class="glitch-text">{status}</span>
	</div>
</section>

<style lang="scss">
	.error-page {
		min-block-size: 100vh;
		display: grid;
		place-items: center;
		position: relative;
		overflow: hidden;
		padding: 2rem;
	}

	.error-container {
		text-align: center;
		max-inline-size: 600px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.error-title {
		text-transform: uppercase;
		margin: 0;
	}

	.error-message {
		color: var(--clr-neutral-400);
		line-height: 1.6;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.bg-decoration {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 1;
		pointer-events: none;
		user-select: none;

		.glitch-text {
			font-size: 30vw;
			font-weight: 900;
			color: var(--clr-neutral-100);
			opacity: 0.03;
			font-family: 'Space Mono', monospace;
		}
	}
</style>
