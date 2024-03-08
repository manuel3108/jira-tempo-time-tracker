<script lang="ts">
	import type { DateTime } from 'luxon';
	import type DurationData from './scripts/models/DurationData';
	import type TaskData from './scripts/models/TaskData';

	export let showTimeTable = false;
	export let tasks: TaskData[] = [];

	let allDurations: { duration: DurationData; task: TaskData }[] = [];

	$: calculateDurations(tasks);

	export function update() {
		calculateDurations(tasks);
	}

	function calculateDurations(localTasks: TaskData[]) {
		allDurations = [];
		for (const task of localTasks) {
			if (!task.durations) {
				continue;
			}

			for (const duration of task.durations) {
				if (!duration.startTime) {
					continue;
				}
				allDurations.push({ duration, task });
			}
		}

		allDurations.sort((a, b) => a.duration.startTime.toMillis() - b.duration.startTime.toMillis());

		allDurations = allDurations;
	}

	function dateToString(date: DateTime) {
		if (!date.isValid) return '--:--';
		return date.toFormat('HH:mm');
	}
</script>

{#if showTimeTable}
	<div class="box">
		<div>Time table</div>
		<br />
		<table class="w-full">
			<thead>
				<tr>
					<td class="small">Start</td>
					<td class="small">End</td>
					<td class="small">Issue</td>
					<td class="large">Issue name</td>
					<td class="large">Description</td>
				</tr>
			</thead>
			<tbody>
				{#each allDurations as { duration, task }}
					<tr>
						<td>{dateToString(duration.startTime)}</td>
						<td>{dateToString(duration.endTime)}</td>
						<td>{task.issue}</td>
						<td>{task.issueName}</td>
						<td>{task.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	table {
		background-color: #4c5757;
		border-radius: 0.25rem;
		border-collapse: collapse;
	}

	td {
		padding: 0.25rem 0.5rem;
		border: 1px solid #687777;
	}

	thead tr,
	tbody tr:nth-child(2n) {
		background-color: #424949;
	}

	.small {
		width: 12%;
	}
	.large {
		width: 32%;
	}
</style>
