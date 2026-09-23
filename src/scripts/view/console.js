import { gridMap } from "../helpers.js";
import { getPegPlayer, getPegEnemy } from "../helpers.js";

export function ViewConsole({ currPlayer, currEnemy, gameover }, comms) {
  const printBoard = (grid) => {
    console.log("OWN BOARD");
    console.table(gridMap(grid, getPegPlayer));
  };

  const printBoardAsTarget = (grid) => {
    console.log("TARGET BOARD");
    console.table(gridMap(grid, getPegEnemy));
  };

  const printFleetStatus = (fleet) => {
    console.table(
      fleet.map((ship) => {
        return [ship.name, `${ship.getHealth()} remaining health`];
      }),
    );
  };

  const printRound = () => {
    console.clear();
    console.log(comms.getHistory());
    console.log("CURRENT PLAYER: ", currPlayer.name);
    printBoardAsTarget(currEnemy.gameboard.grid);
    printBoard(currPlayer.gameboard.grid);
    console.log("Enemy fleet status", `(${currEnemy.name})`);
    printFleetStatus(currEnemy.gameboard.fleet);
  };

  return { printBoard, printBoardAsTarget, printFleetStatus, printRound };
}
