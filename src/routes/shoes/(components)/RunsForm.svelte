<script lang="ts">
	import FilterRadio from './FilterRadio.svelte';
	import type { RunMap } from '$lib/types';
	import { Slider } from '$lib/components/ui/slider';
	import Label from '$lib/components/ui/label/label.svelte';
	import { page } from '$app/stores';

	const RUNS: RunMap[] = [
		{
			label: 'Race',
			specs: [
				{
					name: 'categories',
					value: ['Racing']
				}
			]
		},
		{
			label: 'Tempo',
			specs: [
				{
					name: 'categories',
					value: ['Lightweight', 'Racing']
				},
				{
					name: 'maxWeight',
					value: 10
				}
			]
		},
		{
			label: 'Daily',
			specs: [
				{
					name: 'categories',
					value: ['Cushioning']
				},
				{
					name: 'minWeight',
					value: 7
				},
				{
					name: 'maxWeight',
					value: 10
				}
			]
		},
		{
			label: 'Easy',
			specs: [
				{
					name: 'categories',
					value: ['Cushioning']
				},
				{
					name: 'minWeight',
					value: 10
				}
			]
		},
		{
			label: 'Long',
			specs: [
				{
					name: 'categories',
					value: ['Racing', 'Cushioning', 'Lightweight']
				},
				{
					name: 'maxWeight',
					value: 9
				}
			]
		}
	];

	const PRONATION: RunMap[] = [
		{
			label: 'Overpronation',
			specs: [
				{
					name: 'categories',
					value: ['Stability']
				}
			]
		},
		{
			label: 'Neutral',
			specs: [
				{
					name: 'categories',
					value: ['Cushioning']
				}
			]
		},
		{
			label: 'Underpronation',
			specs: [
				{
					name: 'categories',
					value: ['Cushioning']
				}
			]
		}
	];

	let pronation: RunMap | null = null;
	let run: RunMap | null = null;
	let strike: number = 6;
	let hasChanged = false;

	function updatePronation(newPronation: RunMap | null) {
		pronation = newPronation;
	}

	function updateRun(newRun: RunMap | null) {
		if (pronation?.label === 'Overpronation') {
			newRun = newRun?.specs.map((spec) => spec.value.replace('Cushioning', 'Stability'));
			console.log(newRun);
		}
		run = newRun;
	}

	// Initialize state from page store on mount
	$: if ($page.url.searchParams.has('state')) {
		const storedState = JSON.parse($page.url.searchParams.get('state') || '');
		pronation = storedState.pronation || null;
		run = storedState.run || null;
		strike = storedState.strike || 6;
	}

	$: state = JSON.stringify({
		pronation,
		run,
		strike
	});
</script>

<Label>Foot Strike:</Label>
<div class="flex flex-col gap-2">
	<Slider
		value={[strike]}
		max={12}
		step={0.5}
		onValueChange={(v) => {
			strike = v[0];
			hasChanged = true;
		}}
	/>
	<div class="flex justify-between text-sm text-muted-foreground">
		<span>Heel</span>
		<span>Middle</span>
		<span>Toe</span>
	</div>
</div>
{#if hasChanged}
	<input type="hidden" name={'minDrop'} value={[Math.abs(strike - 12) - 2]} />
	<input type="hidden" name={'maxDrop'} value={[Math.abs(strike - 12) + 2]} />
{/if}
<FilterRadio all={PRONATION} state={pronation} label="Pronation" updateState={updatePronation} />
<FilterRadio all={RUNS} state={run} label="Run Type" updateState={updateRun} />

<input type="hidden" name="state" bind:value={state} />
