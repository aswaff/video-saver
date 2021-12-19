<script	>
import { onMount } from "svelte";
import { ApiData } from "$lib/video/store.js"
let URL = ""
let Catagory = ""
let iframeResult;
let iframelyPromise;
let response;
let databaseURLs;
let URLnew = null;
// const json = await res.json()
		
// 		iframeResult = {"URL": json.URL,
// 						"HTML": json.links.player[0].html,
// 						"Thumbnail": json.test.links.thumbnail[0].href}
// 		console.log(json)

onMount(async () => {
  fetch("http://192.168.0.16:5000/tasks")
  .then(response => response.json())
  .then(data => {
	  	ApiData.set(data)
		// console.log($ApiData)
  }).catch(error => {
    console.log(error);
    return [];
  });
});

const checkURL = (url) => {
	const databaseURLs = $ApiData.map(data => data.URL)
	if (databaseURLs.includes(url) === true) {
		 console.log("Video is in Database");
		URLnew = false
	}
	else {
		console.log("Video is not in database")
		URLnew = true
	}
	
}



const iframeGet = async () => {
		const res = await fetch(`https://iframe.ly/api/iframely?url=${URL}&key=5684147d970b5663f90cfc1c15410b81`)
		
		if (res.status === 200){
			return res.json()

	} else {
      throw new Error(res.statusText);
    } 
}






const firstClick = () => {
	iframelyPromise = iframeGet();
		const iframePromiseResponse = async () => {
			const a = await iframelyPromise;
			checkURL(a.url);
		}
		iframePromiseResponse()
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
		<button type="button" on:click={firstClick}>
			Post it.
		</button>
	  </form>
	  {#await iframelyPromise}
	  <p>...loading</p>
	{:then apiResponse}
	  <p>{apiResponse ? `${apiResponse.url} `: ''}</p>
		
	  {#if URLnew === null}
	  <p></p>
	 	 {:else if URLnew}
		<button>
			Submit Video
		</button>
		{:else}
		<p>Video Already exists in database</p>
		
		{/if}
		<img src="{apiResponse ? `${apiResponse.links.thumbnail[0].href} `: ''}" />
	{:catch error}
	  <p style="color: red">Error with fetching</p>
	{/await}
	  

</div>

<style>
	.content-wrapper {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

	img {
		width: 70vw;
		display: flex;
		margin-left: auto;
	}

</style>
