<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import type DurationData from './scripts/models/DurationData';
	import Search from './Search.svelte';
	import Times from './Times.svelte';

	export let description = '';
	export let issueKey = '';
	export let durations: DurationData[];
	let durationAsTempoString = '';

	let eventDispatcher = createEventDispatcher();

	onMount(() => {
		if (durations == undefined) {
			durations = [];
		}
	});

	$: {
		eventDispatcher('textChange', {
			issueKey,
			description
		});
	}

	function timeChange() {
		eventDispatcher('timeChange');
	}

	function copyTicket() {
		navigator.clipboard.writeText(issueKey);
	}

	function copyDescription() {
		navigator.clipboard.writeText(description);
	}

	function copyDuration() {
		navigator.clipboard.writeText(durationAsTempoString);
	}
</script>

<div class="task p-2 mb-2 rounded-md">
	<div class="left pr-2">
		<div class="mb-1">
			Ticket & description
			<button class="button is-primary ml-2" on:click={copyDuration}>Copy Duration</button>
			<button class="button is-primary ml-2" on:click={copyDescription}>Copy description</button>
			<button class="button is-primary ml-2" on:click={copyTicket}>Copy ticket</button>
		</div>

		<Search bind:issueKey />
		<textarea class="mt-2" bind:value={description} />
	</div>
	<div class="right">
		<Times bind:durations on:change={timeChange} bind:durationAsTempoString />
	</div>
</div>

<style>
	textarea {
		width: 100%;
	}

	.left {
		width: 70%;
	}

	.right {
		width: 30%;
	}

	.task {
		display: flex;
		background-color: #353535;
	}

	button {
		font-size: 12px;
		padding-top: 3px;
		padding-bottom: 3px;
		float: right;
	}
</style>
