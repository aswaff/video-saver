<script context="module">
	export const prerender = true;
</script>

<script>
	import {Videodata} from "../lib/video/videodata.svelte";
	import { Swiper, SwiperSlide, } from 'swiper/svelte';
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
	
	SwiperCore.use([Pagination]);
</script>




<svelte:head>
	<title>Home</title>
</svelte:head>
<div id="swiperwrap">
	
		<Swiper
		style="height:100%;"
		direction="{'vertical'}"
		pagination='{{
			"clickable": true
		  }}'
		on:slideChange={() => console.log('slide change')}
		on:swiper={(e) => console.log(e.detail[0])}
		class="mySwiper"
	>
	<SwiperSlide>
		<!-- Added the below iframe so certain sites would play videos, direct URL is needed -->
		<div class="iframe-overlay"></div>
			<div class="iframe-controls">
			<iframe
				class="iframeplaya"
				title="video"
				src={Videodata[1].url}>
			</iframe>
		</div>
	
	</SwiperSlide>
	<SwiperSlide>Slide 2</SwiperSlide>

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

#swiperwrap {
  height: 100vh;
  align-self: center;
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
