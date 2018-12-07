<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style>
.full-page {
	background-image: url(../images/snl-background.jpg);
}
.container {
	margin-top: 0rem;
}
.card-pad {
	box-shadow: inset 0px 0px 50px 10px olive;
}
.grey.lighten-4 {
    background-color: antiquewhite !important;
}
.card {
    box-shadow: inset 0px 0px 50px 10px olive;
	margin: 6rem 0 1rem 3.5rem;
	background-color: antiquewhite;
}
.container .row {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
}
</style>
<body>
  <div class="row">
     <div class="container">
     	<div class='col s12'>
        <div class="card">
			<div class="row card-content">
            <form:form modelAttribute="selectPlayersForm" name="selectPlayersForm" id="selectPlayersForm" method="POST" autocomplete="off">
                
                <div id="errorDiv" style="display:none;">
		           <form:errors path="errorString" />
			     </div>
		     
                <div class='row'>
	                <div class='col s12'>
	                  <h5 class="indigo-text center-align">Enter Player Details</h5>
	                </div>
              	</div>
              	
              	<div class="row">
              		<div class="col s12 m6">
              			<div class="row">
              				<div class="input-field col s12">
			                  <form:input path="player1" id="player1" type="text" class="active mandatory validate"  autofocus="autofocus" tabindex="1"/>
			                  <label for="player1">Player 1</label>
			                </div>
              			</div>
              			
              			<div class="row">
              				<div class="input-field col s12">
			                  <form:input path="player3" id="player3" type="text" class="active" tabindex="3"/>
			                  <label for="player3">Player 3</label>
			                </div>
              			</div>
              		</div>
              		
              		<div class="col s12 m6">
              			<div class="row">
              				<div class="input-field col s12">
			                  <form:input path="player2" id="player2" type="text" class="active mandatory validate" tabindex="2"/>
			                  <label for="player2">Player 2</label>
			                </div>
              			</div>
              			
              			<div class="row">
              				<div class="input-field col s12">
			                  <form:input path="player4" id="player4" type="text" class="active" tabindex="4"/>
			                  <label for="player4">Player 4</label>
			                </div>
              			</div>
              		</div>
                </div>
               <div class='col s3'></div>
               <div class="actions row">
					<a class="col s3 btn btn-large waves-effect indigo" id="submitButton" tabindex="0" onclick="submitAction();" role="button">START</a>
				</div>
            </form:form>
          </div>
        </div>
        </div>
      </div>
    </div>
</body>
<script type="text/javascript">
$(document).ready(function() {
    var toastContent = "";
	$("#errorDiv [id$='.errors']").each(function() {
		toastContent += $(this).html();
		toastContent += "<br/>";
	});
	callErrorToast(toastContent);
	 
});

	function submitAction(){
	   
	   var errorFlag = false;
	   $("#selectPlayersForm input.mandatory").each(function(){
		   if($(this).val()=="" || $(this).val() == null){
			   errorFlag = true;
			   displayErrorCss(this.id);
		   }
	   });
	   if(errorFlag){
		   callErrorToast("Minimum 2 players are required");
		   return false;
	   }
	   document.getElementById("selectPlayersForm").action = "${pageContext.request.contextPath}/snl/playGame.html";
	   document.getElementById("selectPlayersForm").submit();
	}

	document.onkeypress = enterKey;

	function enterKey(evt) {
		if (!$("#submitButton").hasClass("disabled")) {
			var evt = (evt) ? evt : ((event) ? event : null);
			if (evt.keyCode == 13) {
				submitAction();
			}
		}
	}
</script>