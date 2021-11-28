<!-- <script context="module">
	export const prerender = true;
</script> -->

<script>
	import {Videodata} from "../lib/video/videodata.svelte";
	import { Swiper, SwiperSlide, } from 'swiper/svelte';
	

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
	<!-- <div class="iframe"> -->
		<Swiper
		direction="{'vertical'}"
		pagination='{{
			"clickable": true
		  }}'
		on:slideChange={() => console.log('slide change')}
		on:swiper={(e) => console.log(e.detail[0])}
		class="mySwiper"
	>
	<SwiperSlide>
		<!-- Added the below iframe so certain sites would play videos, direct URL is needed / spaceBetween={50} -->
		<iframe
			class="iframeplaya"
			title="video"
			src={Videodata.Video.url}>
		</iframe>
	</SwiperSlide>
	<SwiperSlide>Slide 2</SwiperSlide>

		</Swiper>
	<!-- </div> -->
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

	.iframe {
		width: 95vw;
		align-self: center;
	}

	#swiperwrap {
  height: 100vh;
}

#swiperwrap + .swiper-pointer-events.swiper-vertical {
	height: 100vh;
}



#swiper .swiper-pagination-vertical.swiper-pagination-bullets, #swiper .swiper-vertical>.swiper-pagination-bullets {
	position: fixed;
}

.swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-vertical

/* .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
} */
.swiper-slide iframe {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
