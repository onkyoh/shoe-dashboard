<script lang="ts">
	import FilterRadio from "./FilterRadio.svelte";
    import type { RunMap } from "$lib/types";
    import { Slider } from "$lib/components/ui/slider";
    import Label from "$lib/components/ui/label/label.svelte";


    const RUNS: RunMap[] = [
        {
            label: 'Race',
            specs: [{
                name: 'categories',
                value: ['Racing']
            }]
        }, {
            label: 'Tempo',
            specs: [{
                name: 'categories',
                value: ['Lightweight', 'Racing']
            },
            {
                name: 'maxWeight',
                value: 10
            }]
        }, {
            label: 'Daily',
            specs: [{
                name: 'categories',
                value: ['Lightweight', 'Cushioning']
            }]
        }, {
            label: 'Daily',
            specs: [{
                name: 'categories',
                value: ['Cushioning', 'Stability']
            }, {
                name: 'minWeight',
                value: 7
            }, {
                name: 'maxWeight',
                value: 10
            }]
        }, {
            label: 'Easy',
            specs: [{
                name: 'categories',
                value: ['Cushioning', 'Stability']
            }, {
                name: 'minWeight',
                value: 10
            }]
        },{
            label: 'Long',
            specs: [{
                name: 'categories',
                value: ['Racing', 'Cushioning', 'Lightweight']
            }, {
                name: 'maxWeight',
                value: 9
            }]
        }]
    
    const PRONATION: RunMap[] = [
        {
            label: 'Overpronation',
            specs: [{
                name: 'categories',
                value: ['Stability']
            }]
        },
        {
            label: 'Neutral',
            specs: [{
                name: 'categories',
                value: ['Cushioning']
            }]
        },
        {
            label: 'Underpronation',
            specs: [{
                name: 'categories',
                value: ['Cushioning']
            }]
        }
    ]

    let pronation: RunMap
    let run: RunMap
    let strike: number = 6
    let hasChanged = false
</script>

<div>
    <Label>Foot Strike:</Label>
    <p class="text-muted-foreground">Use to slider to indicate what part of your foot hits the ground first when you run.</p>
</div>
<div class="flex justify-between">
    <span>Heel</span>
    <span>Middle</span>
    <span>Toe</span>
</div>
<Slider value={[strike]} max={12} step={0.5} onValueChange={(v) => {strike = v[0]; hasChanged = true}}/>
{#if hasChanged}
    <input type="hidden" name={"minDrop"} value={[Math.abs(strike - 12) - 2]}/>
    <input type="hidden" name={"maxDrop"} value={[Math.abs(strike - 12) + 2]}/>
{/if}
<FilterRadio all={PRONATION} state={pronation} label="Pronation"/>
<FilterRadio all={RUNS} state={run} label="Run Type"/>
