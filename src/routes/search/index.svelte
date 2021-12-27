
<script>

    
import Box from '$lib/Box-Component/box.svelte'
import { onMount } from "svelte";
import { ApiSearchData, checkForData } from "$lib/video/store.js"
// import { overlayOn, overlayOff } from "./overlay.svelte"
import Overylay, {overlayOn} from "./overlay.svelte"
// Selection in the search box
let categoryOptions = [
	{ id: "1", value: "Cute"},
	{ id: "2", value: "Music"},
	{ id: "3", value: "Other"}
]

let Category = "Other"
let searchResult;
let videoThumbnail;

    const searchButton = () => {
        // searchResult = $ApiSearchData.find( ({ Category }) => Category === 'Music' );
        console.log(Category)
        checkForData(Category)
        
    }
 $: searchResult, console.log(searchResult)


$: ApiSearchData, console.log($ApiSearchData)

// onMount(async () => {
//   fetch("http://192.168.0.16:5000/tasks")
//   .then(response => response.json())
//   .then(data => {
// 	  	ApiSearchData.set(data)
//   }).catch(error => {
//     console.log(error);
//     return [];
//   });
// });

// testing... possibly will remove
const getThumbnail = () => {
   ApiSearchData.map(video =>
        fetch(`https://iframe.ly/api/oembed?url=${video.URL}&key=5684147d970b5663f90cfc1c15410b81`)
        .then(response => response.json())
        .then(data => {
                ApiSearchData.set(data)
        }).catch(error => {
            console.log(error);
            return [];
        })
   )
}

// Checks to see if store is up to date
// const checkForData = () => {
//         fetch(`http://192.168.0.16:5000/search?Category=${Category}`)
//         .then(response => response.json())
//         .then(data => {
//                 ApiSearchData.set(data)
//         }).catch(error => {
//             console.log(error);
//             return [];
//         });
// }


</script>



<svelte:head>
	<title>Search</title>
</svelte:head>

<div class="content-wrapper">
    <h1>Search</h1>
    Select Category:
    <select bind:value={Category}>
        {#each categoryOptions as option}
            <option value={option.value}>{option.value}</option>
        {/each}	
    </select>
    <p></p>
    <button type="button" on:click={searchButton}>
        Search
    </button>

    <p></p>
    <div class="box-wrapper">
        {#each $ApiSearchData as { _id, URL, Thumbnail }, i}
        <Box>
            <img src="{Thumbnail}" alt="thumbnail" on:click={overlayOn}/>
            <!-- Will likely remove below -->
            <!-- <a href="/search/{_id}"><img src="{Thumbnail}" alt="thumbnail" /></a> -->
            <p></p>
            {URL}
            <!-- Below is the overlay HTML content -->
        <Overylay />
        </Box>
        {/each}
        
    </div>  



</div>



<style>
	.content-wrapper {
		width: 100%;
        margin-top: 5%;
		/* max-width: var(--column-width); */
		/* margin: var(--column-margin-top) auto 0 auto; */
		text-align: center;
	}

    select {
        width: 20vw;
    }

    .box-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .box-wrapper img {
        width: 30vw;
    }

</style>