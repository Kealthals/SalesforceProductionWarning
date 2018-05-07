var num = 7;
function onError(error) {
	console.log(`Error: ${error}`);
}

function setCurrentChoice(result) {
	if (result == undefined || result == null || JSON.stringify(result) === "{}") {
		document.querySelector("#noList").classList.toggle("disabled");
	} else {
		var records = result.urls;
		records.forEach(function (element) {
			var pattern = element.pattern;
			var color = element.color;
			if (pattern == "------") {
				pattern = "--Default--";
			} else if (pattern == "") {
				pattern = "--None--";
			}
			if (color == "") {
				if (pattern === "--None--") {
					color = "white";
				} else {
					color = records[0].color;
				}
			}
			document.querySelector("#p" + element.no).textContent = pattern;
			document.querySelector("#p" + element.no).style = "margin: 1px; background:linear-gradient(to left, " + color + ", #f8f6f2);"
		});
	}
}
var getting = browser.storage.local.get("urls");
getting.then(setCurrentChoice, onError);
document.querySelector("#options").addEventListener("click", JumpOptions);

function JumpOptions(e) {
	e.preventDefault();
	function onOpened() {
	  console.log(`Options page opened`);
	}

	function onError(error) {
	  console.log(`Error: ${error}`);
	}

	var opening = browser.runtime.openOptionsPage();
	opening.then(onOpened, onError);
	window.close();
}