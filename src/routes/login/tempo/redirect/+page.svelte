<script lang="ts">
	import { loadConfig } from '$lib/scripts/Config';
	import { getTempoAuthorizationUrl } from '$lib/scripts/TempoLogin';
	import { onMount } from 'svelte';

	let loginUrl = '';
	onMount(() => {
		const config1 = loadConfig();
		loginUrl = getTempoAuthorizationUrl(config1.jira.domain, config1.tempo.clientId);
	});

	function doRedirect() {
		const config = loadConfig();
		const loginUrl = getTempoAuthorizationUrl(config.jira.domain, config.tempo.clientId);

		window.location.href = loginUrl;
	}
</script>

<div class="box">
	<div>Information</div>
	<br />
	<div>
		Tempo OAuth is bugged since multiple years. You will be redirected to the tempo OAuth page,
		which will fail loading.
		<br />
		If you have never logged in to Jira inside this app before, you might need to press the login button
		in the top right.
		<br />
		Navigate to the default dashboard and wait until the page is fully loaded. Then use your browsers
		back functionality (ALT + LEFT) to navigate back to the OAuth page.
	</div>
</div>

<button class="button is-primary" on:click={doRedirect}>Login to Tempo</button>
