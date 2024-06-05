<script lang="">
    import SvelteSeo from "svelte-seo";

    import { browser } from "$app/environment";
    import * as Card from '$lib/components/ui/card';

    if (browser) {
        window.location.href = '/'
    }
   
</script>


<SvelteSeo
  title="Redirting... | shoez.run"
  description="You are being redirected to the dashboard."
  noindex={true}
/>


<Card.Root>
    <Card.Header>
        <Card.Title>Redirecting...</Card.Title>
    </Card.Header>
</Card.Root>