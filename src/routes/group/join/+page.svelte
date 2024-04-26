<script lang="ts">
    import * as Card from "$lib/components/ui/card"
	import Link from "$lib/components/ui/link/Link.svelte";
    import {Separator} from "$lib/components/ui/separator"
    export let data
</script>

<Card.Root class="p-2 text-center">
    <Card.Title class="text-4xl">Success</Card.Title>
    <Separator class="my-4" />
    <Card.Content>Congrats {data.name}! You have successfully joined a group. Follow the link to head on over to the <Link href="/group">group page.</Link></Card.Content>
</Card.Root>

