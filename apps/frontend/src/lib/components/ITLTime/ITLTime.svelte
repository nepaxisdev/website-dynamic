<script lang="ts">
	const { timezone } = $props();
	let absTime = $state('');

	$effect(() => {
		setInterval(() => {
			absTime = new Intl.DateTimeFormat('en-US', {
				timeZone: timezone as string,
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}).format();
		}, 1000);
	});
</script>

<span>
	{absTime}
</span>
