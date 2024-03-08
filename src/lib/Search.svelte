<script lang="ts">
	import { onMount } from 'svelte';
	import { searchIssues } from './scripts/JiraClient';
	import type { Section } from './scripts/models/IssueSearchResponse';
	import { clickOutside } from './scripts/clickOutside.js';

	export let issueKey = '';
	export let issueId = 0;
	export let issueName = '';

	let sections: Section[] = [];
	let searchElement: HTMLInputElement;
	let searchResultsOpen = false;
	let debounceTimer = 0;

	onMount(() => {
		if (issueKey != undefined) {
			searchElement.value = issueKey;
		}
	});

	function search(e) {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			searchDebounce(e);
		}, 200);
	}

	async function searchDebounce(e) {
		const value = e.target.value;

		if (!value) return;

		const content = await searchIssues(e.target.value);
		sections = content.sections;
		searchResultsOpen = true;
	}

	async function selectResult(id: number, key: string, text: string) {
		searchElement.value = `${key} - ${text}`;
		searchResultsOpen = false;

		issueKey = key;
		issueId = id;
		issueName = text;
	}
</script>

<div class="search">
	<input type="text" bind:this={searchElement} on:keyup={search} placeholder="issue" />

	<div
		class="suggestions p-2"
		class:open={searchResultsOpen}
		use:clickOutside
		on:click_outside={() => (searchResultsOpen = false)}
	>
		{#each sections as section}
			<div class="section pb-2">
				{section.label}
				{#each section.issues as issue}
					<div>
						<button
							class="p-1 rounded-sm"
							on:click={() => selectResult(issue.id, issue.key, issue.summaryText)}
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
