<script lang="ts">
	import { cn } from '$lib/utils';

	export let href: string;
	export let newTab: boolean = false;
	export { className as class };
	let className: string = '';

	let targetProp = newTab ? '_blank' : undefined;
	let relProp = newTab ? 'noopener noreferrer' : undefined;
</script>

<a class={cn('text-blue-500 underline', className)} {href} target={targetProp} rel={relProp}>
	<slot />
</a>
