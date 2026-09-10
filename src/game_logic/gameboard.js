export function Gameboard() {
  // Create empty grid
  const cell = () => ({ ship: null, isShut: false });
  const row = () => Array(10).fill().map(cell);
  const board = Array(10).fill().map(row);

  const fleet = [];

  const placeShip = (ship, [row, col], direction) => {
    // Check for invalid inputs
    if (row > 9 || col > 9) {
      throw new Error("coordinates out of bounds");
    }

    if (
      (direction === "h") & (col + ship.length > 9) ||
      (direction === "v") & (row + ship.length > 9)
    ) {
      throw new Error("ship dimentations out of bounds");
    }

    // 3 branches: each checks for overlaps first
    if (direction === "h") {
      for (let i = 0; i < ship.length; i++) {
        if (board[row][col + i].ship) {
          throw new Error("ships overlap");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        board[row][col + i].ship = ship;
      }
    } else if (direction === "v") {
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][col].ship) {
          throw new Error("ships overlap");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col].ship = ship;
      }
    } else {
      throw new Error("direction invalid");
    }

    fleet.push(ship);
  };

  const receiveAttack = ([row, col]) => {
    if (row > 9 || col > 9) {
      throw new Error("coordinates out of bounds");
    }

    const cell = board[row][col];
    if (cell.isShut) return;
    cell.isShut = true;
    if (cell.ship) cell.ship.hit();
  };

  const allShipsAreSunk = () => {
    let status = true;
    for (let ship of fleet) {
      if (!ship.isSunk()) {
        status = false;
        break;
      }
    }
    return status;
  };

  const printBoard = () => {
    console.table(
      board.map((row) =>
        row.map(
          (cell) =>
            (cell.ship ? cell.ship.length : "") + (cell.isShut ? "x" : ""),
        ),
      ),
    );
  };

  return { placeShip, receiveAttack, allShipsAreSunk, printBoard };
}
