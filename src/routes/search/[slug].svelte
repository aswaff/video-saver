

<script>
import { page } from '$app/stores';
import { ApiSpecificData } from '$lib/video/store';
import { onMount } from "svelte";

import edit from "./iconmonstr-pencil-10.svg";

    const checkForData = () => {
        fetch(`https://video-saver-api.herokuapp.com/tasks/${$page.params.slug}`)
        .then(response => response.json())
        .then(data => {
                ApiSpecificData.set(data)
                
        }).catch(error => {
            console.log(error);
            return [];
        });
        
}
// checkForData()

onMount(async () => {
    fetch(`https://video-saver-api.herokuapp.com/tasks/${$page.params.slug}`)
        .then(response => response.json())
        .then(data => {
                ApiSpecificData.set(data)
                
        })
        .then( () => {
            const iframeSelector = document.querySelectorAll('iframe');
            iframeSelector.forEach(iframe => iframe.style.maxHeight = "75vh");
            // iframeSelector.forEach(iframe => iframe.style.maxWidth = "78%");
            // iframeSelector.forEach(iframe => iframe.style.position = "fixed");
        })
        .catch(error => {
            console.log(error);
            return [];
        });
	
});

$: ApiSpecificData, console.log($ApiSpecificData)
</script>

<svelte:head>
	<title>Video</title>
    <!-- Below script tag had to be added for tiktok videos -->
    <script async src="https://www.tiktok.com/embed.js"></script>
</svelte:head>
<div class="content-wrapper">
    <div class="iframe-wrapper">
    {@html $ApiSpecificData.HTML}
    <!-- <iframe src={$ApiSpecificData.URLembed} title="Video"></iframe> -->
    </div>
    <div class="edit-wrapper">
        <img src={edit} alt="edit" />
    </div>

</div>



<style>

    .content-wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 90vh;
    width: 100vw;
    overflow: hidden;
    }

    .iframe-wrapper {
    position: relative;
    width: 78%;
    height: 78%;
    text-align: -webkit-center;
    }

    .edit-wrapper {
    position: absolute;
    right: 0;
    margin-right: 2.3vw;
    
    /* margin-left: auto; */
    }

</style>