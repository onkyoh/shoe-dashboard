<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import Icon from '$lib/components/ui/icon/Icon.svelte';
	import { addSearchParam } from '$lib/utils';

	$: selectedSort = undefined;
</script>

<div class="flex items-center gap-2">
	<Label for="select">Sort By</Label>
	<Select.Root
		selected={selectedSort}
		onSelectedChange={(v) => {
			if (v && typeof v.value === 'string') {
				addSearchParam('sort', v.value);
			}
		}}
	>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Release Date" />
		</Select.Trigger>
		<Select.Content>
			<!-- Pair 1: Release Date -->
			<Select.Item value="date|asc">
				Release Date <Icon icon="ph:arrow-up-bold" className="text-sm ml-2" />
			</Select.Item>
			<Select.Item value="date|desc">
				Release Date <Icon icon="ph:arrow-down-bold" className="text-sm ml-2" />
			</Select.Item>

			<!-- Pair 2: Heel Drop -->
			<Select.Item value="drop|asc">
				Heel Drop <Icon icon="ph:arrow-up-bold" className="text-sm ml-2" />
			</Select.Item>
			<Select.Item value="drop|desc">
				Heel Drop <Icon icon="ph:arrow-down-bold" className="text-sm ml-2" />
			</Select.Item>

			<!-- Pair 3: Weight -->
			<Select.Item value="weight|asc">
				Weight <Icon icon="ph:arrow-up-bold" className="text-sm ml-2" />
			</Select.Item>
			<Select.Item value="weight|desc">
				Weight <Icon icon="ph:arrow-down-bold" className="text-sm ml-2" />
			</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
