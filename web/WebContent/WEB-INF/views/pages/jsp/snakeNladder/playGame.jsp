<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<style>
.full-page {
	background-image: url(../images/snl-background.jpg);
}
.container {
	margin-top: 0rem;
}

@media only screen and (min-width: 992px) {
	.container {
		width: 70%;
	}
}
.row .col.m6 {
    width: 90%;
    margin-left: 7.5rem;
}
.row .col.m3 {
    width: 45%;
}
.db-box .throw-dice {
    position: absolute;
    top: 60%;
    left: 25%;
    right: 8%;
    width: 45%;
    font-size: 1.3rem;
    font-weight: bold;
    transform: translateY(0.75rem);
}
.current-pos {
	padding-top: 7%;
    padding-left: 10%;
}
.db-box .position-span {
	display: contents;
}
.dynamic-text {
	position: absolute;
    top: 35%;
    left: 10%;
    right: 8%;
    width: 90%;
    font-size: 1.7rem;
    font-weight: bold;
    transform: translateY(0.75rem);
}
.pointer .player-name {
	margin-left: 0.5rem;
	margin-bottom: 0px;
}
.primary-bg {
    color: darkgreen;
    background: darkseagreen;
}
.card {
	/* box-shadow: inset 0px 0px 50px -9px #6f6969; */
    box-shadow: inset 0px 0px 50px 10px olive;
	margin: 6rem 0 1rem 3.5rem;
	background-color: antiquewhite;
}
.player-title {
	color: #e6410d;
    font-size: 2rem;
    font-family: -webkit-body;
}
</style>

<body>
	<div class="row">
		<div class="container">
			<div class='col s12'>
				<div class="card">
					<div class="row card-content">
						<form:form modelAttribute="selectPlayersForm" name="selectPlayersForm" id="selectPlayersForm" method="POST" autocomplete="off">
							<form:hidden path="player1"/>
							<form:hidden path="player2"/>
							<form:hidden path="player3"/>
							<form:hidden path="player4"/>
							<form:hidden path="totalPlayers"/>
							<form:hidden path="boardName"/>
							<input type="hidden" id="entered-1" value="NO">
							<input type="hidden" id="entered-2" value="NO">
							<input type="hidden" id="entered-3" value="No">
							<input type="hidden" id="entered-4" value="No">
							
							<div class='row'>
								<div class='floating'>
									Snake and Ladder
								</div>
							</div>
							
							<div class="row dashboard-boxes">
				               <div class="col s12 m6">
									<div class="col s12 m3 m-mb-2 pointer">
										<div class="row player-name"><h5 class="player-title">${player1}</h5></div>
										<div class="db-box primary-bg">
										  	  <div class="current-pos"><h5>current position : <span class="position-span" id="player-pos-1">0</span></h5></div>
										  	  <span class="dynamic-text reg-box" id="dynamic-text-1">Its your time..</span>
											  <a class="throw-dice btn btn-large waves-effect indigo" id="getDiceValue1" onclick="throwDice(1);" role="button">Throw Dice</a>
										</div>
									</div>
									
									<div class="col s12 m3 m-mb-2 pointer">
										<div class="row player-name"><h5 class="player-title">${player2}</h5></div>
										<div class="db-box primary-bg">
										  	  <div class="current-pos"><h5>current position : <span class="position-span" id="player-pos-2">0</span></h5></div>
										  	  <span class="dynamic-text reg-box" id="dynamic-text-2">Its your time..</span>
											  <a class="throw-dice btn btn-large waves-effect indigo disabled" id="getDiceValue2" onclick="throwDice(2);" role="button">Throw Dice</a>
										</div>
									</div>
							   </div>
						   </div>
						   
						   <div class="row dashboard-boxes">
							   <div class="col s12 m6">
							   		<c:if test="${not empty selectPlayersForm.player3}">
							   			<div class="col s12 m3 m-mb-2 pointer">
											<div class="row player-name"><h5 class="player-title">${player3}</h5></div>
											<div class="db-box primary-bg">
											  	  <div class="current-pos"><h5>current position : <span class="position-span" id="player-pos-3">0</span></h5></div>
											  	  <span class="dynamic-text reg-box" id="dynamic-text-3">Its your time..</span>
												  <a class="throw-dice btn btn-large waves-effect indigo disabled" id="getDiceValue3" onclick="throwDice(3);" role="button">Throw Dice</a>
											</div>
										</div>
							   		</c:if>
									<c:if test="${not empty selectPlayersForm.player4}">
										<div class="col s12 m3 m-mb-2 pointer">
											<div class="row player-name"><h5 class="player-title">${player4}</h5></div>
											<div class="db-box primary-bg">
											  	  <div class="current-pos"><h5>current position : <span class="position-span" id="player-pos-4">0</span></h5></div>
											  	  <span class="dynamic-text reg-box" id="dynamic-text-4">Its your time..</span>
												  <a class="throw-dice btn btn-large waves-effect indigo disabled" id="getDiceValue4" onclick="throwDice(4);">Throw Dice</a>
											</div>
										</div>
									</c:if>
							   </div>
						   </div>
					   </form:form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script>

function throwDice(id){
	$("#getDiceValue"+id).addClass("disabled");
	window.setTimeout(function (){getDiceValue(id);}, 2000);
}

function getDiceValue(id){
	var diceVal = Math.floor((Math.random() * 6) + 1);
	$("#dynamic-text-"+id).html("It is " + diceVal);
	if($("#entered-"+id).val() == "NO"){
		if(parseInt(diceVal) == 1){
			$("#entered-"+id).val("YES");
			window.setTimeout(function (){getDiceMovement(id, diceVal);}, 1000);
		} else {
			exchange(id);
		}
	} else {
		window.setTimeout(function (){getDiceMovement(id, diceVal);}, 1000);
	}
}

function exchange(id){
	if (id == $("#totalPlayers").val()) {
		$("#getDiceValue1").removeClass("disabled");
	} else {
		var val = parseInt(id) + 1;
		$("#getDiceValue"+val).removeClass("disabled");
	}
}

function getDiceMovement(id, diceVal){
	
	$.ajax({
		url : "${pageContext.request.contextPath}/snl/diceMovement.html",
		method : 'POST',
		data : {
			"currentPosition" : $("#player-pos-"+id).html(),
			"diceNumber" : diceVal,
			"boardName" : $("#boardName").val()
		},
		success : function(data) {
			var dataArr = data.split("#");
			$("#player-pos-"+id).html(dataArr[1]);
			$("#dynamic-text-"+id).html(dataArr[0]);
			if(dataArr[1] == '100'){
				mbox.alert("Hey! " + $("#player"+id).val() + ".. " + dataArr[0], "OK", goHome);
			}
			exchange(id);
		},
		error : function(jq, status, message) {
			console.log(message);
		}
	});
}

function goHome(){
	location.href = "${pageContext.request.contextPath}/pub/showingSnakeAndLadderHome.html";
}
</script>