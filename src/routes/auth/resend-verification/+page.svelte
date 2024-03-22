<script>
    export let data
    let { supabase } = data
    $: ({ supabase } = data)
  
    let email = '';
    let sending = false; // Flag to track request state

  
    async function handleResend() {
      sending = true;

      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: 'https://example.com/welcome' // Redirect after successful verification
          }
        });
  
        if (error) throw error;
  
        // Handle success logic
      } catch (err) {
        // Handle error logic
      } finally {
        sending = false;
      }
    }
  </script>
  
  <h2>Request Verification Email</h2>
  
  <form on:submit|preventDefault={handleResend}>
    <input type="email" bind:value={email} placeholder="Your Email">
    <button type="submit" disabled={sending}>
      {sending ? 'Sending...' : 'Send Verification Email'}
    </button>
  </form>
  