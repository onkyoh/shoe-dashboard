<script>
    import { goto } from '$app/navigation';
    
    export let data
    let { supabase } = data
    $: ({ supabase } = data)
 
  
    // Form data variables
    let email = '';
    let password = '';
    let name = '';
  
    async function handleGoogleSignup() {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) console.error('Google sign-in error:', error);
    }
  
    async function handleEmailSignup() {
      const { error } = await supabase.auth.signUp({ email, password, options: {
        data: {
            name
        }
      } });
      if (error) {
        console.error('Email sign-up error', error);
        // Handle error, e.g., display error message to user
      } else {
        goto('/auth/verify-email')
      }
    }
  </script>
  
  <div class="signup-container">
    <h1>Sign Up</h1>
  
    <button on:click={handleGoogleSignup}>Sign Up with Google</button>
  
    <div class="or-divider">or</div>
  
    <form on:submit|preventDefault={handleEmailSignup} >
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} required>
  
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required>
  
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} required>
  
      <button type="submit">Sign Up with Email</button>
    </form>
  </div>