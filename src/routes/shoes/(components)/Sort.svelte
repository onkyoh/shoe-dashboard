<script lang="ts">
    import * as Select from '$lib/components/ui/select';
    import { addSearchParam, getSortParam } from '$lib/utils';
    import { page } from '$app/stores';

    $: selectedSort = formatSortValue(getSortParam($page.url));

    // Helper function to format the sort value from the array
    function formatSortValue([sortFieldRaw, sortOrder]: string[]) {
        const sortField = sortFieldRaw === 'created_at' ? 'date' : sortFieldRaw;
        const displayText = getDisplayText(sortField, sortOrder);
        return displayText;
    }

    // Helper to get the display text for the Select component
    function getDisplayText(sortField: string, sortOrder: string) {
        switch (sortField) {
            case 'date':
                return `Release Date: ${sortOrder === 'asc' ? 'Low to High' : 'High to Low'}`; 
            case 'drop':
                return `Heel Drop: ${sortOrder === 'asc' ? 'Low to High' : 'High to Low'}`;
            case 'weight':
                return `Weight: ${sortOrder === 'asc' ? 'Low to High' : 'High to Low'}`; 
            default:
                return '';
        }
    }
</script>

<Select.Root
    selected={{ value: selectedSort, label: selectedSort }}
    onSelectedChange={(v) => {
        if (v && typeof v.value === 'string') {
            addSearchParam('sort', v.value);
        }
    }}
>
    <Select.Trigger class="w-[220px]">
        <Select.Value placeholder="Sort" />
    </Select.Trigger>
    <Select.Content>
        <Select.Item value="date|asc">Release Date: Low to High</Select.Item>
        <Select.Item value="date|desc">Release Date: High to Low</Select.Item>

        <Select.Item value="drop|asc">Heel Drop: Low to High</Select.Item>
        <Select.Item value="drop|desc">Heel Drop: High to Low</Select.Item>

        <Select.Item value="weight|asc">Weight: Low to High </Select.Item>
        <Select.Item value="weight|desc">Weight: High to Low</Select.Item>
    </Select.Content>
</Select.Root>