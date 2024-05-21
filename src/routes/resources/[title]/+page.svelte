<script lang="ts">

    import type { LayoutData } from './$types';
    export let data: LayoutData

</script>

<article class="bg-white md:w-[calc(100%-4rem)] max-w-[800px] mx-auto h-fit p-6 rounded-md shadow-sm border">
    <h1>{data.article.title}</h1>
    {@html data.article.content}
</article> 

<style>

    article :global(h1) {
        font-size: 2rem;
    }

    article :global(h1),
    article :global(h2),
    article :global(h3),
    article :global(h4) {
        color: hsl(221.2, 83.2%, 53.3%);
        padding-bottom: 0.5rem;
        font-weight: 700;
    }

    article :global(h2) {
        font-size: x-large;
    }

    article :global(h3) {
        font-size: larger;
    }

    article :global(h4) {
        font-size: large;
    }

    article :global(img) {
        width: 100%;
        height: auto;
        margin: 1rem 0;
    }

    article :global(a){
        text-decoration: underline;
        color: hsl(221.2, 83.2%, 53.3%);
    }

    article :global(ul) {
        padding-left: 20px;
        margin-bottom: 1rem;
        list-style: disc inside;
    }

    article :global(li) {
        margin-bottom: 0.5rem;
    }

    article :global(p) {
        margin-bottom: 1rem;
    }
</style>