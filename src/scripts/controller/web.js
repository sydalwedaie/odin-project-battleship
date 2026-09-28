import { Game } from "../game/game.js";
import { Gameboard } from "../view/gameboard.js";
import { InitGame } from "../view/init_game.js";
import { $ } from "../helpers.js";

export function ControllerWeb() {
  const containerInitGameEl = $(".container-init-game");
  const containerGameboardEl = $(".container-gameboard");

  const viewInitGame = InitGame();
  viewInitGame.render(containerInitGameEl);

  function initGame(namePlayer1, namePlayer2) {
    containerGameboardEl.innerHTML = "";
    const game = Game(namePlayer1, namePlayer2);

    game.player1.placeShipsRandom();
    game.player2.placeShipsRandom();

    startGame(game);
  }

  function startGame(game) {
    const viewGameboard = Gameboard();
    viewGameboard.render(containerGameboardEl);
    const stateGameboard = {
      namePlayer: game.state.currPlayer.name,
      nameEnemy: game.state.currEnemy.name,
      gridPlayer: game.state.currPlayer.gameboard.grid,
      gridEnemy: game.state.currEnemy.gameboard.grid,
    };

    viewGameboard.loadData(stateGameboard);
    viewGameboard.bindClickShoot(playRound);

    function playRound(target) {
      try {
        game.playTurn(target);
        game.playTurnRandom();
        viewGameboard.loadData(stateGameboard);
      } catch (e) {
        alert(e);
      }
    }
  }

  viewInitGame.bindClickInitGame(initGame);
}
