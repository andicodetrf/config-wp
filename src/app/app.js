const alertService = new AlertService();
const componentService = new ComponentService();
const run = (alertService, componentService) => {
	alertService.hideErrors();
	componentService.onClick(() => {
		alertService.hideErrors();
		const inputs = componentService.getInputs();
		const parsedInputs = parseInputs(...inputs);

		if (inputsAreValid(...parsedInputs)) {
			const [numA, numB] = parsedInputs;
			componentService.setResults(numA + numB);
		} else {
			componentService.setResults("");
			alertService.handleAdditionError(inputs, parsedInputs);
		}
	});
};

run(alertService, componentService);
