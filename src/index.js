import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { ControllerConsole } from "./scripts/controller/console.js";
import { Game } from "./scripts/game/game.js";
import { GridEnemy, GridPlayer } from "./scripts/view/grid.js";
import { $ } from "./scripts/helpers.js";

// const cController = ControllerConsole();
// window.cController = cController;

const game = Game("player 1", "player 2");

const playerGridEl = $(".grid-player");
const enemyGridEl = $(".grid-enemy");

const playerGridView = GridPlayer(playerGridEl);
const enemyGridView = GridEnemy(enemyGridEl);

game.player1.placeShipsRandom();
game.player2.placeShipsRandom();

playerGridView.render();
enemyGridView.render();
enemyGridView.bindCellClick(play);

function loadRound() {
  playerGridView.loadData(game.state.currPlayer);
  enemyGridView.loadData(game.state.currEnemy);
}

loadRound();

function play(target) {
  game.playRound(target);
  game.playRoundRandom();
  loadRound();
}
