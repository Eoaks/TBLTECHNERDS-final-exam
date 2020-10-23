<script>
    import { onMount } from 'svelte';
    import ajax from '../utils/ajax';
    import Login from '../components/Login.svelte';
    import Loader from '../components/Loader.svelte';

    let loggedIn = !!localStorage.getItem('login-token');

    function checkLogin(){
        loggedIn = !!localStorage.getItem('login-token');
        if(loggedIn)
            ajax('contact').then(response => {contacts = response})
    }

    let contacts = [];
    let loading = false;

    onMount(() => {
        if(loggedIn)
            ajax('contact').then(response => {contacts = response})
    })
</script>

{#if !loggedIn}
    <Login {checkLogin} />
{/if}
<ul class="border w-full max-w-sm mx-auto">
    {#each contacts as contact}
        <li>
            <a class="flex flex-col border p-2 cursor-pointer" href={contact._id}>
                <span class="leading-4 "> {contact.firstName + ' ' + contact.lastName}</span>    
                <span class="leading-4 text-gray-800">{contact.phone}</span>    
                <span class="leading-4 text-gray-800">{contact.email}</span>    
            </a>
        </li>
    {/each}
</ul>
{#if loading}       
    <Loader />
{/if}