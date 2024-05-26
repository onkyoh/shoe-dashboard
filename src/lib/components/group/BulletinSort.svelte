<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon';

	import type { IBulletin } from '$lib/types';

	export let bulletins: IBulletin[];
	export let modifyBulletins: (bulletins: IBulletin[]) => void;

	let isRecent = true;

	function toggleSort() {
		let sortedBulletins = [...bulletins];
		if (isRecent) {
			sortedBulletins.sort((a, b) => b.priority - a.priority);
			isRecent = false;
		} else {
			isRecent = true;
		}
		modifyBulletins(sortedBulletins);
	}
</script>

<Button
	class="fixed bottom-20 right-4 z-10 h-12 w-12 md:hidden"
	variant={isRecent ? 'default' : 'outline'}
	on:click={toggleSort}
>
	<Icon icon="mdi:sort-clock-ascending" class="text-2xl" />
</Button>
