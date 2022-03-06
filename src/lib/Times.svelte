<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Duration from './Duration.svelte';
	import DurationData from './scripts/models/DurationData';
	import { Duration as DurationDate } from 'luxon';

	export let durations: DurationData[] = [];

	let durationAsString = '--:--';
	const eventDispatcher = createEventDispatcher();

	onMount(() => {
		durations = [new DurationData()];
	});

	function onChange() {
		let totalDuration = DurationDate.fromMillis(0);

		durations.forEach((duration) => {
			if (
				duration.duration.values != undefined &&
				duration.duration.values.milliseconds != undefined
			) {
				totalDuration = totalDuration.plus(duration.duration);
			}
		});

		durationAsString = totalDuration.toFormat('hh:mm');

		eventDispatcher('change');
	}

	function addDuration() {
		durations = [...durations, new DurationData()];
	}
</script>

<div class="mb-1">
	Duration: {durationAsString}
</div>

{#each durations as { duration, startTime, endTime }}
	<div class="mb-2">
		<Duration bind:duration bind:startTime bind:endTime on:change={onChange} />
	</div>
{/each}

<button class="button is-primary mb-2" on:click={addDuration}>Add Duration</button>

<style>
	button {
		width: 100%;
	}
</style>
