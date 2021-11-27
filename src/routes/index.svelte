<!-- <script context="module">
	export const prerender = true;
</script> -->

<script>
	import {Videodata} from "../lib/video/videodata.svelte";
	
</script>


<svelte:head>
	<title>Home</title>
</svelte:head>
<!-- <video
src="">
<track kind="captions">
</video> -->
<div class="iframe">
	<iframe
		class="iframeplaya"
		title="video"
		src={Videodata.url}>
	</iframe>
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
