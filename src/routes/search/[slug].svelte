

<script>
import { page } from '$app/stores';
import { ApiSpecificData } from '$lib/video/store';
import { onMount } from "svelte";

import edit from "./iconmonstr-pencil-10.svg";

    const checkForData = () => {
        fetch(`http://192.168.0.16:5000/tasks/${$page.params.slug}`)
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
    fetch(`http://192.168.0.16:5000/tasks/${$page.params.slug}`)
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
    body {

    }

    .content-wrapper {
    /* height: 100vh; */
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
    /* width: 100%;
    height: 100%; */
    /* padding-bottom: 56.25%; */
    width: 78%;
    height: 78%;
    text-align: -webkit-center;
    /* display: flex;
    align-items: center; */
    }

    .iframe-wrapper iframe {
    position: absolute;
    /* width: 100%; */
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    }

    .edit-wrapper {
    position: absolute;
    right: 0;
    margin-right: 2.3vw;
    
    /* margin-left: auto; */
    }

</style>