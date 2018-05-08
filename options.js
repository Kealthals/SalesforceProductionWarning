var num = 7;
function saveOptions(e) {

	e.preventDefault();
	document.querySelector("#savebtn").disabled = true;
	var records = { urls: [] };
	for (var i = 0; i < num; i++) {
		var record = {
			no: i,
			pattern: document.querySelector("#p" + i).value,
			color: document.querySelector("#c" + i).value,
			sandbox: document.querySelector("#s" + i).checked
		};
		records.urls.push(record);
	}
	console.log(records);
	browser.storage.local.set(records);
}

function restoreOptions() {

	function setCurrentChoice(result) {
		console.log(result);
		if (result == undefined || result == null || JSON.stringify(result) === "{}") {
			var records = { urls: [] };
			for (var i = 0; i < num; i++) {
				var record = {
					no: i,
					pattern: document.querySelector("#p" + i).value,
					color: document.querySelector("#c" + i).value,
					sandbox: document.querySelector("#s" + i).checked
				};
				records.urls.push(record);
			}
			console.log(records);
			browser.storage.local.set(records);
		} else {
			var records = result.urls;
			records.forEach(function (element) {
				document.querySelector("#p" + element.no).value = element.pattern;
				document.querySelector("#c" + element.no).value = element.color;
				document.querySelector("#s" + element.no).checked = element.sandbox;
			});
		}
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	var getting = browser.storage.local.get("urls");
	getting.then(setCurrentChoice, onError);
}

function resetForm() {
	document.querySelector("#c0").value = "Red";
	for (var i = 1; i < num; i++) {
		document.querySelector("#p" + i).value = "";
		document.querySelector("#c" + i).value = "";
		document.querySelector("#s" + i).checked = false;
	}
	document.querySelector("#savebtn").disabled = false;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#resetbtn").addEventListener("click", resetForm);
for (var i = 0; i < 7; i++) {
	document.querySelector("#p" + i).addEventListener("input",
		function () { document.querySelector("#savebtn").disabled = false; });
	document.querySelector("#c" + i).addEventListener("change",
		function () { document.querySelector("#savebtn").disabled = false; });
	document.querySelector("#s" + i).addEventListener("change",
		function () { document.querySelector("#savebtn").disabled = false; });
}
