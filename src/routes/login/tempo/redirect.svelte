<script lang="ts">
	import { loadConfig } from '$lib/scripts/Config';
	import { getTempoAuthorizationUrl } from '$lib/scripts/TempoLogin';

	function doRedirect() {
		const config = loadConfig();
		const loginUrl = getTempoAuthorizationUrl(config.jira.domain, config.tempo.clientId);

		window.location.href = loginUrl;
	}
</script>

<button class="button is-primary" on:click={doRedirect}>Login to Tempo</button>
