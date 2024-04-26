<script lang="ts">
    import { cn } from '$lib/utils';

    export let className: string = '';
    export let href: string;
    export let newTab: boolean = false;

    let targetProp = newTab ? '_blank' : undefined;
    let relProp = newTab ? 'noopener noreferrer' : undefined;
</script>

<a 
   class={cn('text-blue-500 underline', className)} 
   href={href} 
   target={targetProp} 
   rel={relProp}>
    <slot />
</a>