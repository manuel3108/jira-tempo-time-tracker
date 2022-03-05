<script lang="ts">
	export let duration;
	export let startTime;
	export let endTime;

	let startElement: HTMLInputElement;
	let endElement: HTMLInputElement;

	function onChange() {
		duration = parseInt(endElement.value) - parseInt(startElement.value);
		console.log(endElement.value);
	}
</script>

<input bind:this={startElement} type="time" class="start" on:change={onChange} />
<input bind:this={endElement} type="time" class="end" on:change={onChange} />

<style>
	input {
		width: 48%;
	}

	.end {
		float: right;
	}
</style>
