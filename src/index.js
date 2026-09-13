import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { Player } from "./game_logic/player.js";
import { printBoard, printBoardAsTarget } from "./helpers.js";

const player1 = Player("player 1");
const player2 = Player("player 2");
let currPlayer = player1;
let currEnemy = player2;

player1.placeShips([
  [4, 7, "v"],
  [5, 2, "h"],
  [8, 1, "h"],
  [1, 8, "v"],
  [1, 1, "h"],
]);

player2.placeShips([
  [4, 6, "v"],
  [5, 2, "h"],
  [8, 0, "h"],
  [2, 9, "v"],
  [1, 1, "v"],
]);

const initNextRound = () => {
  console.clear();
  console.log("CURRENT PLAYER: ", currPlayer.name);
  printBoardAsTarget(currEnemy.gameboard.grid);
  printBoard(currPlayer.gameboard.grid);
};

const playRound = (targetCoords) => {
  if (currEnemy.gameboard.allShipsAreSunk()) return;
  try {
    currEnemy.gameboard.receiveAttack(targetCoords);
    if (currEnemy.gameboard.allShipsAreSunk()) {
      console.log(`GAMEOVER! ${currPlayer.name} wins.`);
      return;
    }
    [currPlayer, currEnemy] = [currEnemy, currPlayer];
  } catch (e) {
    console.log(e);
  }
  initNextRound();
};

initNextRound();
window.playRound = playRound;
