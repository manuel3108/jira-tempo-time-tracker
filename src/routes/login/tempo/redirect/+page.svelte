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

<button class="button is-primary" on:click={doRedirect}>Login to Tempo</button>
