<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Accounts from './Accounts.svelte';
	import { getTempoAccountForIssue } from './scripts/JiraClient';
	import type DurationData from './scripts/models/DurationData';
	import { convertAccountIdToAccountKey, getRoundedDuration } from './scripts/TaskHelper';
	import { bookTempoWorklog } from './scripts/TempoAPI';
	import Search from './Search.svelte';
	import Times from './Times.svelte';
	import { tempoAccounts } from '$lib/stores/common';

	export let description = '';
	export let issueKey = '';
	export let durations: DurationData[];
	let durationAsTempoString = '';
	let accountId = '';
	let taskBooked = false;
	let taskBookButtonText = 'Book time';
	let isCurrentTask = false;

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

	$: {
		fetchAccountForSelectedIssue(issueKey);
	}

	async function fetchAccountForSelectedIssue(issueKey: string) {
		if (issueKey === undefined || issueKey === '') return;

		accountId = await getTempoAccountForIssue(issueKey);
	}

	$: {
		if (durations !== undefined) {
			const invalid = durations.filter((x) => x.endTime !== undefined && !x.endTime.isValid);
			isCurrentTask = invalid.length > 0;
		}
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

	async function bookTempoTime() {
		taskBookButtonText = 'Waiting...';

		const roundedDuration = getRoundedDuration(durations);
		const accountKey = convertAccountIdToAccountKey(accountId);
		await bookTempoWorklog(issueKey, description, accountKey, roundedDuration);

		taskBooked = true;
		taskBookButtonText = 'Booked!';
	}
</script>

<div class="task-wrapper">
	<div class="task p-2 mb-2 rounded-md task" class:current-task={isCurrentTask}>
		<div class="left pr-2">
			<div class="mb-1">
				Ticket & description
				<button class="button is-primary ml-2" on:click={copyDuration}>Copy rounded duration</button
				>
				<button class="button is-primary ml-2" on:click={copyDescription}>Copy description</button>
				<button class="button is-primary ml-2" on:click={copyTicket}>Copy ticket</button>
			</div>

			<Search bind:issueKey />
			<Accounts bind:accountKey={accountId} />
			<textarea class="mt-2" bind:value={description} />
		</div>
		<div class="right">
			<Times bind:durations on:change={timeChange} bind:durationAsTempoString />
			<button disabled={taskBooked} on:click={bookTempoTime} class="button is-primary">
				{taskBookButtonText}
			</button>
		</div>
	</div>
	<div class="task-overlay" class:active={taskBooked} class:booked={taskBooked} />
</div>

<style>
	@keyframes currentTaskAnimation {
		50% {
			background-color: #436d9a55;
		}
	}

	.task-wrapper {
		position: relative;
	}

	.task-overlay.active {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0.3;
	}

	.task-overlay.booked {
		background-color: lightgreen;
	}

	.task.current-task {
		animation-name: currentTaskAnimation;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}

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

	.left button {
		font-size: 12px;
		padding-top: 3px;
		padding-bottom: 3px;
		float: right;
	}

	.right button {
		width: 100%;
	}
</style>
