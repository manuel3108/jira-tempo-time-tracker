<script lang="ts">
	import { CONFIG_COOKIE_NAME } from '$lib/scripts/Defaults';

	let showLogin = false;

	function onFileSelected(event) {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(image);
		reader.onload = (e) => {
			const data: string = e.target.result as string;
			const json = JSON.parse(data);
			localStorage.setItem(CONFIG_COOKIE_NAME, JSON.stringify(json));

			showLogin = true;
		};
	}
</script>

<div class="file-upload-wrapper">
	<label class="file-upload">
		<span class="mt-2 text-center leading-normal">Choose A file</span>
		<input type="file" class="hidden" accept=".json" on:change={(e) => onFileSelected(e)} />
	</label>
</div>

{#if showLogin}
	<a href="/login/jira/redirect" class="button is-primary">Login</a>
{/if}
