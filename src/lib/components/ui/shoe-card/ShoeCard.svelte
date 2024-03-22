<script lang="ts">
	import type { IShoe } from "$lib/types";

    export let shoe: IShoe
</script>

<div class="flex flex-col justify-between h-full w-full bg-white">
    <img class="sm:h-40 lg:h-52 xl:h-40 2xl:h-52 object-cover" src={shoe.image} alt={shoe.name}  />
    <div class="flex flex-col p-2">
        <h3 class="font-bold">{shoe.name}</h3>
        <div class="flex flex-col gap-1">
            <p>{shoe.category}</p>
            <p>{shoe.weight}</p>
            <p>{shoe.drop}</p>
        </div>
    </div>
</div>