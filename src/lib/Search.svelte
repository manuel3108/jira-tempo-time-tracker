<script lang="ts">
	import { onMount } from 'svelte';

	import { searchIssues } from './scripts/JiraClient';
	import type { Section } from './scripts/models/IssueSearchResponse';

	export let issueKey;

	let sections: Section[] = [];
	let searchElement: HTMLInputElement;
	let searchResultsOpen = false;

	onMount(() => {
		if (issueKey != undefined) {
			searchElement.value = issueKey;
		}
	});

	async function search(e) {
		const value = e.target.value;

		if (!value) return;

		const content = await searchIssues(e.target.value);
		sections = content.sections;
		searchResultsOpen = true;
	}

	async function selectResult(key, text) {
		searchElement.value = `${key} - ${text}`;
		searchResultsOpen = false;

		issueKey = key;
	}
</script>

<div class="search">
	<input type="text" bind:this={searchElement} on:keyup={search} placeholder="issue" />

	<div class="suggestions p-2" class:open={searchResultsOpen}>
		{#each sections as section}
			<div class="section pb-2">
				{section.label}
				{#each section.issues as issue}
					<div>
						<button
							class="p-1 rounded-sm"
							on:click={() => selectResult(issue.key, issue.summaryText)}
							>{@html issue.keyHtml} {@html issue.summary}</button
						>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.search {
		position: relative;
	}

	input {
		width: 100%;
	}

	.suggestions {
		position: absolute;
		background: #606060;
		left: 0;
		right: 0;
		max-height: 300px;
		overflow: auto;
		display: none;
	}

	.suggestions.open {
		display: block;
	}

	button {
		width: 100%;
		text-align: left;
	}

	button:focus,
	button:hover {
		background-color: #505050;
	}
</style>
