<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';
	import { loadConfig, saveTempoTokens } from '$lib/scripts/Config';
	import { getTempoCallbackUrl } from '$lib/scripts/TempoLogin';

	import { onMount } from 'svelte';

	onMount(async () => {
		if (!browser) {
			return;
		}

		const code = $page.url.searchParams.get('code');

		const config = loadConfig();
		const data = {
			grant_type: 'authorization_code',
			client_id: config.tempo.clientId,
			client_secret: config.tempo.clientSecret,
			code: code,
			redirect_uri: getTempoCallbackUrl()
		};

		const response = await fetch('https://api.tempo.io/oauth/token/', {
			method: 'POST',
			body: new URLSearchParams(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		});

		const json = await response.json();
		saveTempoTokens(json.access_token, json.refresh_token);
	});
</script>

<a href="/" class="button is-primary">Go to application</a>
