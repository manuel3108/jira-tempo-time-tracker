<script lang="ts">
	import { goto } from '$app/navigation';
	import { configExists } from '$lib/scripts/Config';
	import TaskData from '$lib/scripts/models/TaskData';
	import Task from '$lib/Task.svelte';
	import { onMount } from 'svelte';

	let tasks: TaskData[] = [];

	onMount(() => {
		if (!configExists()) {
			goto('/upload/config');
		} else {
			addTask();
		}
	});

	function addTask() {
		tasks = [...tasks, new TaskData()];
	}
</script>

{#each tasks as task}
	<Task description={task.description} issueKey={task.issue} />
{/each}

<button class="button is-primary mt-1" on:click={addTask}>Add Task</button>

<style>
	button {
		width: 100%;
	}
</style>
