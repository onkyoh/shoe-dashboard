<script lang="ts">
	import SvelteSeo from "svelte-seo";

	import * as Card from '$lib/components/ui/card';
	import Link from '$lib/components/ui/link';
</script>

<SvelteSeo
  title="Verify Email | shoez.run"
  description="Verify your email for your shoez.run account"
/>

<Card.Root class="w-full max-w-[600px]">
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Verify Your Email</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<p>
			We've sent you an verification email. Please check your inbox and spam folders and click the
			link within the email to confirm your account.
		</p>
		<p>
			Didn't receive an email?
			<Link href="/auth/resend-verification">Request another verification email.</Link>
		</p>
	</Card.Content>
</Card.Root>
