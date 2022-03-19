<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Duration from './Duration.svelte';
	import DurationData from './scripts/models/DurationData';
	import { Duration as DurationDate } from 'luxon';

	export let durations: DurationData[] = [];
	export let durationAsTempoString: string = '';

	let durationAsString = '--:--';
	let roundedDurationAsString = '--:--';
	const eventDispatcher = createEventDispatcher();

	onMount(() => {
		if (durations == undefined || durations.length == 0) {
			durations = [new DurationData()];
		}
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

		var coeff = 1000 * 60 * 5;
		var rounded = new Date(Math.ceil(totalDuration.toMillis() / coeff) * coeff);
		var roundedDuration = DurationDate.fromMillis(rounded);
		durationAsTempoString = roundedDuration.toFormat(`hh'h' mm'm'`);

		durationAsString = totalDuration.toFormat('hh:mm');
		roundedDurationAsString = roundedDuration.toFormat(`hh'h' mm'm'`);

		eventDispatcher('change');
	}

	function addDuration() {
		durations = [...durations, new DurationData()];
	}
</script>

<div class="mb-1">
	Duration: {durationAsString}
	<div style="float: right;">
		{roundedDurationAsString}
	</div>
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
