<script>

let categoryOptions = [
	{ id: "1", value: "Cute"},
	{ id: "2", value: "Music"},
	{ id: "3", value: "Other"}
]

    let Category = "Other"

    const searchButton = () => {

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


</div>



<style>
	.content-wrapper {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		text-align: center;
	}

    select {
        width: 20vw;
    }
</style>