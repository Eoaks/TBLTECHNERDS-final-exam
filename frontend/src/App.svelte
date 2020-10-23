<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";


	// if ("serviceWorker" in navigator) {
	// 	navigator.serviceWorker.register("/service-worker.js");
	// }
</script>
<svelte:head>
	<title>Contacts list app</title>
</svelte:head>
<Tailwindcss />

<Router {routes} />
