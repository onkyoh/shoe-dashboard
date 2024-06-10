<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Calendar } from '$lib/components/ui/calendar';

	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import { type DateValue, getLocalTimeZone, parseDate, today } from '@internationalized/date';

	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';

	export let value: DateValue | string | undefined;
	export let onUpdate: (expiryDate: string) => void;

	let dateValue: DateValue | undefined = formatValue(value);

	function formatValue(value: DateValue | string | undefined): DateValue | undefined {
		if (!value) return undefined;
		if (typeof value === 'string') return parseDate(value.split('T')[0]);
		return value;
	}

	let isOpen = false;
</script>

<div class="flex w-full flex-wrap gap-2">
	<Popover.Root bind:open={isOpen}>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'w-full justify-start pl-4 text-left font-normal',
				!value && 'text-muted-foreground'
			)}
		>
			{value ? value.toString().split('T')[0] : 'Pick a date'}
			<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" side="top">
			<Calendar
				bind:value={dateValue}
				minValue={today(getLocalTimeZone())}
				calendarLabel="Date of birth"
				initialFocus
				onValueChange={(v) => {
					if (!v) return;
					onUpdate(v.toString());
					isOpen = false;
				}}
			/>
		</Popover.Content>
	</Popover.Root>
</div>
