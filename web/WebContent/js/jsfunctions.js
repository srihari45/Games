Array.prototype.sum = function(selector) {
	    if (typeof selector !== 'function') {
	        selector = function(item) {
	            return item;
	        }
	    }
	    var sum = 0;
	    for (var i = 0; i < this.length; i++) {
	        sum += parseFloat(selector(this[i]));
	    }
	    return sum.toFixed(2);
};

function isAlphanumeric(obj){
	return isAlphanumericValue(obj.value);
	
}
function isAlphanumericValue(numaric){
	
	var valid = true;
	for(var j=0; j<numaric.length; j++){
		var alphaa = numaric.charAt(j);
		var hh = alphaa.charCodeAt(0);
		if(!(hh > 47 && hh<58) && !(hh > 64 && hh<91) && !(hh > 96 && hh<123)) {
			valid = false;
            break;
		}
	}
	
	 return valid;
}
function validatePassword(obj){
	if(obj.value != ''){
		$("#"+obj.id+"Error").remove();
		$("#"+obj.id).removeClass('reqErrorClass');
		if(obj.value.length < 8){
			$("#errorDiv").html($("#errorDiv").html() + "<span id='"+obj.id+"Error'><br/>New Password should be minimum of 8 characters.</span>");
			$("#"+obj.id).addClass('reqErrorClass');
		}else if(!isAlphaAndNumeric(obj)){
			$("#errorDiv").html($("#errorDiv").html() 
					+ "<span id='"+obj.id+"Error'><br/>New Password should be combination of alphabets and characters.</span>");
			$("#"+obj.id).addClass('reqErrorClass');
		}
	}
}

function isValidNumber(obj){
	trim(obj);
	var num = obj.value.toString().replace(/\e|\E/g,'');
	if(isNaN(num))
		obj.value = '';
	if(obj.value.length != num.length)
		obj.value = '';
}

function isValidIntVal(obj){
	var num = obj.value.toString().replace(/\e|\E/g,'');
	if(num.indexOf(".")!=-1){
		obj.value="";
	}
	if(isNaN(num))
		obj.value = '';
	if(obj.value.length != num.length)
		obj.value = '';
}

function formatCurrency(numberObj) {
	numberObj.value = formatCurrencyValueInput(numberObj.value);
}

function formatCurrencyWithPositiveAmount(numberObj){
	if(numberObj.value.indexOf("-") != -1){
		numberObj.value = "";
		return false;
	}
	numberObj.value = formatCurrencyValueInput(numberObj.value);
}

function formatCurrencyValueInput(numVal){
	  var num = numVal.toString().replace(/\$|\,/g,'');
	  if(isNaN(num))
	     return "";
	  if(num=="")
		 return ""; 
	  
	  sign = (num == (num = Math.abs(num)));
	  num = Math.floor(num*100+0.50000000001);
	  cents = num%100;
	  num = Math.floor(num/100).toString();
	  if(cents<10)
	    cents = "0" + cents;
	  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
	  num = '$'+(((sign)?'':'-') + num + '.' + cents);
	  
	  return num;
}

function trimAllFieldsInForm(){
	/*var length = document.forms[0].length;
	for(var i = 0; i< length ;i++){
		if(document.forms[0].elements[i].type == 'text' || document.forms[0].elements[i].type == 'textarea' 
						|| document.forms[0].elements[i].type == 'password'){
			var val = document.forms[0].elements[i].value;
			val= val.replace(/^\s+/,"");
			val = val.replace(/\s+$/,"");
			document.forms[0].elements[i].value = val;
		}
		else if(document.forms[0].elements[i].type == 'file'){
			var who = document.forms[0].elements[i];
			var who2 = who.cloneNode(false); 
			who2.onchange = who.onchange; 
			who.parentNode.replaceChild(who2,who); 
		}
	}*/
	$("input[type=text], input[type=password], textarea").each(function(){
		var val = $(this).val();
		val= val.replace(/^\s+/,"");
		val = val.replace(/\s+$/,"");
		$(this).val(val);
	});
	
}
if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
	   return this.replace(/^\s+|\s+$/g, ''); 
	};
}

function trim(obj){
	try {
		var val = obj.value.replace(/^\s+/,"");
		val = val.replace(/\s+$/,"");
		obj.value = val;
	}catch(e){}
}

//Contador de caracteres.

function Contar(elName,spName,displayMsg,maxChars) {
	
	var elObj = getObject(elName);
	alert(elObj);
	if(elObj == null){ 
		return;
	}
	
	var s = elObj.value;
	var elobj = elObj.value;
	s = replaceFunnyChars(s);
    var spObj=getObject(spName);
	var longitud=maxChars - s.length;
	if(longitud <= 0) {
		longitud=0;
		displayMsg='<span class="disable"> '+displayMsg+' </span>';
		s=s.substr(0,maxChars);
	}
	//elObj.value=s;
	if(s.length != elobj.length ){
	elObj.value=s;
	//alert("not equal");
	}
	spObj.innerHTML = displayMsg.replace("{CHAR}",longitud);
	
}

function getObject(obj) {
  if(document.all) {
    if(typeof obj=="string") {
      return document.all(obj);
    } else {
      return obj.style;
    }
  }
  if(document.getElementById) {
    if(typeof obj=="string") {
      return document.getElementById(obj);
    } else {
      return obj.style;
    }
  }
  return null;
}

function replaceFunnyChars(s){ 
	if(s==null) return "";
	//Replace funnies
	//s=s.replace(/\"/g,"'");		// In case you want to replace double quotes with single quotes
	s=s.replace(/\xa0/g,"");		// ?
	s=s.replace(/\xa9/g,"\(c\)");	// copyright
	s=s.replace(/\xae/g,"\(r\)");	// registered
	s=s.replace(/\xb7/g,"*");		// ? funny *
	s=s.replace(/\u2018/g,"'");		// Unicode character: 2018 hex = 8216 dec // LEFT SINGLE QUOTATION MARK = MS smart apostrophe 1
	s=s.replace(/\u2019/g,"'");		// Unicode character: 2019 hex = 8217 dec // RIGHT SINGLE QUOTATION MARK = MS smart apostrophe 2
	s=s.replace(/\u201c/g,'"');		// Unicode character: 201C hex = 8220 dec // LEFT DOUBLE QUOTATION MARK = MS smart quote left
	s=s.replace(/\u201d/g,'"');		// Unicode character: 201D hex = 8221 dec // RIGHT DOUBLE QUOTATION MARK = MS smart quote right
	//s=s.replace(/\u8220/g,"'");	// In case you want to replace double quotes with single quotes
	//s=s.replace(/\u8221/g,"'");	// In case you want to replace double quotes with single quotes
	s=s.replace(/\u2026/g,"...");	// Unicode character: 2026 hex = 8230 dec // HORIZONTAL ELLIPSIS = MS smart ...
	s=s.replace(/\u2002/g,"");		// Unicode character: 2002 hex = 8194 dec // EN SPACE
	s=s.replace(/\u2003/g,"");		// Unicode character: 2003 hex = 8195 dec // EM SPACE
	s=s.replace(/\u2009/g,"");		// Unicode character: 2009 hex = 8201 dec // THIN SPACE
	s=s.replace(/\u2012/g,"--");	// Unicode character: 2012 hex = 8210 dec // FIGURE DASH
	s=s.replace(/\u2013/g,"--");	// Unicode character: 2013 hex = 8211 dec // EN DASH
	s=s.replace(/\u2014/g,"--");	// Unicode character: 2014 hex = 8212 dec // EM DASH = MS smart dash
	s=s.replace(/\u2015/g,"--");	// Unicode Character 'HORIZONTAL BAR' (U+2015) = 8213 dec
	s=s.replace(/\u2122/g,"\(tm\)");// Unicode Character 'TRADE MARK SIGN' (U+2122) = 8482 dec
	return s;
}


function validatePhoneNo(obj){
	trim(obj);
	obj.value = obj.value.toString().replace(/\s|\e|\E/g,'');
	var num = obj.value.toString().replace(/\(|\)|\-|\e|\E/g,'');
	obj.value=num;
	if(isNaN(num))
		return false;
	if(obj.value.substring(0,1) != '(')
	obj.value = '('+ obj.value;
	if(obj.value.length > 4 &&obj.value.substring(4,5) != ')')
	obj.value = obj.value.substring(0,4) + ')' + obj.value.substring(4,obj.value.length) ;
	if(obj.value.length > 8 &&obj.value.substring(8,9) != '-')
	obj.value = obj.value.substring(0,8) + '-' + obj.value.substring(8,obj.value.length) ;
	if(obj.value.length > 13)
	obj.value = obj.value.substring(0,13);
	if(obj.value.length < 13)
		return false;
	
	return true;
}

function validateZip(obj) {
	
	trim(obj);
	var num = obj.value.toString().replace(/\s|\e|\E/g,'');
	num = num.toString().replace(/\(|\)|\-|\e|\E/g,'');
	if (obj.value != '' && (isNaN(num) || num.length != 5)) {
		return false;
	}
	return true;
}


/**
 * Set highlight on the elements of the given ids. It basically sets the classname of the elements
 * to 'highlight'. This require at least a CSS style class '.highlight'.
 * @param ids The ids of the elements to be highlighted, comma separated.
 */
function setHighlight(ids) {
    var idsArray = ids.split(",");
    for (var i = 0; i < idsArray.length; i++) {
        //eval("document.forms[0]."+idsArray[i]+".className = 'highlight'");
        $("#"+idsArray[i]).css("background-color", "red");
    }
}

function dateFormat(dateField,dateErrDiv){
	try{
		var dateFieldVal = document.getElementById(dateField).value;
		//trim spaces
		dateFieldVal=dateFieldVal.replace(/^\s+/,"");
		dateFieldVal=dateFieldVal.replace(/\s+$/,"");
		
		//Do not perform validation if the date field is empty [in case of non-mandatory date field we need to do this]
		if(dateFieldVal!=''){
			if (isDate(dateFieldVal,dateField,dateErrDiv)==false){
				document.getElementById(dateField).value="";
				return false;
			}
		    return true;
	    }
	}catch(e){}
	
}
function validateTime(obj){
	trim(obj);
	
	obj.value = obj.value.toString().replace(/\s|\e|\:|\E/g,'');
	if(isNaN(obj.value)){
		obj.value = "";
		return;
	}
	if(obj.value.length<4){
		obj.value = "";
		return;
	}
	if(obj.value.substring(2,3)!=":"){
		obj.value = obj.value.substring(0,2)+":"+obj.value.substring(2,obj.value.length);
	}
	if(obj.value.length>5 && obj.value.substring(5,6)!=":"){
		obj.value = obj.value.substring(0,5);
	}
	if(obj.value !=""){
		
		//24 Hours HH:MM format regEx.
		var pattern = '^((\\d)|(0\\d)|(1\\d)|(2[0-3]))\\:((\\d)|([0-5]\\d))$';
		
		var value = obj.value; 
		if (!value.match(new RegExp(pattern))) {
			 obj.value="";
		}
	}
}
function isValidTime(inputTime){
	trim(inputTime);
	var isValidTime = true;
	var pattern = '^((\\d)|(0\\d)|(1\\d)|(2[0-3]))\\:((\\d)|([0-5]\\d))$';
	if(inputTime.value.length<5){
		isValidTime = false;
	}
	if (!inputTime.value.match(new RegExp(pattern))) {
		isValidTime = false;
	}
	return isValidTime;
}
function validateAlphaNumeric(obj){
	trim(obj);
	if(obj.value.search(/^[a-zA-Z0-9]+$/) == -1){
		obj.value = "";
	}
}
function isNumericWithLength(obj, length){
	
	trim(obj);
 	if(isNaN(obj.value) || obj.value.length != length){
 		return false;
 	}else if(obj.value.indexOf(".") != -1){
 		return false;
 	}
 	return true;
}
function Contar(elName,spName,displayMsg,maxChars) {
	
	var elObj=getObject(elName);
	if(elObj == null){ 
		return;
	}
	
	var s = elObj.value;
	var elobj = elObj.value;
	s = replaceFunnyChars(s);
    var spObj=getObject(spName);
	var longitud=maxChars - s.length;
	if(longitud <= 0) {
		longitud=0;
		displayMsg='<span class="disable"> '+displayMsg+' </span>';
		s=s.substr(0,maxChars);
	}
	//elObj.value=s;
	if(s.length != elobj.length ){
	elObj.value=s;
	//alert("not equal");
	}
	spObj.innerHTML = displayMsg.replace("{CHAR}",longitud);
	
}
function emailValidation(obj, label){
	alert(obj);
	 $("#"+obj.id+"Error").remove();
	if(obj.value != ''){
		$("#"+obj.id).removeClass('reqErrorClass');
		 if(!validateEmail(obj)){
			 $("#errorDiv").html($("#errorDiv").html() + "<span id='"+obj.id+"Error'><br/>Please enter a valid "+label+".</span>");
			 $("#errorDiv").addClass("form-group alert alert-danger");
			 $("#"+obj.id).addClass('reqErrorClass');
			 setTimeout(function(){document.location.href = "#";},10);
		 }
	}
}
function validateEmail(email){
	
	var filter = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-\_])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email.value)) {
		return false;
	}
	return true;
}
function validateEmailByString(email){
	
	var filter = /^([a-zA-Z0-9_+\.\-])+\@(([a-zA-Z0-9\-\_])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email)) {
		return false;
	}
	return true;
}

function vaildatePhoneNumber(phone) {
	
	var filter = /^\d{3}-?\d{3}-?\d{4}$/g;
	if (!filter.test(phone.value)) {
		return false;
	}
	return true;
			
}
function isAlphaAndNumeric(obj){
	trim(obj);
    var pw = obj.value;
	var valid = 2 <= (/[a-z]/i.test(pw) +/[0-9]/.test(pw));
    return valid;
}

function isSecondDateBigger(startDt, endDt) {
	trim(startDt);
	trim(endDt);
	return isSecondDateValueBigger(startDt.value, endDt.value);
}
function isSecondDateValueBigger(value1, value2) {
	if(value1 != "" && value2 != "" ){
		var d1 = new Date(fourDigitYearFormat(value1));
		var d2 = new Date(fourDigitYearFormat(value2));
		if(d1.getTime() > d2.getTime()){
			return false;
		}
	}
	return true;
}
function fourDigitYearFormat(value) {
	try {
		var parts = value.split("/");
		if(parts[2] != undefined && parts[2].length == 2){
			var yr = parts[2];
			var current = new Date();
			var year = current.getFullYear();
			if(parseInt(yr) <= parseInt(year.toString().substring(2, 4))){
				yr = year.toString().substring(0, 2) + yr;
			} else {
				yr = (parseInt(year.toString().substring(0, 2)) -1)  + yr;
			}
			value = parts[0]+"/"+parts[1]+"/"+yr;
		}
	}catch(e){}
	return value;
}
function autoFormatDate(obj, e){

	if(e.keyCode == 8 || (e.keyCode >= 37 && e.keyCode <= 40) 
			|| e.keyCode == 46 || e.keyCode == 36 || e.keyCode == 35){
		return;
	}
	
	if(obj.value.length == 2){
		var val = obj.value.substring(0, 2);
		if(val.indexOf('/') == -1){
			obj.value = obj.value + "/";
		}
	}
	if(obj.value.length == 5){
		var val = obj.value.substring(3, 5);
		if(val.indexOf('/') == -1){
			obj.value = obj.value + "/";
		}
	}

	var sel = getInputSelection(obj).start;
	if(obj.value.indexOf("//") != -1){
		obj.value = obj.value.replace("//","/");
	}
	
	var slots = obj.value.split("/");
	if(slots.length > 2){
		obj.value = slots[0] + "/" + slots[1] + "/" + slots[2];
	}
	//set cursor position only when modifying middle characters in date field
	if(obj.value.length != sel){
		setCaretPosition(obj, sel);
	}
}
function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}
function setCaretPosition(elemId, caretPos) {
    var elem = elemId;
    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else {
                elem.focus();
            }
        }
   }
}
function formatDate(obj) {
	var dateSplit = obj.value.split("/");
	if(dateSplit.length > 2){
		var month = dateSplit[0];
		if(month.length == 1) {
			month = "0" + month;
		}
		var day = dateSplit[1];
		if(day.length == 1) {
			day = "0" + day;
		}
		var yr = dateSplit[2];
		if(yr.length > 4){
			yr = yr.substring(0,4);
		}
		if(yr.length == 2){
			var d = new Date();
			var year = d.getFullYear();
			if(parseInt(yr) <= parseInt(year.toString().substring(2, 4))){
				yr = year.toString().substring(0, 2) + yr;
			} else {
				yr = (parseInt(year.toString().substring(0, 2)) -1)  + yr;
			}
		}
	    obj.value = month + "/" + day + "/"+ yr;
	}
}
function checkdate(input){
	var returnVal = true;
	if(input.value != "" && input.value != $("#"+input.id).attr("title")){
		returnVal = checkDateValue(input.value);
	}
	return returnVal;
}
function checkDateValue(value) {
	var validformat=/^\d{2}\/\d{2}\/(\d{2}|\d{4})$/; //Basic check for format validity
	var valid = true;
	if (!validformat.test(value)){
		valid = false;
	} else {
		//Detailed check for valid date ranges
		var monthfield = value.split("/")[0];
		var dayfield = value.split("/")[1];
		var yearfield = value.split("/")[2];
		if(yearfield.toString().length == 2){
			var d = new Date();
			var year = d.getFullYear();
			if(parseInt(yearfield) <= parseInt(year.toString().substring(2, 4))){
				yearfield = year.toString().substring(0, 2) + yearfield;
			}
		}
		var dayobj = new Date(yearfield, monthfield-1, dayfield);
		if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield)){
			valid = false;
		}
	}
	return valid;
}
function checkDateValueAndReset(obj) {
	if(!checkDateValue(obj.value)) {
		obj.value = "";
	}
}
var phrases = ["<&script","<a","<img","iframe&src","<body","<input","<style","<link","<html","<title","<header","<canvas","<textarea","<form","<bgsound",
      		 "<frame","<object","<meta","<br","<body","<xss","<table","<base","object","embed","<span","<field","<%&%>","<div","<blockquote","<button"];

//live is erplaced with on
$("input[type=text], input[type=password], select, textarea").on("blur", function() {

	var val = $(this).val().toLowerCase();

	if(val != "" && val.length > 0) {
		var found = false;
		for(var i = 0; i < phrases.length; i++) {
			var phrase = phrases[i].toLowerCase();
			if(phrase.indexOf('&') != -1) {
				var phArr = phrase.split('&');
				for(var j = 0; j < phArr.length; j++) {
					if(val.indexOf(phArr[j]) != -1) {
						found = true;
					} else {
						found = false;
						break;
					}
				}
				if(found) {
					break;
				}
			} else if(phrase.indexOf('|') != -1) {
				var phArr = phrase.split('|');
				for(var j = 0; j < phArr.length; j++) {
					if(val.indexOf(phArr[j]) != -1) {
						found = true;
						break;
					}
				}
				if(found) {
					break;
				}
			} else {
				if(val.indexOf(phrase) != -1) {
					found = true;
					break;
				}
			}
		}
		if(found) {
			$(this).val("");
		}
	}
});
function isAlphanumericWithLength(obj, length) {
	
	for (var i = 0; i < obj.value.length; i++) {
		var alphaa = obj.value.charAt(i);
		var hh = alphaa.charCodeAt(0);
		if (!(hh > 47 && hh<58) && !(hh > 64 && hh<91) && !(hh > 96 && hh<123)) {
			return false;
		}
	}
	if (obj.value.length != length) {
		return false;
	}
	return true;
}
function validateEmailId(email, developing){
	
	var filter = "";
	if (developing) {
		filter = /^([a-zA-Z0-9\+_\.\-])+\@(([a-zA-Z0-9\-\_])+\.)+([a-zA-Z0-9]{2,4})+$/;
	} else {
		filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-\_])+\.)+([a-zA-Z0-9]{2,4})+$/;
	}
	if (!filter.test(email.value)) {
		return false;
	}
	return true;
}

$(document).ready(function(){
	$("input[type=text], input[type=password], textarea").on("blur", function(){
		var val = $(this).val();
		val = val.replace(/^\s+/,"");
		val = val.replace(/\s+$/,"");
		$(this).val(val);
	});
	$("input[readonly], textarea[readonly]").each(function() {
		var input = $(this);
		setTimeout(function(){input.next("label").addClass("active");}, 100);
   });
});

function formatCurrencyValueInputForNegativeValues(val) {
	if(isNaN(val))
		val = "0";
	return parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function negativeFormatCurrencyValueInput(val){
	val = val.toString().replace(/\$|\,/g,'');
	if(val < 0){
		val = val * -1;
		val = "$("+formatCurrencyValueInputForNegativeValues(val)+")";
	}else{
		val = "$"+formatCurrencyValueInputForNegativeValues(val);
	}	
	return val;
}


function validateFileExt(id) {
	var ext = $("#"+id).val().split('.').pop().toLowerCase();
	if($.inArray(ext, ['doc','docx','jpg','jpeg','pdf','png','gif']) == -1) {
		return false;
	}
	return true;
}

function isImageFileName(value) {

	var imgExt = ".JPG,.JPEG,.jpg,.jpeg,.jpe,.jfif,.PNG,.png,.GIF,.gif";
    if (imgExt.indexOf(value.substring(value.indexOf("."), value.length)) == -1) {
    	return false;
    }
    return true;
}

function negativeFormatCurrencyForThreeDecimals(val){
	val = val.toString().replace(/\$|\,/g,'');
	if(val < 0){
		val = val * -1;
		val = "$("+formatCurrencyForThreeDecimals(val)+")";
	}else{
		val = "$"+formatCurrencyForThreeDecimals(val);
	}	
	return val;
}

function formatCurrencyForThreeDecimals(val) {
	if(isNaN(val))
		val = "0";
	return parseFloat(val).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function hasExtension(data) {
	var extns=['.doc','docx','.xls','xlsx','xlsb','xlsm'];
	data = data.toLowerCase();
	return (new RegExp('(' + extns.join('|').replace(/\./g, '\\.') + ')$')).test(data);
}

function getStringFromDate(obj) {
	
	if (obj) {
		var date = new Date(obj);
	    var day = date.getDate();
	    var monthIndex = date.getMonth() + 1;
	    var year = date.getFullYear();

	    if (day < 10)
	    	day = "0" + day;
	    if (monthIndex < 10)
	    	monthIndex = "0" + monthIndex;

	    var result = monthIndex + '/' + day + '/' + year;
	    return result;
	} else {
		return "";
	}
}

function displayErrorCss(targetId){
	var targetIdArr = targetId.split(",");
	for(var i=0; i<targetIdArr.length; i++){
		$("#"+targetIdArr[i]).removeClass("valid");
		$("#"+targetIdArr[i]).addClass("invalid");
	}
}

function callErrorToast(toastContent) {
	$("#toast-container").text("");
	if (toastContent != undefined && toastContent != "") {
		Materialize.toast(toastContent, 5000, 'rounded');
	}
	
}
function showErrorCssWithToast(targetId, toastContent){
	displayErrorCss(targetId);
	callErrorToast(toastContent);
}
function scrollToElement(scrollElement){
	$('html, body').animate({
	        scrollTop: $("#" + scrollElement + "").offset().top
	}, 2);
};
function removeErrorCss(targetId) {
	$("#"+targetId).removeClass("invalid");
	$("#"+targetId).addClass("valid");
}

function isEmailValid(email){
   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return regex.test(email);
		
}

function loadPdf(contextPath,attachDiv,fileLocation){
	/*var heightProp = $("#"+attachDiv).height();
	var widthProp = $("#"+attachDiv).width();
	if(height!=null || height!=""){
		heightProp = height;
	}
	if(width!=null || width!=""){
		widthProp = width;
	}*/
	 var url = encodeURIComponent(fileLocation);
	 var fileUrl = contextPath+'/provider/pdfView.html?file=' + url;
	 var addHtml = "<iframe id='iframe1' src='"+fileUrl+"' width='100%' height='925px'></iframe>";
	 $("#"+attachDiv).html(addHtml);
}

function differenceBetweenDates(fromDt, toDt) {
	if (fromDt && toDt) {
		// end - start returns difference in milliseconds 
		var diff = new Date(toDt).getTime() - new Date(fromDt).getTime();
		// get days
		var days = diff/1000/60/60/24;
		return days;
	}
	return null;
}

function isGreaterThanToday(date) {
	var days = differenceBetweenDates(date,new Date());
	if (days < 0) {
		return true;
	}
	return false;
}
var isMobile = {
		   Android: function() {
		       return navigator.userAgent.match(/Android/i);
		   },
		   BlackBerry: function() {
		       return navigator.userAgent.match(/BlackBerry/i);
		   },
		   iOS: function() {
		       return navigator.userAgent.match(/iPhone|iPod/i);
		   },
		   Opera: function() {
		       return navigator.userAgent.match(/Opera Mini/i);
		   },
		   Windows: function() {
		       return navigator.userAgent.match(/IEMobile/i);
		   },
		   any: function() {
		       return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		   }
	};

	var isIpad = {
			Ipad : function(){
				return navigator.userAgent.match(/iPad/i);
			},
			any : function(){
				return (isIpad.Ipad());
			}
	};

function disablePageActionsAndUpdateText(id, idText) {
	$(".page-actions a").each(function() {
		$(this).addClass("disabled");
	});
	$("#" + id).text(idText);
}

function enablePageActionsAndUpdateText(id, idText) {
	$(".page-actions a").each(function() {
		$(this).removeClass("disabled");
	});
	$("#" + id).text(idText);
}
function isAnySpecialChar(code) {
	 return /[^A-Za-z0-9._]/.test(code);	
}
function scrollbar(id){
	 $('#'+id+'').niceScroll({
		 cursorwidth: '10px',
		 cursorcolor: "#b1babe",
		 cursorfixedheight: 200,
		/*  railhoffset: {top: 10, left: 0},
		 cursorborder: "",*/
		 autohidemode: false,
		 nativeparentscrolling :false
	 }).resize();
}
function validateEmailString(email){
	
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-\_])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email)) {
		return false;
	}
	return true;
}
function loadAgencyPdf(contextPath,attachDiv,fileLocation){
	/*var heightProp = $("#"+attachDiv).height();
	var widthProp = $("#"+attachDiv).width();
	if(height!=null || height!=""){
		heightProp = height;
	}
	if(width!=null || width!=""){
		widthProp = width;
	}*/
	 var url = encodeURIComponent(fileLocation);
	 var fileUrl = contextPath+'/agency/pdfView.html?file=' + url;
	 var addHtml = "<iframe id='iframe1' src='"+fileUrl+"' width='100%' height='925px'></iframe>";
	 $("#"+attachDiv).html(addHtml);
}

function clearAllFieldsById(id) {
	$(".toast").remove();
	$("#" + id + " input").not("input[type=submit], input[type=button]").each(function() {
		$(this).val("");
		if ($(this).hasClass("invalid")) {
			$(this).removeClass("invalid");
		}
	});
	$("#" + id + " select").each(function() {
		$(this).prop('selectedIndex', 0);
	});
	$("select").material_select();  
	Materialize.updateTextFields();
}
//this is poly fill for deprecated startswith and endswith
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}
if (!String.prototype.endsWith) {
	  String.prototype.endsWith = function(searchString, position) {
	      var subjectString = this.toString();
	      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
	        position = subjectString.length;
	      }
	      position -= searchString.length;
	      var lastIndex = subjectString.lastIndexOf(searchString, position);
	      return lastIndex !== -1 && lastIndex === position;
	  };
}
function showTooltip(tooltipClass, content){

	 $('.'+tooltipClass).tooltipster({
	      theme: 'tooltipster-punk',
	      'maxWidth': 500, // set max width of tooltip box
	      contentAsHTML: true, // set title content to html
	      content: '<span style="font-size:0.975em;">'+content+'</span>', //add data for tool tip
	      trigger: 'custom', // add custom trigger
	       triggerOpen: { // open tooltip when element is clicked, tapped (mobile) or hovered
	           //click: true,
	           tap: true,
	           mouseenter: true
	           },
	          triggerClose: { // close tooltip when element is clicked again or tapped (mobile)
	           //click: true,
	           //scroll: false, // ensuring that scrolling mobile is not tapping!
	           tap: true,
	           mouseleave: true
	           }
	  });
 }
function showTooltipForMobiles(tooltipClass, content){

	 $('.'+tooltipClass).tooltipster({
	      theme: 'tooltipster-punk',
	      'maxWidth': 500, // set max width of tooltip box
	      side: 'left',
	      contentAsHTML: true, // set title content to html
	      content: '<span style="font-size:0.975em;">'+content+'</span>', //add data for tool tip
	      trigger: 'custom', // add custom trigger
	       triggerOpen: { // open tooltip when element is clicked, tapped (mobile) or hovered
	           //click: true,
	           tap: true,
	           mouseenter: true
	           },
	          triggerClose: { // close tooltip when element is clicked again or tapped (mobile)
	           //click: true,
	           //scroll: false, // ensuring that scrolling mobile is not tapping!
	           tap: true,
	           mouseleave: true
	           }
	  });
}
function isLessThanEAPGDate(eapgDate, date) {
	var days = differenceBetweenDates(eapgDate,date);
	if (days < 0) {
		return true;
	}
	return false;
}
function loadAgencyPdfModel(contextPath,attachDiv,fileLocation){
	var height = $( window ).height();
	if(height > 1000) {
		height = 900;
	} else {
		height = height - 150;
	}
	 var url = encodeURIComponent(fileLocation);
	 var fileUrl = contextPath+'/agency/pdfView.html?file=' + url;
	 var addHtml = "<iframe id='iframe1' src='"+fileUrl+"' width='100%' height='" + height + "px'></iframe>";
	 $("#"+attachDiv).html(addHtml);
}

function PrintData(data, title){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();

    return true;
}
// detect mobile browsers
function mobilecheck () {
	  var check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
};
function isPdfFile(fileName){
	var isPdf = false;
	if (fileName.toLowerCase().indexOf(".pdf") != -1) {
		isPdf = true;
	}
	return isPdf;
}

function removeIntercomAtBottom() {
	setTimeout(function() {
		if(($(window).scrollTop() + $(window).height() + 40) >= $(document).height()) {
			   if (!$(".intercom-launcher-frame").hasClass("hide")) {
					$(".intercom-launcher-frame").addClass("hide");
				}
			   $("#build-text").hide();
		   } else {
			   $(".intercom-launcher-frame").removeClass("hide");
			   $("#build-text").show();
		   }
	}, 1800);
	
	$(window).scroll(function() {
	   if(($(window).scrollTop() + $(window).height() + 40) >= $(document).height()) {
		   if (!$(".intercom-launcher-frame").hasClass("hide")) {
				$(".intercom-launcher-frame").addClass("hide");
				$("#build-text").hide();
			}
	   } else {
		   $(".intercom-launcher-frame").removeClass("hide");
		   $("#build-text").show();
	   }
	});
}
function removeLastTagsfromAllTags(arr, enter_tags){
	var last_tags = arr.split(",");
	var latest_tages = "";
	for (var i = 0; i < last_tags.length; i++) {
		if (isLastExist(enter_tags, last_tags[i].trim())){
		  if (latest_tages == "") {
			latest_tages = last_tags[i].trim();
          } else {
        	latest_tages = latest_tages + " , " + last_tags[i].trim();
          }
		}
	}
	return latest_tages;
}
function isNotExist(exisTags, tag) {
	if(exisTags.indexOf(tag) == -1){
		return true;
	}
	return false;
}
function  isLastExist(rTag, tag){
	if(rTag.indexOf(tag) == -1){
		return true;
	}
	return false;
}
function removeBackTabIndexes(id) {
	$('input, a, th, button, ul, select , div').attr('tabindex', "-1"); 
	$('#' + id + ' input, #' + id + ' a, #' + id + ' button, #' + id + ' select').each(function(index, input) {
		$(this).not("div.picker").attr("tabindex", index + 1);
	}); 
}
function applyTabIndexes() {
	$('input, a, th, button, ul, select, div').each(function(index, input) {
		$(this).not("div.picker").removeAttr("tabindex"); 
	});
}
function getCurrentDateFormatted(){
	var months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = new Date().toJSON();
	var month = date.slice(5,7);
	var dt = date.slice(8,10);
	var year = date.slice(0,4);
	var fullMonth = months[month-1];
	var finalDate = fullMonth+" "+dt+", "+year;
	return finalDate;
}
function datatableExperiment (tablename, pazeSize) {
	  var $tables = $('['+tablename+']');
	  if ($tables.length == 0) return;
	  var language = {
			    "search": ""
			 };
	  
	  var dTables = $tables.DataTable({
		"language": language,
	    "pageLength": pazeSize,
	    "bLengthChange": false,
	    "bInfo": true,
	    "bAutoWidth": false,
	    "aaSorting": [],
	    columnDefs: [
            {
                className: 'mdl-data-table__cell--non-numeric'
            }
        ]
	  });
	  
	  $('.has-search input').on('keyup', function () {
	    dTables.search(this.value).draw();
	  });
	  
	  dTables.columns().every( function () {
		    var that = this;

		    $(this.footer() ).on('keyup change', function () {
		      if (that.search() !== this.value) {
		        that
		          .search( this.value )
		          .draw();
		      }
		    });


		    $(this.footer()).on('change', function () {
		      var val = $.fn.dataTable.util.escapeRegex(
		        $(this).val()
		      );

		      that
		        .search(val ? '^'+val+'$' : '', true, false)
		        .draw();
		    });

		  });
	  
	  return dTables;
}
function callDeveloping(){
   errorMessage = 'Under development..!';
   $("#toast-container").text("");
   Materialize.toast(errorMessage, 2000,'rounded');   
}

function toCamelCase(str) {
	if (!str) {
		return "";
	}
	var strVal = str.toLowerCase();
    return strVal.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function currentMonth(){
	var date = new Date();
	var monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var curMonth = date.getMonth();
	return monthsArr[curMonth];
}
