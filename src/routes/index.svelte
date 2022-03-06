<script lang="ts">
	import { goto } from '$app/navigation';
	import { configExists } from '$lib/scripts/Config';
	import TaskData from '$lib/scripts/models/TaskData';
	import Task from '$lib/Task.svelte';
	import { onMount } from 'svelte';
	import { Duration, DateTime } from 'luxon';

	let tasks: TaskData[] = [];
	let durationAsString = '--:--';
	let changeDetected = false;
	let isMounted = false;

	$: {
		if (isMounted) {
			console.log(changeDetected);
			if (!changeDetected) {
				window.onbeforeunload = null;
			} else {
				window.onbeforeunload = function () {
					return true;
				};
			}
		}
	}

	onMount(() => {
		if (!configExists()) {
			goto('/upload/config');
		} else {
			addTask();
		}

		isMounted = true;
	});

	function addTask() {
		tasks = [...tasks, new TaskData()];
	}

	function onTimeChange() {
		let totalDuration = Duration.fromMillis(0);

		tasks.forEach((task) => {
			task.durations.forEach((duration) => {
				if (
					duration.duration.values != undefined &&
					duration.duration.values.milliseconds != undefined
				) {
					totalDuration = totalDuration.plus(duration.duration);
				}
			});
		});

		durationAsString = totalDuration.toFormat('hh:mm');
		changeDetected = true;
	}

	function onTextChange() {
		changeDetected = true;
	}

	function download(content, fileName, contentType) {
		var a = document.createElement('a');
		var file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}

	function downloadTasks() {
		changeDetected = false;
		const date = DateTime.now().toFormat('dd-MM-yyyy');
		download(JSON.stringify(tasks), `tasks_${date}.json`, 'application/json');
	}
</script>

<div class="mb-2 header">
	<div class="left">
		Total Duration: {durationAsString}
	</div>
	<div class="right">
		<button class="button is-primary mt-1" on:click={downloadTasks}>Download</button>
	</div>
</div>

{#each tasks as task}
	<Task
		bind:description={task.description}
		bind:issueKey={task.issue}
		bind:durations={task.durations}
		on:timeChange={onTimeChange}
		on:textChange={onTextChange}
	/>
{/each}

<button class="button is-primary mt-1 add-task" on:click={addTask}>Add Task</button>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}

	.add-task {
		width: 100%;
	}
</style>
