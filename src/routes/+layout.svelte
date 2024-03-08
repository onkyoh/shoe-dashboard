<script lang="ts">
    import "../app.pcss";
    import { QueryClientProvider } from '@tanstack/svelte-query'
    import {queryClient} from '$lib/svetlte-query'

</script>

<QueryClientProvider client={queryClient}>
    <slot/>
</QueryClientProvider>
