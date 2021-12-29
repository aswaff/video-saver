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

    let URL;
    let HTML;
    let Thumbnail;
    let Category;



    // export let HTML;

    const overlayOff = () => {
        console.log("Turning overlay Off")
        document.getElementById("overlay").style.display = "none";
        document.body.style.overflow = "auto"

    }

    const editOverlayOn = () => {
        document.getElementById("edit-overlay").style.display = "block";
    }
    const editOverlayOff = () => {
        document.getElementById("edit-overlay").style.display = "none";
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

// After a day of trying to figure this out, below code works for making tiktok embed js videos load.
// Adding them to head does not always work
afterUpdate(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = "https://www.tiktok.com/embed.js"
    document.body.appendChild(script)
})

async function doUpdate () {
  const res = await fetch(`http://192.168.0.16:5000/tasks/${$ApiSpecificData._id}`, {
    method: 'PUT',
    headers: {
          "Content-Type": "application/json",
      },
    body: JSON.stringify(
				{
                URL: $ApiSpecificData.URL,
				HTML: $ApiSpecificData.HTML,
				Thumbnail: $ApiSpecificData.Thumbnail,
				Category: $ApiSpecificData.Category
                }
			)
    
  })
}
// Using this so that fields show current value when editing.
URL = $ApiSpecificData.URL 
HTML = $ApiSpecificData.HTML 
Thumbnail = $ApiSpecificData.Thumbnail 
Category = $ApiSpecificData.Category; 

// $: ApiSpecificData, console.log($ApiSpecificData.Category)


</script>



<svelte:head>
    <title>Overlay</title>
    

</svelte:head>



<div id="overlay">
        <div id="overlay-close" on:click={overlayOff}><img src={closeButton} alt="closebutton" /></div>

    <div class="content-wrapper">
        <div class="iframe-wrapper">
          
    {@html $ApiSpecificData.HTML}
    <div class="videoinfo">
    </div>
      
        </div>
        <div class="edit-wrapper">
            <img src={edit} alt="edit" on:click={editOverlayOn} />
        </div>
        <div id="edit-overlay">
            <form class="edit-form">
                <label>URL</label>
                <input type="text" bind:value={$ApiSpecificData.URL} />
                <label>HTML</label>
                <input type="text" bind:value={$ApiSpecificData.HTML} />
                <label>Thumbnail</label>
                <input type="text" bind:value={$ApiSpecificData.Thumbnail} />
                <label>Category</label>
                <select bind:value={$ApiSpecificData.Category}>
                        <option value="Other">Other</option>
                        <option value="Cute">Cute</option>
                        <option value="Music">Music</option>
                </select>
                <button type="button" on:click={doUpdate}>
                    Update
                </button>
                <button type="button" on:click={editOverlayOff}>
                    Cancel
                </button>
              </form>
        </div>

</div>

</div>




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
    overflow: auto;
    
}

.iframe-wrapper {
    text-align: -webkit-center;
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

.edit-wrapper {
    width: 5vw;
    position: fixed;
    right: 7vw;
    top: 50vh;
    }

.edit-wrapper img {
    width: 100%;
}

#edit-overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.85);
    z-index: 4;
    overflow: auto;
    
}

.edit-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
}

.edit-form label {
    color: white;
}





</style>