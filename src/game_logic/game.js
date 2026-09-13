import { Player } from "./player.js";

export function Game(player1Name, player2Name) {
  const player1 = Player(player1Name);
  const player2 = Player(player2Name);

  const state = {
    currPlayer: player1,
    currEnemy: player2,
    gameover: false,
    message: "",
  };

  const placeShipsPlayer1 = (positions) => {
    player1.placeShips(positions);
  };

  const placeShipsPlayer2 = (positions) => {
    player2.placeShips(positions);
  };

  const playRound = (targetCoords) => {
    state.message = "";
    if (state.gameover) {
      state.message = "The game has ended!";
      return;
    }
    try {
      state.currEnemy.gameboard.receiveAttack(targetCoords);
      if (state.currEnemy.gameboard.allShipsAreSunk()) {
        state.gameover = true;
        return;
      }
      [state.currPlayer, state.currEnemy] = [state.currEnemy, state.currPlayer];
    } catch (e) {
      state.message = e;
    }
  };

  return { placeShipsPlayer1, placeShipsPlayer2, playRound, state };
}
