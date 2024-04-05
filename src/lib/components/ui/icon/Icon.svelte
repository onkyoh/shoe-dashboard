<script lang="ts">
	import { cn } from "$lib/utils";
    import "iconify-icon"

    export let className: string | undefined = "";
    export let icon: string
</script>

<iconify-icon class={cn("text-2xl", className)} icon={icon}></iconify-icon>