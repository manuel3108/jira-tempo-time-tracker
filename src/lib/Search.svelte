<script lang="ts">
	import { searchIssues } from './scripts/JiraClient';
	import type { Section } from './scripts/models/IssueSearchResponse';

	export let issueKey;

	let sections: Section[] = [];
	let searchElement: HTMLInputElement;
	let searchResultsOpen = false;

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

	<div class="suggestions" class:open={searchResultsOpen}>
		{#each sections as section}
			<div>
				{section.label}
				{#each section.issues as issue}
					<div>
						<button on:click={() => selectResult(issue.key, issue.summaryText)}
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
		background: red;
		left: 0;
		right: 0;
		max-height: 300px;
		overflow: auto;
		display: none;
	}

	.suggestions.open {
		display: block;
	}
</style>
