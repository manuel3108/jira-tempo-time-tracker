<script lang="ts">
	import { CONFIG_COOKIE_NAME } from '$lib/scripts/Defaults';

	import Cookies from 'js-cookie';

	function onFileSelected(event) {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(image);
		reader.onload = (e) => {
			const data: string = e.target.result as string;
			const json = JSON.parse(data);
			Cookies.set(CONFIG_COOKIE_NAME, JSON.stringify(json));
		};
	}
</script>

<div class="file-upload-wrapper">
	<label class="file-upload">
		<span class="mt-2 text-center leading-normal">Choose A file</span>
		<input type="file" class="hidden" accept=".json" on:change={(e) => onFileSelected(e)} />
	</label>
</div>

<a href="/" class="button is-primary">Login</a>
