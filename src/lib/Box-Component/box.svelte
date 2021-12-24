<div class="box">
	<slot></slot>
</div>

<style>
	.box {
		width: 30vw;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding-bottom: 2vh;
		margin: 0 0 1em 0;
        display: flex;
        flex-direction: column;
        overflow-wrap: anywhere;
	}


</style>