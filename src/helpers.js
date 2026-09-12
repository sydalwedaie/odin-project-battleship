export const printBoard = (gameboard) => {
  console.log("OWN BOARD");
  console.table(
    gameboard.map((row) =>
      row.map(
        (cell) =>
          (cell.ship ? cell.ship.length : "") + (cell.isShut ? "X" : ""),
      ),
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
