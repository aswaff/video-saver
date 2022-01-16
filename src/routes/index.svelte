<!-- <script context="module">
	export const prerender = true;
</script> -->

<script>
	import {Videodata} from "../lib/video/videodata.svelte";
	import { Swiper, SwiperSlide, } from 'swiper/svelte';
	import { Virtual } from 'swiper';
	import { onMount } from "svelte";
	import { ApiData, apiSpecificDataThumb } from "$lib/video/store.js"
	import Overlay, {overlayOn} from "./search/overlay.svelte"
	import loader from "../../static/loader.svg"
	
	


	// Map over video data and return only the URL's for each video
	let VideodataUrl = Videodata.map(video=> {
		return video.url
		})

// install Swiper modules

	import 'swiper/css';
	import "swiper/css/pagination";
	
	import SwiperCore, {
		Pagination,
		} from 'swiper';
import { slide } from "svelte/transition";
	
	SwiperCore.use([Pagination, Virtual]);
	


const updateData = () => {
  fetch("https://video-saver-api.herokuapp.com/tasks")
  .then(response => response.json())
  .then(data => {
	  	ApiData.set(data)
  }).catch(error => {
    console.log(error);
    return [];
  });

}
updateData()

$: ApiData, console.log($ApiData)
// Function that runs on each slide change
const slideChange = () => {
	const iframeSelector = document.querySelectorAll('iframe');
	iframeSelector.forEach(iframe => iframe.style.maxHeight = "80%");
	// iframeSelector.forEach(iframe => iframe.style.width = "80%");
	
	console.log('slide change');
}

const buttonClick = (id) => {
    overlayOn(id)
    
}

const updateThumbnail = (data) => {
	apiSpecificDataThumb(data)
	updateData()
	console.log("Running updatethumbnail")
	// Below code forces the image to rerender
	ApiData.set(ApiData)
}


</script>


<svelte:head>
	<title>Home</title>
	<script async src="https://www.tiktok.com/embed.js"></script>
	
</svelte:head>
{#if !$ApiData}
<div class="loader-holder">
<img src={loader} alt="loader" />
</div>

{:else}
<div id="swiperwrap">
	
	<!-- autoHeight="{true}" 
		Possible use for Swiper -->
		<Swiper
		modules={[Virtual]}
		style="height:100%;"
		direction="{'vertical'}"
		
		on:slideChange={() => slideChange() }
		on:swiper={(e) => console.log(e.detail[0])}
		virtual={{ slides: $ApiData }}
    	let:virtualData={{ slides, offset, from }}
		class="mySwiper"
	>
	{#each slides as slide,  index (from + index)}
		<SwiperSlide
			virtualIndex={from + index}
			style={`top: ${offset}px`}
			
		>
		
			<!-- Added the below iframe so certain sites would play videos, direct URL is needed -->
			<!-- Need to investigate forwarding click events to swiper js from below divgi -->
			<!-- <div class="iframe-overlay"></div> -->
			<div class="content-holder">
				<div class="image-holder">
				<img src={slide.Thumbnail} alt="videothumbnail" on:click={buttonClick(slide._id)} on:error={updateThumbnail(slide)}/>
				</div>
			</div>
			
		</SwiperSlide>
	{/each}

		</Swiper>
	<Overlay />
</div>
{/if}



<style>
html,body {
	height:100%; 
	width:100%; 
	margin:0;
}




.content-holder {
	height: 100%;
	display: flex;
    align-items: center;
	justify-content: center;
	
}

.loader-holder {
	height: 89vh;
    display: flex;
    align-self: center;
}

.image-holder img {
	max-width: 100%;
    max-height: 80vh;
    height: auto;
    width: auto;
	cursor: pointer;
}

/* .iframe {
	height: 85vh;
	width: 90vw;
	margin: auto;

} */


#swiperwrap {
  height: 90vh;
  text-align: center;
}


.iframeplaya {
	height: 80vh;
}

.welcome {
	position: relative;
	width: 100%;
	height: 0;
	padding: 0 0 calc(100% * 495 / 2048) 0;
}

.welcome img {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	display: block;
}
</style>
