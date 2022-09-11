<script lang="ts">
	import { page } from '$app/stores';
	import { loadConfig, saveTempoTokens } from '$lib/scripts/Config';
	import { getTempoCallbackUrl } from '$lib/scripts/TempoLogin';
	import { fetch, Body, ResponseType } from '@tauri-apps/api/http';
	import { onMount } from 'svelte';

	let a = '';

	onMount(async () => {
		const code = $page.url.searchParams.get('code');
		if (code === null) {
			return;
		}

		const config = loadConfig();
		const dataA: Record<string, string> = {
			grant_type: 'authorization_code',
			client_id: config.tempo.clientId,
			client_secret: config.tempo.clientSecret,
			code: code,
			redirect_uri: getTempoCallbackUrl()
		};

		const response = await fetch('https://api.tempo.io/oauth/token/', {
			method: 'POST',
			body: Body.text(new URLSearchParams(dataA).toString()),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			responseType: ResponseType.JSON
		});

		const data: any = response.data;
		saveTempoTokens(data.access_token, data.refresh_token);
	});
</script>

<a href="/" class="button is-primary">Go to application</a>

{a}
