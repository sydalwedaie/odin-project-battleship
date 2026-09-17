import { Player } from "./player.js";

export function Game(player1Name, player2Name) {
  const player1 = Player(player1Name);
  const player2 = Player(player2Name);

  const state = {
    currPlayer: player1,
    currEnemy: player2,
    gameover: false,
    comms: "Welcome to Battleship!",
  };

  const playRound = (targetCoords) => {
    if (!player1.gameboard.fleet.length || !player2.gameboard.fleet.length) {
      throw new Error("attempt to play before placing ships");
    }

    state.comms = "";
    if (state.gameover) {
      throw new Error("attempt to play after gameover");
    }

    try {
      const enemyBoard = state.currEnemy.gameboard;
      enemyBoard.receiveAttack(targetCoords);
      if (enemyBoard.allShipsAreSunk()) {
        state.gameover = true;
        state.comms = `GAMEOVER! ${state.currPlayer.name} wins.`;
        return;
      }
      [state.currPlayer, state.currEnemy] = [state.currEnemy, state.currPlayer];
    } catch (e) {
      state.comms = "Ops... This position has already been shot!";
    }
  };

  return { player1, player2, state, playRound };
}
