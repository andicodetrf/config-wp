class ComponentService {
	constructor() {
		this.numberOneInput = document.getElementById("numberOne");
		this.numberTwoInput = document.getElementById("numberTwo");
		this.addValuesButton = document.getElementById("addValues");
		this.resultDiv = document.getElementById("result");
	}

	getInputs() {
		return [this.numberOneInput.value, this.numberTwoInput.value];
	}

	setResults(str) {
		this.resultDiv.innerText = str;
	}

	onClick(cb) {
		this.addValuesButton.addEventListener("click", cb);
	}
}
