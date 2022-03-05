<script lang="ts">
	import Search from './Search.svelte';
	import Times from './Times.svelte';

	export let description = '';
	export let issueKey = '';
</script>

<div class="left pr-2">
	<Search bind:issueKey />
	<textarea class="mt-2" bind:value={description} />
</div>
<div class="right">
	<Times />
</div>

<style>
	textarea {
		width: 100%;
	}

	.left {
		float: left;
		width: 80%;
	}

	.right {
		width: 20%;
		float: right;
	}
</style>
