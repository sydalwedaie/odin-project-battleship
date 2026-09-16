import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ConsoleController } from "./scripts/controller/console.js";

const consoleController = ConsoleController();
window.consoleController = consoleController;
