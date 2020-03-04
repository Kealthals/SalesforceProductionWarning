"use strict";
if (isSalesforce(window.location.host)) {
	var getting = browser.storage.local.get(['urls', 'tabIcon']);
	getting.then(onGot, onError);
}
function onError(error) {
	console.log(`Error: ${error}`);
}

function onGot(item) {
    let isTabIconOn = false;
    if(item.tabIcon !== undefined && item.tabIcon !== "" && item.tabIcon !== null) {
        if(item.tabIcon === "ON") {
            isTabIconOn = true;
        }
    }
	if (item.urls == undefined || item.urls == null || JSON.stringify(item) === "{}") {
        setBorder("", window.location.host.substring(0, window.location.host.indexOf(".")), "", false, isTabIconOn);

	} else {
		var flg = false;

		var records = item.urls;

		records.forEach(function (element) {
            if (setBorder(element.color, element.pattern, records[0].color, element.sandbox, isTabIconOn)) {
				flg = true;
			}
		});
		if (flg == false) {
            setBorder(records[0].color, window.location.host.substring(0, window.location.host.indexOf(".")), "", false, isTabIconOn);
		}
	}
	window.onresize = function () { setBorder(onGot(item)); };

}

function setBorder(color, pattern, defaultColor, sandbox, isTabIconOn) {
	if (pattern != "" &&
		(window.location.host.substring(0, window.location.host.indexOf(".")) == pattern
			|| window.location.host.substring(0, window.location.host.indexOf("."))  == pattern + "--c"
			|| window.location.host.substring(0, window.location.host.indexOf("--")) == pattern)) {
		var type = "classic";
		if (window.location.host.indexOf(".lightning.") > 0) {
			type = "lightning";
		}
		console.log(sandbox);
		if (isProduction(window.location.host) || sandbox === true) {
            addBorder(type, color, defaultColor, isTabIconOn);
		}
		return true;
	}
	return false;
}

function addBorder(type, color, defaultColor, isTabIconOn) {
	if (color === "" || color === undefined || color === null) {
		if (defaultColor === "" || defaultColor === undefined || defaultColor === null) {
			color = "red";
		} else {
			color = defaultColor;
		}
	}
	if (document.querySelector("#SalesforceProductionWarningLeftBar") != null) {
		var leftBarObj = document.querySelector("#SalesforceProductionWarningLeftBar");
		leftBarObj.parentNode.removeChild(leftBarObj);
		var rightBarObj = document.querySelector("#SalesforceProductionWarningRightBar");
		rightBarObj.parentNode.removeChild(rightBarObj);
		var topBarObj = document.querySelector("#SalesforceProductionWarningTopBar");
		topBarObj.parentNode.removeChild(topBarObj);
		var buttomBarObj = document.querySelector("#SalesforceProductionWarningButtomBar");
		buttomBarObj.parentNode.removeChild(buttomBarObj);
	}
	if (type === "lightning") {
		var width = document.body.clientWidth > window.innerWidth ? window.innerWidth : document.body.clientWidth;
        var height = window.innerHeight;
        width = width - 5;
        height = height - 5;
	} else {
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		width = width - 5;
		height = height - 5;
	}
    var args = "margin:0px;padding:0px;position: fixed;z-index: 100;border:2.5px solid " + color + ";background:" + color;

    addBar("SalesforceProductionWarningLeftBar", args + ";width: 0px;height:" + height + "px;top:0px;left:0px;");
    addBar("SalesforceProductionWarningTopBar", args + ";width:" + width + "px;height:0px;top:0px;left:5px;");
    addBar("SalesforceProductionWarningRightBar", args + ";width: 0px;height:" + height + "px;top:5px;left:" + width + "px;");
    addBar("SalesforceProductionWarningButtomBar", args + ";width:" + width + "px;height:0px;top:" + height + "px;left:0px;");
    if(isTabIconOn) {
        setIcon(color);
    }
}

function setIcon(color) {
    let iconHerf = "";
    if(color === 'red' || color === 'Red') {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAPcA/MNoAP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhEREQAAAAAREREREQAAABEREREREAAAERERERERAAAREREREREAAAIREREREQAAERERERERAAAREREREREAAAIRABEQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === 'Aqua') {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gA4/cCAP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREREREREREREREgAAABEREREAAAAAABEREQAAAAAAARERAAAAAAAAEREAAAAAAAARERIAAAAAABERAAAAAAAAEREAAAAAAAARERIAEQABAREREREREREREREREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === "Blue") {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gA90ACAP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREREREREREREREgAAABEREREAAAAAABEREQAAAAAAARERAAAAAAAAEREAAAAAAAARERIAAAAAABERAAAAAAAAEREAAAAAAAARERIAEQABAREREREREREREREREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === "Green") {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gAO6EAAP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREREREREREREREgAAABEREREAAAAAABEREQAAAAAAARERAAAAAAAAEREAAAAAAAARERIAAAAAABERAAAAAAAAEREAAAAAAAARERIAEQABAREREREREREREREREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === "Orange") {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gA/uG0ABKg/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIQAAACIiIiIAAAAAACIiIgAAAAAAAiIiAAAAAAAAIiIAAAAAAAAiIiEAAAAAACIiAAAAAAAAIiIAAAAAAAAiIiEAIgACAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === "Purple") {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gA9wCUAP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREREREREREREREgAAABEREREAAAAAABEREQAAAAAAARERAAAAAAAAEREAAAAAAAARERIAAAAAABERAAAAAAAAEREAAAAAAAARERIAEQABAREREREREREREREREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    } else if(color === "Yellow") {
        iconHerf = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD8w2gAAPf3AP7htAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREREREREREREREgAAABEREREAAAAAABEREQAAAAAAARERAAAAAAAAEREAAAAAAAARERIAAAAAABERAAAAAAAAEREAAAAAAAARERIAEQABAREREREREREREREREREREREREREREREREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    }
    let elements = document.querySelectorAll('head link[rel*="icon"]');
    if(elements.length > 0) {
        Array.prototype.forEach.call(elements, function (node) {
            if(node.href.endsWith("favicon.ico")) {
                node.href = iconHerf;
            } else if(node.href.endsWith("img/one/apple-touch-icon-ipad.png")) {
                node.parentNode.removeChild(node);
                let iconLink = document.createElement('link');
                iconLink.type = 'image/x-icon';
                iconLink.rel  = 'icon';
                iconLink.href = iconHerf;

                document.getElementsByTagName('head')[0].appendChild(iconLink);
            }
		});
    } else {
        let iconLink = document.createElement('link');
        iconLink.type = 'image/x-icon';
        iconLink.rel  = 'icon';
        iconLink.href = iconHerf;

		document.getElementsByTagName('head')[0].appendChild(iconLink);
	}
}

function addBar(id, style) {
    var bar = document.createElement("DIV");
    bar.id = id;
    bar.style = style;
    document.body.appendChild(bar);
}

function isProduction(s) {
	var regu = /^(?!.*cs\d).(?!.*--).*\.lightning\.force\.com|(login\.|(ap|na|eu)[0-9]{1,3}\.|.*[^(cs)][^0-9]{1,3}\.my\.)(salesforce|visual\.force|visualforce)\.com$/g;
	var re = new RegExp(regu);
	if (re.test(s)) {
		return true;
	} else {
		return false;
	}
}
function isSalesforce(s) {
	var regu = /^(.*\.lightning\.force\.com|.*[\.my]?\.(salesforce|visual\.force|visualforce)\.com)$/g;
	var re = new RegExp(regu);
	if (re.test(s)) {
		return true;
	} else {
		return false;
	}
}
