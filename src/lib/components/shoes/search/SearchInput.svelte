<script lang="ts">
	export let value: string = '';
</script>

<input
	class={'flex h-10 w-full rounded-md border bg-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed'}
	bind:value
	on:input
	{...$$restProps}
/>
