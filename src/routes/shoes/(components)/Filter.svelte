<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Input } from '$lib/components/ui/input';
	import { BRANDS, CATEGORIES } from '$lib/constants';
	import Button from '$lib/components/ui/button/button.svelte';
	import FilterLists from './FilterLists.svelte';

	let brands: string[] = [];
	let categories: string[] = [];
</script>

<Dialog.Root>
	<Dialog.Trigger class="font-sm rounded-lg border bg-primary px-4 py-2 font-semibold text-white"
		>Filter</Dialog.Trigger
	>
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
			<FilterLists state={brands} all={BRANDS} name="brands" />
			<FilterLists state={categories} all={CATEGORIES} name="categories" />

			<Label>Weight:</Label>
			<div class="flex items-center gap-2">
				<Input type="number" name="minWeight" /> TO <Input type="number" name="maxWeight" />
			</div>
			<Label>Heel Drop:</Label>
			<div class="flex items-center gap-2">
				<Input type="number" name="minDrop" /> TO <Input type="number" name="maxDrop" />
			</div>
			<button type="submit">Filter</button>
		</form>

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
