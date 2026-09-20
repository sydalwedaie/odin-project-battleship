import { Player } from "./player.js";
import { getRandomTarget } from "../helpers.js";
import { Comms } from "./comms.js";

export function Game(player1Name, player2Name) {
  const player1 = Player(player1Name);
  const player2 = Player(player2Name);
  const comms = Comms();

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
    comms.addRoundMessage(state.currPlayer.name, enemyBoard.grid, targetCoords);
    if (enemyBoard.allShipsAreSunk()) {
      state.gameover = true;
      comms.addGameoverMessage(
        state.currPlayer.name,
        player1.name,
        player2.name,
      );
    } else {
      [state.currPlayer, state.currEnemy] = [state.currEnemy, state.currPlayer];
    }
  };

  const playRoundRandom = () => {
    let [row, col] = getRandomTarget();
    while (state.currEnemy.gameboard.grid[row][col].isShut) {
      [row, col] = getRandomTarget();
    }
    playRound([row, col]);
  };

  return { player1, player2, comms, state, playRound, playRoundRandom };
}
