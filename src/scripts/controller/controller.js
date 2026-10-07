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
  const msg = view.comms.getMsgWelcome(game.player1.name, game.player2.name);
  view.display.placeShips();
  view.placeShips.loadData(msg);
  view.placeShips.bindClickRandomize((formation) => {
    game.player1.resetBoard();
    game.player1.placeShips(formation);
  });
  game.player2.placeShipsRandom();
  view.placeShips.bindClickStartGame(() => {
    if (
      game.player1.gameboard.fleet.length &&
      game.player2.gameboard.fleet.length
    ) {
      handlePageGameboard(view, game);
    }
  });
}

function handlePageGameboard(view, game) {
  const getStateGameboard = () => {
    return {
      namePlayerActive: game.state.currPlayer.name,
      namePlayer1: game.player1.name,
      namePlayer2: game.player2.name,
      gridPlayer1: game.player1.gameboard.grid,
      gridPlayer2: game.player2.gameboard.grid,
    };
  };

  view.display.gameboard();
  view.gameboard.loadData(getStateGameboard(), "<p>Ready</p>");
  view.gameboard.bindClickShoot(playRound);

  function playTurn(target) {
    if (game.state.gameover) return;
    game.playTurn(target);
    view.gameboard.toggleActiveBoard();
    const prevNamePlayer = game.state.currEnemy.name;
    const prevGridEnemy = game.state.currPlayer.gameboard.grid;
    const msg = view.comms.getMsgTurn(
      game.player1.name,
      prevNamePlayer,
      prevGridEnemy,
      target,
    );
    view.gameboard.loadData(getStateGameboard(), msg);
    if (game.state.gameover) {
      handlePageGameover(view, game);
    }
  }

  function playRound(target) {
    try {
      playTurn(target);
      view.gameboard.toggleDisableGrid();
      setTimeout(
        () => {
          playTurn(game.generateValidTargetRandom());
          view.gameboard.toggleDisableGrid();
        },
        500 + Math.random() * 500,
      );
    } catch (e) {
      const msg = view.comms.getMsgError(e);
      view.gameboard.loadData(getStateGameboard(), msg);
    }
  }
}

function handlePageGameover(view, game) {
  const msg = view.comms.getMsgGameover(
    game.state.currPlayer.name,
    game.player1.name,
    game.player2.name,
  );
  view.display.gameover();
  view.gameover.loadData(msg);
  view.gameover.bindClickPlayAgain(handlePageInitGame);
}
