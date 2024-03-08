<script lang="ts">
	import { loadConfig } from '$lib/scripts/Config';
	import { getJiraAuthorizationUrl } from '$lib/scripts/JiraLogin';

	function doRedirect() {
		const config = loadConfig();
		const loginUrl = getJiraAuthorizationUrl(config.jira.clientId);

		window.location.href = loginUrl;
	}
</script>

<div class="box">
	<div>Information</div>
	<br />
	<div>Jira login is slow sometimes. Only press the button once, and wait!</div>
</div>

<button class="button is-primary" on:click={doRedirect}>Login to Jira</button>
