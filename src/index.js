import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ControllerConsole } from "./scripts/controller/console.js";
import { ControllerWeb } from "./scripts/controller/web.js";

// const cController = ControllerConsole();
// window.cController = cController;

const controllerWeb = ControllerWeb();
controllerWeb.initGame("sayed", "halboos");
controllerWeb.start();
