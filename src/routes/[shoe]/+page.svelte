<script lang="ts">
	import type { IShoe } from "$lib/api/useShoes";

    export let shoe: IShoe
</script>

<div>
    {shoe.name}
</div>