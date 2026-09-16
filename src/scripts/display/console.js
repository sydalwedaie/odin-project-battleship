export const printBoard = (grid) => {
  console.log("OWN BOARD");
  console.table(
    grid.map((row) =>
      row.map((cell) => {
        if (cell.ship) {
          return cell.ship.name[0] + (cell.isShut ? "X" : "");
        } else {
          return cell.isShut ? "O" : "";
        }
      }),
    ),
  );
};

export const printBoardAsTarget = (grid) => {
  console.log("TARGET BOARD");
  console.table(
    grid.map((row) =>
      row.map((cell) => {
        if (cell.ship) {
          return cell.isShut ? "X" : "";
        } else {
          return cell.isShut ? "O" : "";
        }
      }),
    ),
  );
};

const printFleetStatus = (fleet) => {
  console.table(
    fleet.map((ship) => {
      return [ship.name, `${ship.getHealth()} remaining health`];
    }),
  );
};

export const displayRound = ({ currPlayer, currEnemy, gameover, message }) => {
  console.clear();
  if (message) console.log(message);
  if (gameover) return;
  console.log("CURRENT PLAYER: ", currPlayer.name);
  printBoardAsTarget(currEnemy.gameboard.grid);
  printBoard(currPlayer.gameboard.grid);
  console.log("Enemy fleet status", `(${currEnemy.name})`);
  printFleetStatus(currEnemy.gameboard.fleet);
};
