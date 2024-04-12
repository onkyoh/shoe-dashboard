<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
    import Label from '$lib/components/ui/label/label.svelte';
    import { BRANDS } from '$lib/constants'
	import Button from '$lib/components/ui/button/button.svelte';

    let brands: string[] = []
</script>


<Dialog.Root>
<Dialog.Trigger class="bg-primary text-white border px-4 py-2 rounded-lg font-semibold font-sm">Filter</Dialog.Trigger>
<Dialog.Content>
    <Dialog.Header>
    <Dialog.Title>Filtered Search</Dialog.Title>
    </Dialog.Header>
    <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-card px-2 text-muted-foreground"> By specs</span>
        </div>
      </div>
    <form method="GET">
        {#each BRANDS as brand}
            <Button type="button" variant={brands.includes(brand) ? "default" : "ghost"} on:click={() => brands = brands.includes(brand) ? brands.filter(b => b !== brand) : brands.concat(brand)}>{brand}</Button>
        {/each}        
        <input type="hidden" name="brands" placeholder="Brands" bind:value={brands}>
        <button type="submit">Filter</button>
    </form>
    <Label>Brands:</Label>
    <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-card px-2 text-muted-foreground"> Or by condition </span>
        </div>
      </div>
</Dialog.Content>
</Dialog.Root>