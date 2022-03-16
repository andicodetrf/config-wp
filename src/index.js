import AlertService from "./app/alert.service";
import ComponentService from "./app/component.service";
import { run } from "./app/app";

// css loader -> it took this main.css, and turn it into JS code.
// import "./main.css";
import "./main.scss";

const alertService = new AlertService();
const componentService = new ComponentService();
console.log("test rehashing build filename");
run(alertService, componentService);
