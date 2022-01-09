<script>
    import homebutton from "./iconmonstr-home-6.svg";
    import plus from "./iconmonstr-plus-2.svg";
    import search from "./iconmonstr-magnifier-2.svg";

</script>

<div class="footer-wrapper">
    
    <a href="/" class="first"><img src={homebutton} alt="home" /></a>
    <a href="/add"><img src={plus} alt="plus" /></a>
    <a href="/search" class="last"><img src={search} alt="search" /></a>



</div>


<style>
    a {
        display: flex;
        background-color: #40444b;
        padding: 10px;
    }

    .footer-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(90px + env(safe-area-inset-bottom) + 0px);

        
    }

    .first {
        border-top-left-radius: 28px;
    }

    .last {
        border-top-right-radius: 28px;
    }

    img {
        width: 13vh;
        height: 4vh;
    }


</style>