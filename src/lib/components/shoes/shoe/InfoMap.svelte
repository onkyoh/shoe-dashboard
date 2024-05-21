<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import Icon from "$lib/components/ui/icon";
    import type { Tables } from "$lib/schema";
    import { SPEC_DESCRIPTIONS } from "$lib/constants";

	
    export let shoe: Tables<'shoes'>

    function getCategoryDescription(category: string): string {
        return category in SPEC_DESCRIPTIONS.category 
            ? SPEC_DESCRIPTIONS.category[category as keyof typeof SPEC_DESCRIPTIONS.category] 
            : 'Category Description Unavailable';
    }
   
    function getWeightGroup(weight: number): keyof typeof SPEC_DESCRIPTIONS.weight {
        if (weight < 8) return 'under 8';
        if (weight <= 10) return '8-10';
        return '10 and over';
    }

    function getDropGroup(drop: number): keyof typeof SPEC_DESCRIPTIONS.drop {
        if (drop <= 6) return '0-6';
        if (drop <= 9) return '7-9';
        return '10-12';
    }
</script>

<Card.Root>
    <Card.Header>
        <Card.Title class="text-2xl flex items-center gap-2"><Icon icon="mdi:information-outline"/>General Overview</Card.Title>
        <Card.Description>Below is a very shallow insight into the {shoe.name} made purely off a generalization of its specs. For a more in-depth look, check out the Running Shoes Guru review, or refer to any notes which your group members may have provided.</Card.Description>
    </Card.Header>
    <Card.Content>
        <Separator class="mb-4" />
        <dl class="grid grid-cols-1 gap-2">
            
            {#if shoe.category !== undefined}
                <dt class="flex items-center gap-2 font-semibold"><Icon icon="mingcute:shoe-fill"/>Category</dt>
                <dd class="text-muted-foreground mb-2">{getCategoryDescription(shoe.category)}</dd>
            {/if}
        
            {#if shoe.weight !== undefined}
                <dt class="flex items-center gap-2 font-semibold"><Icon icon="material-symbols:weight"/>Weight</dt>
                <dd class="text-muted-foreground mb-2">{SPEC_DESCRIPTIONS.weight[getWeightGroup(shoe.weight)]}</dd>
            {/if}
            
            {#if shoe.drop !== undefined}
                <dt class="flex items-center gap-2 font-semibold"><Icon icon="mdi:slope-downhill"/>Heel Drop</dt>
                <dd class="text-muted-foreground mb-2">{SPEC_DESCRIPTIONS.drop[getDropGroup(shoe.drop)]}</dd>
            {/if}

        </dl>
    </Card.Content>
</Card.Root>