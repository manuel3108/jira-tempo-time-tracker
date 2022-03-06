<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type DurationData from './scripts/models/DurationData';
	import Search from './Search.svelte';
	import Times from './Times.svelte';

	export let description = '';
	export let issueKey = '';
	export let durations: DurationData[] = [];

	let eventDispatcher = createEventDispatcher();

	$: {
		eventDispatcher('textChange', {
			issueKey,
			description
		});
	}

	function timeChange() {
		eventDispatcher('timeChange');
	}
</script>

<div class="task p-2 mb-2 rounded-md">
	<div class="left pr-2">
		<div class="mb-1">Ticket & description</div>

		<Search bind:issueKey />
		<textarea class="mt-2" bind:value={description} />
	</div>
	<div class="right">
		<Times bind:durations on:change={timeChange} />
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
</style>
