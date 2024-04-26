<script lang="ts">
    import type { RunMap } from '../../types';
	import FilterRadio from './FilterRadio.svelte';
	import { Slider } from '$lib/components/ui/slider';
	import Label from '$lib/components/ui/label/label.svelte';
	import { page } from '$app/stores';
    import { RUNS, STABLE_RUNS, PRONATION } from '../../constants';

	let pronation: RunMap | null = null;
	let run: RunMap | null = null;
	let strike: number = 6;
	let hasChanged = false;

	function updatePronation(newPronation: RunMap | null) {
		pronation = newPronation;
	}

	function updateRun(newRun: RunMap | null) {
		run = newRun;
	}

    let runOptions: RunMap[] = RUNS; 
    $: if (pronation && pronation.label === "Overpronation") {
        runOptions = STABLE_RUNS;
    } else {
        runOptions = RUNS;
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
<FilterRadio all={runOptions} state={run} label="Run Type" updateState={updateRun} />

<input type="hidden" name="state" bind:value={state} />
