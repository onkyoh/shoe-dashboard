<script lang="ts">
    import * as Card from "$lib/components/ui/card";
</script>

<Card.Root class="w-full max-w-[600px]">
    <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Verify Your Email</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-4">
        <p>    
            We've sent you an verification email. Please check your inbox and spam folders
            and click the link within the email to confirm your account.
        </p>
        <p>
            Didn't receive an email? 
            <a href="/auth/resend-verification" class="text-primary hover:underline">Request another verification email</a>.
        </p>
    </Card.Content>
</Card.Root>

