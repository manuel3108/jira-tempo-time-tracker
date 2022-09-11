<script lang="ts">
	import { tempoAccounts } from '$lib/stores/common';

	export let accountKey: string;
</script>

<select bind:value={accountKey}>
	<option selected disabled value="">Please select</option>
	{#each $tempoAccounts as account}
		<option value={account.id}>{account.name}</option>
	{/each}
</select>
