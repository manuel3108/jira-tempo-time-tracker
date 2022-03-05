<script lang="ts">
	import { onMount } from 'svelte';
	import Duration from './Duration.svelte';
	import DurationData from './scripts/models/DurationData';

	export let durations: DurationData[] = [];

	onMount(() => {
		durations = [new DurationData()];
	});

	function addDuration() {
		durations = [...durations, new DurationData()];
	}
</script>

{#each durations as duration}
	<div class="mb-2">
		<Duration />
	</div>
{/each}

<button class="button is-primary mb-2" on:click={addDuration}>Add Duration</button>

<style>
	button {
		width: 100%;
	}
</style>
