import { gridMap } from "../helpers/iterators.js";

export function ViewConsole({ currPlayer, currEnemy, gameover }) {
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
    if (gameover) {
      console.log(`Game Over! ${currPlayer} wins!`);
      return;
    }
    console.log("CURRENT PLAYER: ", currPlayer.name);
    printBoardAsTarget(currEnemy.gameboard.grid);
    printBoard(currPlayer.gameboard.grid);
    console.log("Enemy fleet status", `(${currEnemy.name})`);
    printFleetStatus(currEnemy.gameboard.fleet);
  };

  return { printBoard, printBoardAsTarget, printFleetStatus, printRound };
}

// Helpers

function getPegPlayer(cell) {
  if (cell.ship) {
    return cell.ship.name[0] + (cell.isShut ? "X" : "");
  } else {
    return cell.isShut ? "O" : "";
  }
}

function getPegEnemy(cell) {
  if (cell.ship) {
    return cell.isShut ? "X" : "";
  } else {
    return cell.isShut ? "O" : "";
  }
}
