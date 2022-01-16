<script context="module">

    // import { onMount } from "svelte";
    export const overlayOn = (_id) => {
        console.log("Turning overlay On")
        document.getElementById("overlay").style.display = "block";
        document.body.style.overflow = "hidden"
        getData(_id)
    }
    
    const getData = async (id) => {
        await fetch(`https://video-saver-api.herokuapp.com/tasks/${id}`)
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
    import { ApiSpecificData } from '$lib/video/store';
    import closeButton from "./iconmonstr-x-mark-1.svg";
    import edit from "./iconmonstr-pencil-10.svg";
    import { afterUpdate } from 'svelte';
import { text } from 'svelte/internal';

    let URL;
    let HTML;
    let Thumbnail;
    let Category;




    const overlayOff = () => {
        console.log("Turning overlay Off")
        document.getElementById("overlay").style.display = "none";
        document.body.style.overflow = "auto"

        // Need to refresh component when closing video
        // Because Svelte's reactivity is triggered by assignments the above command will not refresh
        // One way to fix that is to add an assignment, on close we are changing ApiSpecificData to a empty array.
        ApiSpecificData.set([])

    }

    const editOverlayOn = () => {
        document.getElementById("edit-overlay").style.display = "block";
    }
    const editOverlayOff = () => {
        document.getElementById("edit-overlay").style.display = "none";
        
    }

// After a day of trying to figure this out, below code works for making tiktok embed js videos load.
// Adding them to head does not always work
afterUpdate(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = "https://www.tiktok.com/embed.js"
    document.body.appendChild(script)
})

async function doUpdate () {
  const res = await fetch(`https://video-saver-api.herokuapp.com/tasks/${$ApiSpecificData._id}`, {
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
let deleteResponse;
const deleteVideo = async () => {
    await fetch(`https://video-saver-api.herokuapp.com/tasks/${$ApiSpecificData._id}`, {
    method: 'Delete',
    headers: {
          "Content-Type": "application/json",
      }
    
  })
  .then(response => response.json())
  .then(data => deleteResponse = data)
  console.log(deleteResponse)

}


// Using this so that fields show current value when editing.
URL = $ApiSpecificData.URL 
HTML = $ApiSpecificData.HTML 
Thumbnail = $ApiSpecificData.Thumbnail 
Category = $ApiSpecificData.Category; 


</script>



<svelte:head>
    

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
                <label>URL
                <input type="text" bind:value={$ApiSpecificData.URL} />
                </label>
                <label>HTML
                <input type="text" bind:value={$ApiSpecificData.HTML} />
                </label>
                <label>Thumbnail
                <input type="text" bind:value={$ApiSpecificData.Thumbnail} />
                </label>
                <label>Category</label>
                <select bind:value={$ApiSpecificData.Category}>
                        <option value="Other">Other</option>
                        <option value="Cute">Cute</option>
                        <option value="Music">Music</option>
                </select>
                    <button class="update-button" type="button" on:click={doUpdate}>
                        Update
                    </button>
                    <button class="close-button" type="button" on:click={editOverlayOff}>
                        Close
                    </button>
                <div style="margin-top: 50px;" class="delete-button">
                    <button type="button" on:click={deleteVideo}>
                        Delete Video
                    </button>
                    {#if deleteResponse}
                        <section style="Color: white">{deleteResponse.message}</section>
                    {/if}

                </div>
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
    min-height: 89vh;
    display: flex;
    align-content: center;
    align-items: center;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
}

#overlay-close {
    z-index: 3;
    /* width: 5vw; */
    position: fixed;
    right: 0vw;
    top: 30%;
    cursor: pointer;
    background-color: #40444b;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 5px;
}
#overlay-close img {
    height: 100%;
    width: 100%;
    filter: drop-shadow(2px 4px 6px black);
}

.edit-wrapper {
    position: fixed;
    right: 0vw;
    top: 40%;
    cursor: pointer;
    background-color: #40444b;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 5px;
}

.edit-wrapper img {
    width: 100%;
    filter: drop-shadow(2px 4px 6px black);
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
    padding-top: 10vh;
}

.edit-form input, select {
    width: 90%;
    padding: 12px 20px;
    /* margin: 8px 0; */
    /* display: inline-block; */
    /* border: 1px solid #ccc; */
    border-radius: 4px;
    box-sizing: border-box;
}

.edit-form label {
    color: white;
}

.update-button {
    background-color: #2a623e;
    margin-top: 20px;
    padding: 19px;
    border-radius: 11px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    color: white;
    width: 125px;
    align-self: center;
}

.close-button {
    background-color: #40444b;
    margin-top: 50px;
    padding: 19px;
    border-radius: 11px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    color: white;
    width: 125px;
    align-self: center;
}

.delete-button button {
    background-color: #8a3030;
    padding: 19px;
    border-radius: 11px;
    text-decoration: none;
    cursor: pointer;
    border: none;
    color: white;
}





</style>