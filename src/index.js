import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ControllerConsole } from "./scripts/controller/console.js";
import { Controller } from "./scripts/controller/controller.js";

// Console view controller
const consoleCtl = ControllerConsole();
window.consoleCtl = consoleCtl;

// Web view controller
Controller().init();
