
<script lang="ts">
	import SvelteSeo from "svelte-seo";

	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon';
</script>

<SvelteSeo
  title="Contact | shoez.run"
  description="Whether you have a question, found an issue, or would like to share some feedback, feel free to send a message!"
/>

<div class="flex h-full w-full items-center justify-center">
	<Card.Root class="w-full max-w-[600px]">
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Contact</Card.Title>
				<Card.CardDescription
					>Whether you have a question, found an issue, or would like to share some feedback, feel free to send a message!
				</Card.CardDescription>
			</Card.Header>
			<Card.Content>
				<Button class="flex items-center gap-2" href="mailto:adnanradwan_8@hotmail.com"><Icon icon="mdi:email" class="text-2xl" />Open Email</Button>
			</Card.Content>

	</Card.Root>
</div>
