function submitForm(url) {
	try {
		trimAllFieldsInForm();
	} catch (e) {
	}
	if (url != null && url != "" && url != undefined) {
		document.forms[0].action = url;
	}
	document.forms[0].submit();
}
function send(baseUrl, param) {
	var finalUrl = baseUrl + "?" + param;
	submitForm(finalUrl);
}

function isValidResponse(response, contextRoot) {

	if (response == "sessionExpired") {
		location.href = contextRoot + "pub/showCustomMessage.html";
		return false;
	}
	if (response == "sessionError") {
		location.href = contextRoot + "pub/sessionError.html";
		return false;
	}
	return true;
}

function postAction(url) {
	 var delegateId = $("#deligateClaimId").val();
	 $("#delegateForm #claimId").val(delegateId);
	 document.getElementById("delegateForm").action = url;
	 if(delegateId!=undefined || delegateId!=null || delegateId!=""){
		 document.getElementById("delegateForm").submit();	
	 }else{
		 console.log("Please set deligateClaimId parameter");
	 }
	 
}