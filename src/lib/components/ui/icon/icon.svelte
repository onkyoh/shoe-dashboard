<script lang="ts">
	import { cn } from "$lib/utils";
    import "iconify-icon"

    export let icon: string
    
	let className: string | undefined = '';
    export { className as class };
</script>

<iconify-icon class={cn("text-2xl", className)} icon={icon}></iconify-icon>

