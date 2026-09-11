import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { Player } from "./game_logic/player.js";

const player = Player();
player.initFormation([
  [4, 7, "v"],
  [5, 2, "h"],
  [8, 1, "h"],
  [1, 8, "v"],
  [1, 1, "h"],
]);

player.gameboard.receiveAttack([1, 1]);
player.gameboard.receiveAttack([3, 2]);
player.gameboard.receiveAttack([5, 4]);
player.gameboard.receiveAttack([9, 4]);

player.gameboard.printBoard();
