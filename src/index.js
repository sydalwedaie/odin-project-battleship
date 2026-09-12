import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { Player } from "./game_logic/player.js";

const player1 = Player("player 1");
const player2 = Player("player 2");
let attacker = player1;
let target = player2;

player1.initFormation([
  [4, 7, "v"],
  [5, 2, "h"],
  [8, 1, "h"],
  [1, 8, "v"],
  [1, 1, "h"],
]);

player2.initFormation([
  [4, 6, "v"],
  [5, 2, "h"],
  [8, 0, "h"],
  [2, 9, "v"],
  [1, 1, "v"],
]);

const initNextRound = () => {
  console.clear();
  console.log("CURRENT PLAYER: ", attacker.name);
  target.gameboard.printBoardAsTarget();
  attacker.gameboard.printBoard();
};

const playRound = (targetCoords) => {
  try {
    target.gameboard.receiveAttack(targetCoords);
    [attacker, target] = [target, attacker];
  } catch (e) {
    console.log(e);
  } finally {
    initNextRound();
  }
};

initNextRound();
window.playRound = playRound;
