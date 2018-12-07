
<style>
.snakeNlaader-box  {
	cursor: pointer;
	margin-left: 4% !important;
	background-image: url(../games/images/snl-home.jpg);
	background-position: center;
	background-size: 100% 100%;
	box-shadow: inset 0px 0px 50px 10px #B71C1C;
}
.card {
    box-shadow: inset 0px 0px 50px -9px #6f6969;
    margin: 6rem 0 1rem 3.5rem;
	background-color: antiquewhite;
}
.full-page {
	background-color: burlywood;
	background-position: center;
	background-size: 100% 100%;
}
</style>

<body>
	<div class="row">
		<div class="container">
			<div class='col s12'>
         		<div class="card">
         		
         		<div class='row'>
					<div class='floating'>
						Games
					</div>
				</div>
         		
	         	  <div class="row card-content">
	         	  	<div class="row dashboard-boxes">
		                <div class="col s12">
							<div class="col s12 m3 m-mb-2 snakeNlaader-box" id="snakeNlaader">
							    <div class="db-box"></div>
							</div>
					    </div>
				   </div>
	         	  </div>
         	    </div>
         	</div>
		</div>
	</div>
</body>

<script type="text/javascript">

$("div#snakeNlaader").on("click", function(){
	location.href = "${pageContext.request.contextPath}/pub/showingSnakeAndLadderHome.html";
});

</script>