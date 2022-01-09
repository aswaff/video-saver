<script	>
import { onMount } from "svelte";
import { ApiData } from "$lib/video/store.js"
import {checkForData} from "$lib/video/store"
let URLbox = ""
let Catagory = ""
let iframeResult;
let iframelyPromise;
let response;
let databaseURLs;
let URLnew = null;

let categoryOptions = [
	{ id: "1", value: "Cute"},
	{ id: "2", value: "Music"},
	{ id: "3", value: "Other"}
]
let catego

// Post data returned
let POSTresult = null;

// Data for POST
let URL = null;
let URLembed = null;
let HTML = null;
let Thumbnail = null;
let Category = "Other";


// const json = await res.json()
		
// 		iframeResult = {"URL": json.URL,
// 						"HTML": json.links.player[0].html,
// 						"Thumbnail": json.test.links.thumbnail[0].href}
// 		console.log(json)

// Pulls videos from database
onMount(async () => {
  fetch("https://video-saver-api.herokuapp.com/tasks")
  .then(response => response.json())
  .then(data => {
	  	ApiData.set(data)
		// console.log($ApiData)
  }).catch(error => {
    console.log(error);
    return [];
  });
});
// checks to see if url already exists in database
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


// function from submit URL button to go to iframely, using the oembed format for uniformity
const iframeGet = async () => {
		const res = await fetch(`https://iframe.ly/api/oembed?url=${URLbox}&key=5684147d970b5663f90cfc1c15410b81`)
		
		if (res.status === 200){
			return res.json()

	} else {
      throw new Error(res.statusText);
    } 
}





// first button to look up a URL with iframely
const firstClick = () => {
	iframelyPromise = iframeGet();
		const iframePromiseResponse = async () => {
			const a = await iframelyPromise;
			iframeResult = a
			URL = a.url
			// URLembed = a.links.player[0].href
			HTML = a.html
			Thumbnail = a.thumbnail_url
			console.log(a)
			checkURL(a.url);
		}
		iframePromiseResponse()
}
// Performs the push to the mongo database
async function doPost () {
		const res = await fetch('https://video-saver-api.herokuapp.com/tasks', {
			method: 'POST',
			headers: {
      			"Content-Type": "application/json",
    		},
			body: JSON.stringify({
				URL,
				URLembed,
				HTML,
				Thumbnail,
				Category
			})
		})
		
		const json = await res.json()
		POSTresult = res.status
		
	}

</script>

<svelte:head>
	<title>Add</title>
</svelte:head>

<div class="content-wrapper">
	<h1>Add a video</h1>
	
	<form class="content">
		<input type="text"  bind:value={URLbox} placeholder="Enter Video URL" />
		<br />
		<button type="button" on:click={firstClick} style="margin-top: 20px;">
			Search for Video
		</button>
	  </form>
	  {#await iframelyPromise}
	  <p>...loading</p>
	{:then apiResponse}
	  <p>{apiResponse ? `${apiResponse.url} `: ''}</p>
		
	  {#if URLnew === null}
	  <p></p>
	 	 {:else if URLnew}
		  {#if POSTresult === null}
		  <select bind:value={Category}>
			{#each categoryOptions as option}
				<option value={option.value}>{option.value}</option>
			{/each}	
		</select>
		<button type="button" on:click={doPost}>
			Submit Video
		</button>
		{:else}
		<p>Video has been submitted</p>
		{/if}

		{:else}
		<p>Video Already exists in database</p>
		
		{/if}
		<img src="{apiResponse ? `${apiResponse.thumbnail_url} `: ''}" />
	{:catch error}
	  <p style="color: red">Error with fetching</p>
	{/await}
	  


</div>

<style>
	.content-wrapper {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		text-align: center;
		color: white;
	}

	.content-wrapper h1 {
		color: white;
	}

	input {
		width: 90%;
		padding: 12px 20px;
		/* margin: 8px 0; */
		/* display: inline-block; */
		/* border: 1px solid #ccc; */
		border-radius: 4px;
		box-sizing: border-box;	
	}

	.content-wrapper button {
	margin: 15px;
    background-color: #646971;
    padding: 19px;
    border-radius: 11px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    color: white;
    width: 125px;
    align-self: center;
	}



	img {
		height: 25vh;
		display: flex;
		margin-left: auto;
		margin-right: auto;
	}

</style>
