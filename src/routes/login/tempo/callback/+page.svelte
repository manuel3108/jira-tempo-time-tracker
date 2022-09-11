<script lang="ts">
	import { page } from '$app/stores';
	import { saveTempoTokens } from '$lib/scripts/Config';
	import { fetchTokensFromCode } from '$lib/scripts/TempoAPI';
	import { onMount } from 'svelte';

	onMount(async () => {
		const code = $page.url.searchParams.get('code');
		if (code === null) {
			return;
		}

		const response = await fetchTokensFromCode(code);
		const data: any = response.data;
		saveTempoTokens(data.access_token, data.refresh_token, data.expires_in);
	});
</script>

<a href="/" class="button is-primary">Go to application</a>
