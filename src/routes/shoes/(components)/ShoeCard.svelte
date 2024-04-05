<script lang="ts">
    import * as Card from "$lib/components/ui/card"
    import { Separator } from "$lib/components/ui/separator"
	import type { IShoe } from "$lib/types";
    import { cn } from "$lib/utils";
    import 'iconify-icon';

    export let shoe: IShoe
    export let className = ''


</script>


<Card.Root class={cn('px-0 overflow-hidden flex flex-col h-full', className)}>
    <Card.Header class="px-4 bg-primary text-white">
    <Card.Title>{shoe.name}</Card.Title>
    </Card.Header>
    <Card.Content class="p-0 mx-auto flex-grow w-full"> 
    <img class="w-full" src={shoe.image} alt={shoe.name}> 
    </Card.Content>
    <Separator class="mb-4" />
    <Card.Footer class="px-4 flex flex-col gap-2 items-start">
    <p class="flex items-center gap-2"><iconify-icon icon="mingcute:shoe-fill" class="text-2xl"/>{shoe.category}</p>
    <p class="flex items-center gap-2"><iconify-icon icon="material-symbols:weight" class="text-2xl"/>{shoe.weight} oz.</p>
    <p class="flex items-center gap-2"><iconify-icon icon="mdi:slope-downhill" class="text-2xl"/>{shoe.drop}mm</p>
    </Card.Footer>
</Card.Root>
