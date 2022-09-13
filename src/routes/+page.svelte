<script lang="ts">
	import Map from '$lib/components/Map.svelte';

	const title = 'CACTUS data';
</script>

<sveltekit:head>
	<title>{title}</title>
</sveltekit:head>

<div>
	<Map />
</div>
