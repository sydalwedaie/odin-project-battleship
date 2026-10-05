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
      namePlayer: game.state.currPlayer.name,
      nameEnemy: game.state.currEnemy.name,
      gridPlayer: game.state.currPlayer.gameboard.grid,
      gridEnemy: game.state.currEnemy.gameboard.grid,
    };
  };

  view.display.gameboard();
  view.gameboard.loadData(getStateGameboard(), "Ready?");
  view.gameboard.bindClickShoot(playRound);

  function playTurn(target) {
    if (game.state.gameover) return;
    game.playTurn(target);
    const namePrevPlayer = game.state.currEnemy.name;
    const gridPrevEnemy = game.state.currPlayer.gameboard.grid;
    const msg = view.comms.getMsgTurn(
      game.player1.name,
      namePrevPlayer,
      gridPrevEnemy,
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
      playTurn(game.generateValidTargetRandom());
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
