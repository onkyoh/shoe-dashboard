<script lang="ts">
export let className: string = ""
export let name: string
</script>

<img src={`/icons/${name}.svg`}  alt={name} class={`h-6 w-6 ${className}`}/>