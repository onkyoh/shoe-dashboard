<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { addSearchParam, getSortParam } from '$lib/utils';
	import { formatSortValue, removeSearchParam } from '$lib/utils';
	import { SORT_OPTIONS } from '$lib/constants';

	$: selectedSort = formatSortValue(getSortParam($page.url));
</script>

<Select.Root
	selected={SORT_OPTIONS.find((option) => option.value === selectedSort)}
	onSelectedChange={(v) => {
		if (v) {
			removeSearchParam('page');
			goto(addSearchParam('sort', v.value));
		}
	}}
>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="Sort" />
	</Select.Trigger>
	<Select.Content>
		{#each SORT_OPTIONS as option}
			<Select.Item value={option.value}>{option.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
