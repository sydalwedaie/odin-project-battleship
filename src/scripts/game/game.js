import { Player } from "./player.js";

export function Game(player1Name, player2Name) {
  const player1 = Player(player1Name);
  const player2 = Player(player2Name);

  const state = {
    currPlayer: player1,
    currEnemy: player2,
    gameover: false,
  };

  const playRound = (targetCoords) => {
    if (!player1.gameboard.fleet.length || !player2.gameboard.fleet.length) {
      throw new Error("attempt to play before placing ships");
    }

    if (state.gameover) {
      throw new Error("attempt to play after gameover");
    }

    const enemyBoard = state.currEnemy.gameboard;
    enemyBoard.receiveAttack(targetCoords);
    if (enemyBoard.allShipsAreSunk()) {
      state.gameover = true;
    } else {
      [state.currPlayer, state.currEnemy] = [state.currEnemy, state.currPlayer];
    }
  };

  return { player1, player2, state, playRound };
}
