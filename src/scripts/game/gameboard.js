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
      throw new Error("ship dimentions out of bounds");
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
    const invalidCoords = row > 9 || col > 9 || row < 0 || col < 0;
    const cell = grid[row][col];

    if (invalidCoords) throw new Error("coordinates out of bounds");
    if (cell.isShut) throw new Error("coordinates already shut");
    if (cell.ship) cell.ship.hit();

    cell.isShut = true;
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
