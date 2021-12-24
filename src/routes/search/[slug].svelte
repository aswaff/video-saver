<script>
import { page } from '$app/stores';
import { ApiSearchData } from '$lib/video/store';
import { onMount } from "svelte";

    const checkForData = () => {
        fetch(`http://192.168.0.16:5000/tasks/${$page.params.slug}`)
        .then(response => response.json())
        .then(data => {
                ApiSearchData.set(data)
                
        }).catch(error => {
            console.log(error);
            return [];
        });
        
}
checkForData()

onMount(async () => {
    const iframeSelector = document.querySelectorAll('iframe');
	iframeSelector.forEach(iframe => iframe.style.maxHeight = "80%");
});

$: ApiSearchData, console.log($ApiSearchData)
</script>

<svelte:head>
	<title>Video</title>
</svelte:head>

<div class="video-wrapper">

{@html $ApiSearchData.HTML}
<!-- <iframe src={$ApiSearchData.URLembed} title="Video"></iframe> -->

</div>

<style>



    .video-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%
    }

    .video-wrapper iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    }

</style>