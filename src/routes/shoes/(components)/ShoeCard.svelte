<script lang="ts">
	import type { IShoe } from '$lib/types';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import 'iconify-icon';

	export let shoe: IShoe;
	export let className = '';
</script>

<Card.Root class={cn('flex h-full flex-col overflow-hidden px-0', className)}>
	<Card.Header class="px-4">
		<Card.Title>{shoe.name}</Card.Title>
	</Card.Header>
	<Card.Content class="mx-auto w-full flex-grow p-0">
		<img class="w-full" src={shoe.image} alt={shoe.name} />
	</Card.Content>
	<Card.Footer class="flex flex-col items-start gap-2 bg-primary px-4 pt-4 text-white">
		<p class="flex items-center gap-2">
			<iconify-icon icon="mingcute:shoe-fill" class="text-2xl" />{shoe.category}
		</p>
		<p class="flex items-center gap-2">
			<iconify-icon icon="material-symbols:weight" class="text-2xl" />{shoe.weight} oz.
		</p>
		<p class="flex items-center gap-2">
			<iconify-icon icon="mdi:slope-downhill" class="text-2xl" />{shoe.drop}mm
		</p>
	</Card.Footer>
</Card.Root>

