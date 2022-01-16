<script lang="ts">
	import { searchIssues } from '$lib/scripts/JiraClient';
	import type { Issue } from '$lib/scripts/models/IssueSearchResponse';

	let issues: Issue[] = [];

	async function search(e) {
		const value = e.target.value;

		if (!value) return;

		const content = await searchIssues(e.target.value);
		issues = content.sections[0].issues;
	}
</script>

<input type="text" on:keyup={search} />

{#each issues as issue}
	<div>
		<div>{@html issue.keyHtml}</div>
		<div>{@html issue.summary}</div>
	</div>
{/each}
