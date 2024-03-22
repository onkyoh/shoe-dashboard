
<script lang='ts'>
    export let user: {
        name: string
    }; 
</script>

<div class="hidden md:block">
    Welcome back, {user.name}!
</div>