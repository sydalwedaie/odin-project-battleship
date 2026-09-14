export function Gameboard() {
  // Create empty grid
  const cell = () => ({ ship: null, isShut: false });
  const row = () => Array(10).fill().map(cell);
  const grid = Array(10).fill().map(row);

  const fleet = [];

  const placeShip = (ship, [row, col, orientation]) => {
    // Check for invalid inputs
    if (row > 9 || col > 9) {
      throw new Error("coordinates out of bounds");
    }

    if (
      (orientation === "h") & (col + ship.length > 10) ||
      (orientation === "v") & (row + ship.length > 10)
    ) {
      throw new Error("ship dimentations out of bounds");
    }

    // 3 branches: each checks for overlaps first
    if (orientation === "h") {
      for (let i = 0; i < ship.length; i++) {
        if (grid[row][col + i].ship) {
          throw new Error("ships overlap");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        grid[row][col + i].ship = ship;
      }
    } else if (orientation === "v") {
      for (let i = 0; i < ship.length; i++) {
        if (grid[row + i][col].ship) {
          throw new Error("ships overlap");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        grid[row + i][col].ship = ship;
      }
    } else {
      throw new Error("orientation invalid");
    }

    fleet.push(ship);
  };

  const receiveAttack = ([row, col]) => {
    if (row > 9 || col > 9) {
      throw new Error("coordinates out of bounds");
    }

    const cell = grid[row][col];
    if (cell.isShut) {
      throw new Error("coordinates already shut");
    }
    cell.isShut = true;
    if (cell.ship) cell.ship.hit();
  };

  const allShipsAreSunk = () => {
    return fleet.every((ship) => ship.isSunk());
  };

  return {
    grid,
    fleet,
    placeShip,
    receiveAttack,
    allShipsAreSunk,
  };
}
