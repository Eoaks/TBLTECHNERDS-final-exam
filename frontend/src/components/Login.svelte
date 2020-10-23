<script>
    import ajax from '../utils/ajax';
    import Loader from './Loader.svelte';
    export let checkLogin;
    let email;
    let password;
    let loading = false;
    
    function handleForm(){
        if(loading) return;
        loading = true;
        ajax('login', {
            body: {
                email,
                password
            }
        }).then(response => {
            localStorage.setItem('login-token', response.token);
            checkLogin();
        })
        .finally(() => {
            loading = false;
        })
    }
</script>

<div class="min-h-screen flex items-center">
    <form on:submit|preventDefault={handleForm} 
        class="border flex flex-col justify-center max-w-sm bg-gray-100 mx-auto w-full p-3"
        >
        <input type="email" required placeholder="email" bind:value={email}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        <input type="password" required placeholder="password"  bind:value={password}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        {#if loading}
            <Loader />
        {:else}
        <button type="submit"
            class="rounded border p-1 max-w-xs mx-auto my-2 bg-blue-500 text-white">Login</button>
        {/if}
    </form>
</div>