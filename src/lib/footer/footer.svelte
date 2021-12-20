<script>
    import homebutton from "./iconmonstr-home-6.svg";
    import down from "./iconmonstr-angel-down-thin.svg"
    import plus from "./iconmonstr-plus-2.svg";
    import search from "./iconmonstr-magnifier-2.svg";

   function handleClickNext(){
        document.querySelector('.swiper').swiper.slideNext()
    }
    function handleClickPrev(){
        document.querySelector('.swiper').swiper.slidePrev()
    }

    // let swiperSelector = document.querySelector('.swiper').swiper; 

</script>

<hr />
<div class="footer-wrapper">
    <img class="up" src={down} alt="down" on:click="{handleClickPrev}"/>
    <a href="/"><img src={homebutton} alt="home" /></a>
    <a href="/add"><img src={plus} alt="plus" /></a>
    <a href="/search"><img src={search} alt="search" /></a>
    <img class="down" src={down} alt="down" on:click="{handleClickNext}"/>


</div>


<style>
    a {
        display: flex;
    }

    hr {
    width: -webkit-fill-available;
    border: 1px solid black;
    border-top: hidden;
    }

    .footer-wrapper {
        display: flex;
        justify-content: center;
        height: 7vh;
    }

    .up {
    cursor: pointer;
    display: flex;
    flex-basis: content;
    transform: scaleY(-1);
    margin-right: auto;
    margin-left: 4vw;
    }

    .down {
    cursor: pointer;
    display: flex;
    flex-basis: content;
    margin-left: auto;
    margin-right: 4vw;
    }

    img {
        width: 13vh;
        /* height: 0vh; */
        margin-bottom: 3vh;

    }


</style>