export function Gameboard() {
  // Create empty grid
  const cell = () => ({ ship: null, isShut: false });
  const row = () => Array(10).fill().map(cell);
  const grid = Array(10).fill().map(row);

  const fleet = [];

  const placeShip = (ship, [row, col, orientation]) => {
    // Check for invalid inputs
    if (row > 9 || row < 0 || col > 9 || col < 0) {
      throw new Error("coordinates out of bounds");
    }

    if (orientation !== "h" && orientation !== "v") {
      throw new Error("orientation invalid");
    }

    if (
      (orientation === "h") & (col + ship.length > 10) ||
      (orientation === "v") & (row + ship.length > 10)
    ) {
      throw new Error("ship dimentations out of bounds");
    }

    // Check for overlaps
    for (let i = 0; i < ship.length; i++) {
      let cell;
      if (orientation === "h") cell = grid[row][col + i];
      if (orientation === "v") cell = grid[row + i][col];
      if (cell.ship) throw new Error("ships overlap");
    }

    // Place ships
    for (let i = 0; i < ship.length; i++) {
      let cell;
      if (orientation === "h") cell = grid[row][col + i];
      if (orientation === "v") cell = grid[row + i][col];
      cell.ship = ship;
    }

    fleet.push(ship);
  };

  const receiveAttack = ([row, col]) => {
    if (row > 9 || col > 9 || row < 0 || col < 0) {
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
