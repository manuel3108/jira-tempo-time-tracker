<script lang="ts">
	import { goto } from '$app/navigation';
	import { loadConfig, type Config } from '$lib/scripts/Config';
	import { CONFIG_COOKIE_NAME } from '$lib/scripts/Defaults';
	import { onMount } from 'svelte';

	let config: Config;

	onMount(() => {
		config = loadConfig();
		if (!config.jira) config.jira = { clientId: '', clientSecret: '', cloudId: '', domain: '' };
		if (!config.tempo) config.tempo = { clientId: '', clientSecret: '' };
		if (!config.general) config.general = { openTimeTable: false };
	});

	let canSaveConfig = false;

	$: checkSaveConfig(config);

	function checkSaveConfig(config: Config) {
		if (!config || !config.jira || !config.tempo) canSaveConfig = false;
		else if (
			!config.jira.clientId ||
			!config.jira.clientSecret ||
			!config.jira.cloudId ||
			!config.jira.domain
		)
			canSaveConfig = false;
		else if (!config.tempo.clientId || !config.tempo.clientSecret) canSaveConfig = false;
		else canSaveConfig = true;
	}

	function saveConfig() {
		if (!config) return;

		localStorage.setItem(CONFIG_COOKIE_NAME, JSON.stringify(config));
		goto('/login/jira/redirect');
	}
</script>

{#if config}
	<div class="box">
		<div>Jira Settings</div>
		<div class="inputs">
			<div>
				<div>Client Id</div>
				<input type="text" bind:value={config.jira.clientId} />
			</div>
			<div>
				<div>Client secret</div>
				<input type="text" bind:value={config.jira.clientSecret} />
			</div>
			<div>
				<div>Cloud Id</div>
				<input type="text" bind:value={config.jira.cloudId} />
			</div>
			<div>
				<div>Jira Domain</div>
				<input type="text" bind:value={config.jira.domain} />
			</div>
		</div>
	</div>

	<div class="box">
		<div>Tempo Settings</div>
		<div class="inputs">
			<div>
				<div>Client Id</div>
				<input type="text" bind:value={config.tempo.clientId} />
			</div>
			<div>
				<div>Client secret</div>
				<input type="text" bind:value={config.tempo.clientSecret} />
			</div>
		</div>
	</div>

	<div class="box">
		<div>General</div>
		<div class="inputs">
			<div>
				<div>Open Time table by default</div>
				<input type="checkbox" bind:value={config.general.openTimeTable} />
			</div>
		</div>
	</div>

	{#if canSaveConfig}
		<button type="button" class="button is-primary" on:click={saveConfig}> Save config</button>
	{/if}
{/if}

<style>
	input[type='text'] {
		width: 100%;
	}

	.inputs > div {
		margin: 1rem 0;
	}
</style>
