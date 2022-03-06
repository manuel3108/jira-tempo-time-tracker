<script lang="ts">
	import { DateTime, Duration } from 'luxon';
	import { createEventDispatcher } from 'svelte';

	export let duration: Duration;
	export let startTime: DateTime;
	export let endTime: DateTime;

	let startElement: HTMLInputElement;
	let endElement: HTMLInputElement;

	const eventDispatcher = createEventDispatcher();

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
	}

	function endWork() {
		endElement.value = nowAsString();
	}
</script>

<div class="duration">
	<input bind:this={startElement} type="time" class="start" on:change={onChange} />
	<button class="button is-primary" on:click={startWork}>Now</button>

	<input bind:this={endElement} type="time" class="end" on:change={onChange} />
	<button class="button is-primary" on:click={endWork}>Now</button>
</div>

<style>
	.duration {
		display: flex;
		justify-content: space-between;
	}
</style>
