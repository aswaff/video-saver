<script>
    import homebutton from "./iconmonstr-home-6.svg"
    import plus from "./iconmonstr-plus-2.svg"
</script>

<hr />
<div class="footer-wrapper">
    <img src={homebutton} alt="home" />
    <img src={plus} alt="plus" />



</div>


<style>
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