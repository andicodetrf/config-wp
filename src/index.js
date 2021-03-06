import AlertService from "./app/alert.service";
import ComponentService from "./app/component.service";
import { run } from "./app/app";

// css loader -> it took this main.css, and turn it into JS code.
// import "./main.css";
import "./main.scss";

const alertService = new AlertService();
const componentService = new ComponentService();
console.warn("console.warn printed in prod");
console.info("console.info printed in prod");
console.log("console.log printed in prod");
console.debug("console.debug printed in prod");
console.error("console.error printed in prod");
run(alertService, componentService);
