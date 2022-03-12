<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import { createEventDispatcher, onMount } from 'svelte';

	export let duration: Duration;
	export let startTime: DateTime;
	export let endTime: DateTime;

	let startElement: HTMLInputElement;
	let endElement: HTMLInputElement;

	const eventDispatcher = createEventDispatcher();

	onMount(() => {
		if (startTime != undefined || endTime != undefined) {
			// parse dates as they are saved to strings during json serialization
			startTime = DateTime.fromISO(startTime);
			endTime = DateTime.fromISO(endTime);

			startElement.value = startTime.toFormat('HH:mm');
			endElement.value = endTime.toFormat('HH:mm');
			var event = new Event('change');
			endElement.dispatchEvent(event);
			event = new Event('change');
			startElement.dispatchEvent(event);
		} else {
			startWork();
		}
	});

	function onChange() {
		endTime = DateTime.fromFormat(endElement.value, 'HH:mm');
		startTime = DateTime.fromFormat(startElement.value, 'HH:mm');
		duration = endTime.diff(startTime);

		eventDispatcher('change');
	}

	function nowAsString() {
		let dt = DateTime.local();
		return dt.toFormat('HH:mm');
	}

	function startWork() {
		startElement.value = nowAsString();
		var event = new Event('change');
		startElement.dispatchEvent(event);
	}

	function endWork() {
		endElement.value = nowAsString();
		var event = new Event('change');
		endElement.dispatchEvent(event);
	}
</script>

<div class="duration">
	<input bind:this={startElement} type="time" class="start" on:change={onChange} />
	<button class="button is-primary" on:click={startWork} tabindex="-1">Now</button>

	<input bind:this={endElement} type="time" class="end" on:change={onChange} />
	<button class="button is-primary" on:click={endWork} tabindex="-1">Now</button>
</div>

<style>
	.duration {
		display: flex;
		justify-content: space-between;
	}
</style>
