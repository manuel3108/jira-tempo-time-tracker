<script lang="ts">
	import { loadConfig } from '$lib/scripts/Config';
	import { getJiraAuthorizationUrl } from '$lib/scripts/JiraLogin';

	function doRedirect() {
		const config = loadConfig();
		const loginUrl = getJiraAuthorizationUrl(config.jira.clientId);

		window.location.href = loginUrl;
	}
</script>

<button class="button is-primary" on:click={doRedirect}>Login to Jira</button>
