<script context="module">
    export const overlayOn = () => {
        console.log("Turning overlay On")
        document.getElementById("overlay").style.display = "block";
        document.getElementById("overlay-close").style.display = "block";

    }


</script>

<script>
    import closeButton from './iconmonstr-x-mark-1.svg'

    export let url;
    export let id;
    export let Thumbnail;

    const overlayOff = () => {
        console.log("Turning overlay Off")
        document.getElementById("overlay").style.display = "none";
        document.getElementById("overlay-close").style.display = "none";

    }
</script>

<div id="overlay"></div>
        <div id="overlay-close" on:click={overlayOff}><img src={closeButton} alt="closebutton" /></div>

<div id="overlay"></div>


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
    cursor: pointer;
}
#overlay-close {
    display: none;
    z-index: 3;
    width: 5vw;
    position: absolute;
}
#overlay-close img {
    height: 100%;
    width: 100%;
}

</style>