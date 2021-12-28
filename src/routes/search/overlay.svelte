<script context="module">

    // import { onMount } from "svelte";
    export const overlayOn = (_id) => {
        console.log("Turning overlay On")
        document.getElementById("overlay").style.display = "block";
        document.body.style.overflow = "hidden"
        getData(_id)
    }
    
    const getData = async (id) => {
        await fetch(`http://192.168.0.16:5000/tasks/${id}`)
        .then(response => response.json())
        .then(data => {
                ApiSpecificData.set(data);
                
        })
        .catch(error => {
            console.log(error);
            return [];
        });
    
}

</script>

<script>
    // import { onMount } from "svelte";
    import { ApiSpecificData } from '$lib/video/store';
    import closeButton from './iconmonstr-x-mark-1.svg'
    import edit from "./iconmonstr-pencil-10.svg";
    import { afterUpdate } from 'svelte';
    import { onMount } from "svelte";

    export let url;
    export let id;
    // export let HTML;

    const overlayOff = () => {
        console.log("Turning overlay Off")
        document.getElementById("overlay").style.display = "none";
        document.body.style.overflow = "auto"

    }

//     onMount(async () => {
//     fetch(`http://192.168.0.16:5000/tasks/${id}`)
//         .then(response => response.json())
//         .then(data => {
//                 ApiSpecificData.set(data)
                
//         })
//         .catch(error => {
//             console.log(error);
//             return [];
//         });
	
// });

afterUpdate(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = "https://www.tiktok.com/embed.js"
    document.body.appendChild(script)
})


</script>



<svelte:head>
    <title>Overlay</title>
    

</svelte:head>



<div id="overlay">
        <div id="overlay-close" on:click={overlayOff}><img src={closeButton} alt="closebutton" /></div>

    <div class="content-wrapper">
        <div class="iframe-wrapper">
        
    
    {@html $ApiSpecificData.HTML}

    
        
        </div>
        <div class="edit-wrapper">
            <img src={edit} alt="edit" />
        </div>

</div>

</div>

<!-- <svelte:head> -->
    <!-- Below script tag had to be added for tiktok videos -->
    <!-- <script async src="https://www.tiktok.com/embed.js"></script> -->
<!-- </svelte:head> -->



<style>

#overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    
}
#overlay-close {
    z-index: 3;
    width: 5vw;
    position: fixed;
    right: 7vw;
    top: 12vh;
    cursor: pointer;
}
#overlay-close img {
    height: 100%;
    width: 100%;
    filter: drop-shadow(2px 4px 6px black);
}




</style>