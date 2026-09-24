import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ControllerConsole } from "./scripts/controller/console.js";
import { Game } from "./scripts/game/game.js";
import { $ } from "./scripts/helpers.js";
import { Gameboard } from "./scripts/view/gameboard.js";

// const cController = ControllerConsole();
// window.cController = cController;

const game = Game("player 1", "player 2");
game.player1.placeShipsRandom();
game.player2.placeShipsRandom();

const stateGameboard = {
  namePlayer: game.state.currPlayer.name,
  nameEnemy: game.state.currEnemy.name,
  gridPlayer: game.state.currPlayer.gameboard.grid,
  gridEnemy: game.state.currEnemy.gameboard.grid,
};

const gameboardEl = $(".wrapper-gameboard");
const viewGameboard = Gameboard(gameboardEl);
viewGameboard.render();
viewGameboard.loadData(stateGameboard);
viewGameboard.bindClickEnemy(play);

function play(target) {
  game.playRound(target);
  game.playRoundRandom();
  viewGameboard.loadData(stateGameboard);
}
