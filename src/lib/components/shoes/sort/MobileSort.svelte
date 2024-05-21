<script lang="ts">
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import { Label } from '$lib/components/ui/label'; 

    import { page } from '$app/stores';

    import { addSearchParam, getSortParam } from '$lib/utils';

    import { formatSortValue, removeSearchParam } from '$lib/utils';  
    import { SORT_OPTIONS } from '$lib/constants';  


  let selectedSort: string = formatSortValue(getSortParam($page.url));

  function handleRadioChange(value: string) {
    selectedSort = value;
    removeSearchParam('page');
    addSearchParam('sort', value);
  }

</script>

<div class="flex flex-col gap-4 md:hidden">
  <Label>Sort by:</Label>
  <RadioGroup.Root value={selectedSort} onValueChange={handleRadioChange} class="flex flex-col gap-2">
    {#each SORT_OPTIONS as option}
      <div class="flex items-center gap-2">  
        <RadioGroup.Item id={option.value} value={option.value} />
        <Label for={option.value} class="font-normal">{option.label}</Label>
      </div>
    {/each}
  </RadioGroup.Root>

  <Separator class="my-4" />
</div>