import { Game } from "../game/game.js";
import { View } from "../view/view.js";

export function Controller() {
  handlePageInitGame();
}

function handlePageInitGame() {
  const view = View();
  view.display.initGame();
  view.initGame.bindClickInitGame((namePlayer1, namePlayer2) => {
    const game = Game(namePlayer1, namePlayer2);
    handlePagePlaceShips(view, game);
  });
}

function handlePagePlaceShips(view, game) {
  view.display.placeShips();
  view.placeShips.bindClickStartGame(() => {
    game.player1.placeShipsRandom();
    game.player2.placeShipsRandom();
    handlePageGameboard(view, game);
  });
}

function handlePageGameboard(view, game) {
  const getStateGameboard = () => {
    return {
      namePlayer: game.state.currPlayer.name,
      nameEnemy: game.state.currEnemy.name,
      gridPlayer: game.state.currPlayer.gameboard.grid,
      gridEnemy: game.state.currEnemy.gameboard.grid,
    };
  };

  view.display.gameboard();
  view.gameboard.loadData(getStateGameboard());
  view.gameboard.bindClickShoot(playRound);

  function playTurn(target) {
    try {
      if (target) {
        game.playTurn(target);
      } else {
        game.playTurnRandom();
      }
    } catch (e) {
      alert(e);
    }

    view.gameboard.loadData(getStateGameboard());
    if (game.state.gameover) {
      handlePageGameover(view, game);
    }
  }

  function playRound(target) {
    playTurn(target);
    playTurn();
  }
}

function handlePageGameover(view, game) {
  view.display.gameover();
  view.gameover.loadData(game.state.currPlayer.name, game.state.currEnemy.name);
  view.gameover.bindClickPlayAgain(handlePageInitGame);
}
