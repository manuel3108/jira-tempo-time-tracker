<script lang="ts">
	import { page } from '$app/stores';
	import { loadConfig, saveJiraTokens } from '$lib/scripts/Config';
	import { getJiraCallbackUrl } from '$lib/scripts/JiraLogin';

	import { onMount } from 'svelte';

	onMount(async () => {
		const code = $page.url.searchParams.get('code');

		const config = loadConfig();
		const data = {
			grant_type: 'authorization_code',
			client_id: config.jira.clientId,
			client_secret: config.jira.clientSecret,
			code: code,
			redirect_uri: getJiraCallbackUrl()
		};

		const response = await fetch('https://auth.atlassian.com/oauth/token', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const json = await response.json();
		saveJiraTokens(json.access_token, json.refresh_token);
	});
</script>

<a href="/" class="button is-primary">Go to application</a>
