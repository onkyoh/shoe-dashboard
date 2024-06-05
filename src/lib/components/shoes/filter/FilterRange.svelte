<script lang="ts">
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { Slider } from "$lib/components/ui/slider";

    export let label: string;
    export let minParam: string;
    export let maxParam: string;
    export let state: number[]
    export let onChange: (v: number[]) => void
    export let max: number;
    export let min: number = 0;
    export let unit: string

</script>

<div class="flex justify-between">
    <Label>{label}:</Label>
    <span class="text-sm text-muted-foreground">{`${state[0]} to ${state[1]}`}{unit}</span>
</div>

<Slider value={[state[0], state[1]]} step={0.5} max={max} onValueChange={onChange} class="w-[calc(100%-2rem)] mx-auto" />

{#if state[0] !== min}
    <Input type="hidden" name={minParam} bind:value={state[0]} />
{/if}
{#if state[1] !== max}
    <Input type="hidden" name={maxParam} bind:value={state[1]} />
{/if}