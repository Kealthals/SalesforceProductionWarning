if(isProduction(window.location.host)) {
    document.body.style.border = "5px solid red";
}

function isSandbox(s){
//var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
var re = new RegExp(regu);
if (re.test(s)) {
        return true;
    }else{
       return false;
    }
}
function isProduction(s){
//var regu =/https:\/\/.*cs[0-9]{1,2}\.(my\.)*salesforce\.com/g;
var regu =/(login\.|(ap|na|eu)[0-9]{1,2}\.|.*[^(cs)][^0-9]{1,2}\.my\.)salesforce\.com/g;
var re = new RegExp(regu);
if (re.test(s)) {
        return true;
    }else{
       return false;
    }
}
