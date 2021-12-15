<script>
    import homebutton from "./iconmonstr-home-6.svg"
    import plus from "./iconmonstr-plus-2.svg"
</script>

<hr />
<div class="footer-wrapper">
    <a href="/"><img src={homebutton} alt="home" /></a>
    <a href="/add"><img src={plus} alt="plus" /></a>



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

    img {
        width: 13vh;
        /* height: 0vh; */
        margin-bottom: 3vh;

    }


</style>