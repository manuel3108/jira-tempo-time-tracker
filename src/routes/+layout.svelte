<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
