<script	>
let URL = ""
let Catagory = ""
let iframeResult = null

async function iframeGet () {
		const res = await fetch(`https://iframe.ly/api/iframely?url=${URL}&key=5684147d970b5663f90cfc1c15410b81`, {
			method: 'Get',
			
		})
		const json = await res.json()
		iframeResult = JSON.stringify(json)
		{console.log(json)}
	}
</script>

<svelte:head>
	<title>Add</title>
</svelte:head>

<div class="content-wrapper">
	<h1>Add a video</h1>
	
	<form class="content">
		<label>Video URL</label>
		<input type="text"  bind:value={URL}/>
		<label>Category</label>
		<input type="text" bind:value={Catagory} />
		<button type="button" on:click={iframeGet}>
			Post it.
		</button>
	  </form>
</div>

<style>
	.content-wrapper {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
