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
  fetch("http://192.168.0.3:5000/tasks")
  .then(response => response.json())
  .then(data => {
	  	ApiData.set(data)
		console.log($videoUrl)
  }).catch(error => {
    console.log(error);
    return [];
  });
});




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
		pagination='{{
			"clickable": true
		  }}'
		on:slideChange={() => console.log('slide change')}
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
				<div class="iframe-controls"
				style="max-width: 56vh;">
				<div class="test">
					
				<iframe

					title="video"
					allow="encrypted-media"
					src={slide}>
					
				</iframe>
				</div>
			</div>
			
		</SwiperSlide>
	{/each}

		</Swiper>
	
</div>


<section>

</section>

<style>
section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
}



.iframe-overlay {
	width: 95vw;
	height: 70%;
	position: absolute;
}

.iframe-controls {
	height: 100vh;
	display: contents;
}

#swiperwrap {
  height: 100vh;
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
