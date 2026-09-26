import { Game } from "../game/game.js";
import { Gameboard } from "../view/gameboard.js";
import { $ } from "../helpers.js";

export function ControllerWeb() {
  let game;

  const gameboardEl = $(".wrapper-gameboard");
  const viewGameboard = Gameboard(gameboardEl);
  viewGameboard.render();

  const initGame = (p1Name, p2Name) => {
    game = Game(p1Name, p2Name);
  };

  const start = () => {
    game.player1.placeShipsRandom();
    game.player2.placeShipsRandom();

    const stateGameboard = {
      namePlayer: game.state.currPlayer.name,
      nameEnemy: game.state.currEnemy.name,
      gridPlayer: game.state.currPlayer.gameboard.grid,
      gridEnemy: game.state.currEnemy.gameboard.grid,
    };

    viewGameboard.loadData(stateGameboard);
    viewGameboard.bindClickEnemy(play);

    function play(target) {
      try {
        game.playRound(target);
        game.playRoundRandom();
        viewGameboard.loadData(stateGameboard);
      } catch (e) {
        alert(e);
      }
    }
  };

  return { initGame, start };
}
