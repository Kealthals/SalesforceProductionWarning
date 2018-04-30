if(isProduction(window.location.host)) {
	//document.body.style.border = "5px solid red";
	var getting = browser.storage.local.get("urls");
	getting.then(onGot, onError);
}
function onError(error) {
	console.log(`Error: ${error}`);
}

function onGot(item) { 

	if(item.urls == undefined || item.urls == null || JSON.stringify(item) === "{}") {
		document.body.style.border = "5px solid red";
	} else {
		var flg = false;
			
		var records = item.urls;
		
		records.forEach(function(element) {
			if(setBorder(element.color, element.pattern)) {
				flg = true;
			}
		});
		if(flg == false) {
			document.body.style.border = "5px solid " + records[0].color;
		}
	}

}

function setBorder(color, pattern){
		if(pattern != "" && window.location.host.substring(0, window.location.host.indexOf(".")) == pattern) {
			document.body.style.border = "5px solid " + color;
			return true;
		}
		return false;
}

function isSandbox(s){
//var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
var regu =/https:\/\/.*cs[0-9]{1,3}\.(my|lightning\.)(salesforce|visual\.force)\.com/g;
var re = new RegExp(regu);
if (re.test(s)) {
        return true;
    }else{
       return false;
    }
}
function isProduction(s){
//var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
var regu =/(login\.|(ap|na|eu)[0-9]{1,3}\.|.*[^(cs)][^0-9]{1,3}\.(my|lightning)\.)(salesforce|visual\.force)\.com/g;
var re = new RegExp(regu);
if (re.test(s)) {
        return true;
    }else{
       return false;
    }
}
