<script lang="ts">
	import { PRIORITY_MAP } from '$lib/constants';
	import type { INote, IBulletin } from '$lib/types';
	import { cn, formatCreatedAt, formatName } from '$lib/utils';

	type NoteActivity = INote & { type: 'note' };
	type BulletinActivity = IBulletin & { type: 'bulletin' };

	type Activity = NoteActivity | BulletinActivity;

	export let activity: INote | IBulletin;

	$: typedActivity = {
		...activity,
		type: activity.hasOwnProperty('priority') ? 'bulletin' : 'note'
	} as Activity;
</script>

<a
	href={typedActivity.type === 'note' ? `/shoes/${typedActivity.shoe_name}` : '/group'}
	class="flex h-fit flex-col gap-2 overflow-x-hidden rounded-lg border bg-white p-4 hover:border-primary"
>
	{#if typedActivity.type === 'bulletin'}
		<span
			class={cn(
				'relative left-[-10%] top-[-1rem] mb-[-0.5rem] h-8 w-[120%]',
				PRIORITY_MAP[typedActivity.priority]
			)}
		></span>
	{:else if typedActivity.type === 'note'}
		<p class="font-medium">{typedActivity.shoe_name}</p>
	{/if}
	<div class="flex justify-between">
		<span class="text-sm text-muted-foreground">{formatName(typedActivity.users.name)}</span>
		<span class="text-sm text-muted-foreground">
			{formatCreatedAt(typedActivity.created_at)}
		</span>
	</div>
	<p class="line-clamp-6 text-muted-foreground">
		{typedActivity.content}
	</p>
</a>
