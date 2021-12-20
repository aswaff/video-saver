<script context="module">
	export const prerender = true;
</script>

<script>
	import {Videodata} from "../lib/video/videodata.svelte";
	import { Swiper, SwiperSlide, } from 'swiper/svelte';
	import { Virtual } from 'swiper';
	import { onMount } from "svelte";
	// import { get, store } from 'svelte/store';
	import { ApiData, videoUrl } from "$lib/video/store.js"
	// let ApiData_value;

	// ApiData.subscribe(value => {
	// 	ApiData_value = value;
	// });
	
	


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
	
	SwiperCore.use([Pagination, Virtual]);
	



	onMount(async () => {
  fetch("http://192.168.0.16:5000/tasks")
  .then(response => response.json())
  .then(data => {
	  	ApiData.set(data)
		console.log($videoUrl)
  }).catch(error => {
    console.log(error);
    return [];
  });
});

const slideChange = () => {
	const iframeSelector = document.querySelectorAll('iframe');
	// iframeSelector.forEach(iframe => iframe.style.height = "80%");
	// iframeSelector.forEach(iframe => iframe.style.width = "80%");
	console.log('slide change');
}

</script>


<svelte:head>
	<title>Home</title>
</svelte:head>
<div id="swiperwrap">
	
	<!-- autoHeight="{true}" 
		Possible use for Swiper -->
		<Swiper
		modules={[Virtual]}
		style="height:100%;"
		direction="{'vertical'}"
		
		  
		on:slideChange={() => slideChange() }
		on:swiper={(e) => console.log(e.detail[0])}
		virtual={{ slides: $videoUrl }}
    	let:virtualData={{ slides, offset, from }}
		class="mySwiper"
	>
	{#each slides as slide, index (from + index)}
		<SwiperSlide
			virtualIndex={from + index}
			style={`top: ${offset}px`}
			
		>
			<!-- Added the below iframe so certain sites would play videos, direct URL is needed -->
			<!-- Need to investigate forwarding click events to swiper js from below divgi -->
			<!-- <div class="iframe-overlay"></div> -->
			<div class="iframe-holder">
				<div>
{@html slide}
</div>
</div>
			
		</SwiperSlide>
	{/each}

		</Swiper>
	
</div>



<style>
html,body {
	height:100%; 
	width:100%; 
	margin:0;
}




.iframe-overlay {
	width: 90vw;
	height: 70%;
	position: absolute;
}

.iframe-controls {
	height: 90vh;
	display: flex;
    justify-content: center;
	
}

.iframe-holder {
	height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: -webkit-center;
}

.iframe-holder div {
	overflow-y: clip;
	height: 90vh;
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
