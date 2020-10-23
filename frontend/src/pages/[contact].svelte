<script>
    import { onMount } from 'svelte';
    import ajax from '../utils/ajax';
    import Loader from '../components/Loader.svelte';
    export let contact;
    
    let email;
    let phone;
    let firstName;
    let lastName;

    onMount(() => {
        ajax('contact').then(console.log)
    })
    console.log('asdsad')
    let loading = false;
    
    function handleForm(){
        if(loading) return;
        loading = true;
        ajax('contact', {
            method: 'PUT',
            body: {
                email,
                phone,
                firstName,
                lastName
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
        <input type="text" required placeholder="First Name"  bind:value={firstName}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        <input type="text" required placeholder="Last Name"  bind:value={lastName}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        <input type="email" required placeholder="email" bind:value={email}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        <input type="text" required placeholder="phone"  bind:value={phone}
            class="rounded border p-2 max-w-xs mx-auto my-2">
        {#if loading}
            <Loader />
        {:else}
        <button type="submit"
            class="rounded border p-1 max-w-xs mx-auto my-2 bg-blue-500 text-white">Update</button>
        {/if}
    </form>
</div>