<script lang="ts">
	export let value: string = "";
</script>

<input
	class={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"}
	bind:value
	on:input
	{...$$restProps}
/>
