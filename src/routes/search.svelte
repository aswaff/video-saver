<script>
import Box from '../lib/Box-Component/box.svelte'

import { ApiSearchData } from "$lib/video/store.js"
// Selection in the search box
let categoryOptions = [
	{ id: "1", value: "Cute"},
	{ id: "2", value: "Music"},
	{ id: "3", value: "Other"}
]

let Category = "Other"
let searchResult;

    const searchButton = () => {
        // searchResult = $ApiSearchData.find( ({ Category }) => Category === 'Music' );
        console.log(Category)
        checkForData()
        
    }
 $: searchResult, console.log(searchResult)

$: ApiSearchData, console.log($ApiSearchData)

$: ApiSearchData, console.log($ApiSearchData)

// Checks to see if store is up to date
const checkForData = () => {
        fetch(`http://192.168.0.16:5000/search?Category=${Category}`)
        .then(response => response.json())
        .then(data => {
                ApiSearchData.set(data)
        }).catch(error => {
            console.log(error);
            return [];
        });
        
}


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
        {#each $ApiSearchData as { id, URL, Thumbnail }, i}
        <Box>
            <img src="{Thumbnail}" alt="thumbnail" />
            <p></p>
            {URL}
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