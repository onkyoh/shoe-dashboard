<script lang="ts">
	import type { Tables } from '$lib/schema';

	import { cn } from '$lib/utils';

	import Icon from '$lib/components/ui/icon';
	import * as Card from '$lib/components/ui/card';

	export { className as class };
	export let shoe: Tables<'shoes'>;

	let className: string = '';

</script>

<Card.Root class={cn('flex h-full flex-col overflow-hidden px-0', className)}>
	<Card.Content class="mx-auto w-full flex-grow p-0">
		<img class="w-full" src={shoe.image} alt={shoe.name} />
	</Card.Content>
	<Card.Footer class="flex flex-col items-start gap-2 bg-primary px-4 pt-4 text-white">
		<h3 class="text-lg font-semibold">{shoe.name}</h3>
		<p class="flex items-center gap-2">
			<Icon icon="mingcute:shoe-fill" class="text-2xl" />{shoe.category}
		</p>
		<p class="flex items-center gap-2">
			<Icon icon="material-symbols:weight" class="text-2xl" />{shoe.weight} oz.
		</p>
		<p class="flex items-end gap-2">
			<Icon icon="mdi:slope-downhill" class="text-2xl" />{shoe.drop}mm
		</p>
	</Card.Footer>
</Card.Root>

