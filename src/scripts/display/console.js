import { gridMap } from "../helpers.js";

export const printBoard = (grid) => {
  const cell = (cell) => {
    if (cell.ship) {
      return cell.ship.name[0] + (cell.isShut ? "X" : "");
    } else {
      return cell.isShut ? "O" : "";
    }
  };
  console.log("OWN BOARD");
  console.table(gridMap(grid, cell));
};

export const printBoardAsTarget = (grid) => {
  const cell = (cell) => {
    if (cell.ship) {
      return cell.isShut ? "X" : "";
    } else {
      return cell.isShut ? "O" : "";
    }
  };
  console.log("TARGET BOARD");
  console.table(gridMap(grid, cell));
};

const printFleetStatus = (fleet) => {
  console.table(
    fleet.map((ship) => {
      return [ship.name, `${ship.getHealth()} remaining health`];
    }),
  );
};

export const displayRound = ({ currPlayer, currEnemy, gameover }) => {
  if (gameover) return;
  console.clear();
  console.log("CURRENT PLAYER: ", currPlayer.name);
  printBoardAsTarget(currEnemy.gameboard.grid);
  printBoard(currPlayer.gameboard.grid);
  console.log("Enemy fleet status", `(${currEnemy.name})`);
  printFleetStatus(currEnemy.gameboard.fleet);
};
