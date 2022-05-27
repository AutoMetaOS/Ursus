<script>
	import { onMount } from "svelte";

	export let //
		data = {
			Category: "None",
			Name: "None",
			Result: "Fail",
		};

	let card;
	const color = () => data.Result === "Pass";

	// Will remove card only if test passes
	onMount(() => setTimeout(() => (color() ? card.remove() : null), 2000));
</script>

<div class="card m10 †c" bind:this={card}>
	{data.Name} of {data.Category}
	<svg viewBox="0 0 32 32">
		{#if color()}
			<path stroke="#0f0" d="M2 20 L12 28 30 4" />
		{:else}
			<path stroke="#f00" d="M2 30 L30 2 M30 30 L2 2" />
		{/if}
	</svg>
</div>

<style>
	@keyframes fadeInOut {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	svg {
		margin-left: 10px;
		width: 16px;
		height: 16px;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
	}

	.card {
		text-transform: capitalize;
		color: #fff;
		animation: fadeInOut 2.5s forwards;
	}
</style>
