import {
  validateCoords,
  validateOrientation,
  validateBounds,
  validateOverlap,
  placeItem,
} from "../helpers.js";

export function Gameboard() {
  // Create empty grid
  const cell = () => ({ ship: null, isShut: false });
  const row = () => Array(10).fill().map(cell);
  const grid = Array(10).fill().map(row);

  const fleet = [];

  const placeShip = (ship, [row, col, orientation]) => {
    // Check for valid inputs
    if (!validateCoords(row, col)) {
      throw new Error("coordinates out of bounds");
    }

    if (!validateOrientation(orientation)) {
      throw new Error("orientation invalid");
    }

    if (!validateBounds(ship.length, [row, col, orientation])) {
      throw new Error("ship dimentions out of bounds");
    }

    if (!validateOverlap(grid, ship.length, [row, col, orientation])) {
      throw new Error("ships overlap");
    }

    // Place ships
    placeItem(grid, ship, ship.length, [row, col, orientation]);

    fleet.push(ship);
  };

  const receiveAttack = ([row, col]) => {
    if (!validateCoords(row, col)) throw new Error("coordinates out of bounds");

    const cell = grid[row][col];

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
