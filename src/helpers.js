export const printBoard = (gameboard) => {
  console.log("OWN BOARD");
  console.table(
    gameboard.map((row) =>
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

export const printBoardAsTarget = (gameboard) => {
  console.log("TARGET BOARD");
  console.table(
    gameboard.map((row) =>
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
