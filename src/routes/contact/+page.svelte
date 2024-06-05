<script lang="ts">
	import SvelteSeo from "svelte-seo";

	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
</script>

<SvelteSeo
  title="Contact | shoez.run"
  description="Whether you have a question, found an issue, or would like to share some feedback, feel free to send a message!"
/>

<div class="flex h-full w-full items-center justify-center">
	<Card.Root class="w-full max-w-[600px]">
		<form name="contact" method="POST" data-netlify="true">
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Contact</Card.Title>
				<Card.CardDescription
					>Whether you have a question, found an issue, or would like to share some feedback, feel free to send a message!
				</Card.CardDescription>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="flex flex-col gap-2">
					<Label>Name: *</Label>
					<Input type="text" name="name" required />
				</div>
				<div class="flex flex-col gap-2">
					<Label>Email: *</Label>
					<Input type="email" name="email" required />
				</div>
				<div class="flex flex-col gap-2">
					<Label>Reason: *</Label>
					<Select.Root>
						<Select.Trigger class="w-full">
							<Select.Value placeholder="Select a reason" />
							<Select.Input name="reason" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="question">Question</Select.Item>
							<Select.Item value="feedback">Feedback</Select.Item>
							<Select.Item value="issue">Issue</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex flex-col gap-2">
					<Label>Message: *</Label>
					<Textarea name="message" class="resize-none" required></Textarea>
				</div>
			</Card.Content>
			<Card.Footer class="grid gap-2">
				<Button type="submit">Send Message</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
