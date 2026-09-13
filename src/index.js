import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ConsoleController } from "./game_logic/console_controller.js";

const consoleController = ConsoleController();

function testWin() {
  const targets = [
    [1, 1],
    [8, 1],
    [1, 2],
    [5, 2],
    [8, 2],
    [5, 3],
    [8, 3],
    [5, 4],
    [5, 5],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [8, 7],
    [1, 8],
    [2, 8],
    [3, 8],
  ];

  targets.forEach((target) => {
    consoleController.play(target);
    consoleController.play(target);
  });
}

testWin();
