<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/footer.svelte';
	import '../app.css';
</script>

<!-- <Header /> -->

<main>
	<slot />
</main>

<footer>
<Footer />
</footer>

<style>
	main {
		/* flex: 1; */
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		padding-bottom: 10vh;
		/* min-height: 90vh; */
	}

	footer a {
		font-weight: bold;
	}

	footer {
	position: fixed;
    bottom: 0;
    width: 100%;
	/* height: 9%; */
	height: calc(70px + env(safe-area-inset-bottom) + 0px)

}



</style>
