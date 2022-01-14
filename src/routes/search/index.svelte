
<script>


import Box from '$lib/Box-Component/box.svelte'
import { onMount } from "svelte";
import { ApiSearchData, apiSearchThumbnail, checkForData } from "$lib/video/store.js"
// import { overlayOn, overlayOff } from "./overlay.svelte"
import Overlay, {overlayOn} from "./overlay.svelte"


// import Overlay from './overlay.svelte';
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




// onMount(async () => {
//   fetch("https://video-saver-api.herokuapp.com/tasks")
//   .then(response => response.json())
//   .then(data => {
// 	  	ApiSearchData.set(data)
//   }).catch(error => {
//     console.log(error);
//     return [];
//   });
// });

// testing... possibly will remove
// const getThumbnail = () => {
//    ApiSearchData.map(video =>
//         fetch(`https://iframe.ly/api/oembed?url=${video.URL}&key=5684147d970b5663f90cfc1c15410b81`)
//         .then(response => response.json())
//         .then(data => {
//                 ApiSearchData.set(data)
//         }).catch(error => {
//             console.log(error);
//             return [];
//         })
//    )
// }

// Checks to see if store is up to date
// const checkForData = () => {
//         fetch(`https://video-saver-api.herokuapp.com/search?Category=${Category}`)
//         .then(response => response.json())
//         .then(data => {
//                 ApiSearchData.set(data)
//         }).catch(error => {
//             console.log(error);
//             return [];
//         });
// }



const buttonClick = (id) => {
    overlayOn(id)
    
}

const imageError = (URL, id) => {
    apiSearchThumbnail(URL, id)
    console.log("Running updatethumbnail")
    checkForData(Category)
    ApiSearchData.set(ApiSearchData)
    
   
    
}



</script>



<svelte:head>
	<title>Search</title>
</svelte:head>

<div class="content-wrapper">
    <h1>Search</h1>
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
        {#each $ApiSearchData as { _id, URL, Thumbnail, HTML }, i}
        <Box>
            <div class="image-wrapper">
             <img src="{Thumbnail}" alt="thumbnail" on:click={buttonClick(_id)} on:error={imageError(URL, _id)}/>
            </div>
            <!-- Will likely remove below -->
            <!-- <a href="/search/{_id}"><img src="{Thumbnail}" alt="thumbnail" /></a> -->
            <br />
            <p>{URL}</p>
            
  
        </Box>
        <!-- Below is the overlay HTML content -->
        <!-- <Overlay 
        url={URL}
        id={_id}
        HTML={HTML}
        
        
        /> -->
        {/each}
        <Overlay />
        
    </div>  

    



</div>


<style>
	.content-wrapper {
		width: 100%;
		/* max-width: var(--column-width); */
		/* margin: var(--column-margin-top) auto 0 auto; */
		text-align: center;
        color: white;
	}
    h1 {
        color: white;
    }

    select {
    width: 20vw;
    height: 40px;
    padding: 12px 20px;
    /* margin: 8px 0; */
    /* display: inline-block; */
    /* border: 1px solid #ccc; */
    border-radius: 4px;
    box-sizing: border-box;
    }

    button {
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

    .box-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        color: black;
    }

    .box-wrapper p {
        padding: 10px;
        overflow-wrap: break-word;

    }

    .image-wrapper {
        background-color: black;
        
    }

    .image-wrapper img {
        max-height: 275px;
        max-width: 100%;
        margin-bottom: -4px;
        cursor: pointer;
    }

</style>