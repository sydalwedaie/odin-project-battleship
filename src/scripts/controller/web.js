import { Game } from "../game/game.js";
import { Gameboard } from "../view/gameboard.js";
import { InitGame } from "../view/init_game.js";
import { $ } from "../helpers.js";
import { PlaceShips } from "../view/place_ships.js";
import { Gameover } from "../view/gameover.js";

export function ControllerWeb() {
  const containerInitGameEl = $(".container-init-game");
  const containerPlaceShipsEl = $(".container-place-ships");
  const containerGameboardEl = $(".container-gameboard");
  const containerGameoverEl = $(".container-gameover");

  function switchPage(page) {
    if (page !== "init-game") containerInitGameEl.innerHTML = "";
    if (page !== "place-ships") containerPlaceShipsEl.innerHTML = "";
    if (page !== "gameboard") containerGameboardEl.innerHTML = "";
    if (page !== "gameover") containerGameoverEl.innerHTML = "";
  }

  handlePageInitGame();

  function handlePageInitGame() {
    switchPage("init-game");
    const viewInitGame = InitGame();
    viewInitGame.render(containerInitGameEl);
    viewInitGame.bindClickInitGame((namePlayer1, namePlayer2) => {
      const game = Game(namePlayer1, namePlayer2);
      handlePagePlaceShips(game);
    });
  }

  function handlePagePlaceShips(game) {
    switchPage("place-ships");
    const viewPlaceShips = PlaceShips();
    viewPlaceShips.render(containerPlaceShipsEl);
    viewPlaceShips.bindClickStartGame(() => {
      game.player1.placeShipsRandom();
      game.player2.placeShipsRandom();
      handlePageGameboard(game);
    });
  }

  function handlePageGameboard(game) {
    switchPage("gameboard");
    const viewGameboard = Gameboard();
    const stateGameboard = {
      namePlayer: game.state.currPlayer.name,
      nameEnemy: game.state.currEnemy.name,
      gridPlayer: game.state.currPlayer.gameboard.grid,
      gridEnemy: game.state.currEnemy.gameboard.grid,
    };

    viewGameboard.render(containerGameboardEl);
    viewGameboard.loadData(stateGameboard);
    viewGameboard.bindClickShoot(playRound);

    function playRound(target) {
      try {
        game.playTurn(target);
        if (game.state.gameover) {
          handlePageGameover(game);
          return;
        }
        game.playTurnRandom();
        if (game.state.gameover) {
          handlePageGameover(game);
          return;
        }
        viewGameboard.loadData(stateGameboard);
      } catch (e) {
        alert(e);
      }
    }
  }

  function handlePageGameover(game) {
    switchPage("gameover");
    const viewGameover = Gameover();
    viewGameover.render(containerGameoverEl);
    viewGameover.loadData(
      game.state.currPlayer.name,
      game.state.currEnemy.name,
    );
    viewGameover.bindClickPlayAgain(handlePageInitGame);
  }
}
