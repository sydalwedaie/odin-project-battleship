// Iteration helpers

export const gridMap = (grid, callback) => {
  return grid.map((row) => row.map((cell) => callback(cell)));
};

export const gridForEach = (grid, callback) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => callback(cell, rowIndex, colIndex));
  });
};

export const gridLoop = (callback) => {
  [...Array(10).keys()].forEach((row) => {
    [...Array(10).keys()].forEach((col) => {
      callback(row, col);
    });
  });
};

// Validation helpers

export const validateCoords = (row, col) => {
  return row <= 9 && col <= 9 && row >= 0 && col >= 0;
};

export const validateOrientation = (orientation) => {
  return orientation === "h" || orientation === "v";
};

export const validateBounds = (length, [row, col, orientation]) => {
  return (
    (orientation === "h") & (col + length < 11) ||
    (orientation === "v") & (row + length < 11)
  );
};

export const validateOverlap = (grid, length, [row, col, orientation]) => {
  for (let i = 0; i < length; i++) {
    let cell;
    if (orientation === "h") cell = grid[row][col + i];
    if (orientation === "v") cell = grid[row + i][col];
    if (cell.ship) return false;
  }
  return true;
};

// Random generation helpers

const randomNum = (ceiling) => Math.floor(Math.random() * ceiling);

export const getRandomTarget = () => {
  return [randomNum(10), randomNum(10)];
};

export const getRandomPos = () => {
  const orientation = ["h", "v"][randomNum(2)];
  return [randomNum(10), randomNum(10), orientation];
};

export const getRandomPlacement = () => {
  const grid = createGrid();
  const formation = [];
  const ships = [
    [5, "Carrier"],
    [4, "Battleship"],
    [3, "Destroyer"],
    [3, "Submarine"],
    [2, "Patrol Boat"],
  ];

  ships.forEach(([length, name], index) => {
    while (formation.length === index) {
      const pos = getRandomPos();
      if (!validateBounds(length, pos)) continue;
      if (!validateOverlap(grid, length, pos)) continue;
      placeItem(grid, { name }, length, pos);
      formation.push(pos);
    }
  });

  return { grid, formation };
};

export function createGrid() {
  const cell = () => ({ ship: null, isShut: false });
  const row = () => Array(10).fill().map(cell);
  return Array(10).fill().map(row);
}

export const placeItem = (grid, item, length, [row, col, orientation]) => {
  for (let i = 0; i < length; i++) {
    let cell;
    if (orientation === "h") cell = grid[row][col + i];
    if (orientation === "v") cell = grid[row + i][col];
    cell.ship = item;
  }
};

// DOM helpers

export function generateDOM(htmlString) {
  return document.createRange().createContextualFragment(htmlString);
}

export const html = String.raw;

export const $ = (selector, root = document) => {
  return root.querySelector(selector);
};

// Misc

export function getPegPlayer(cell) {
  if (cell.ship) {
    return cell.ship.name[0] + (cell.isShut ? "X" : "");
  } else {
    return cell.isShut ? "O" : "";
  }
}

export function getPegEnemy(cell) {
  if (cell.ship) {
    return cell.isShut ? "X" : "";
  } else {
    return cell.isShut ? "O" : "";
  }
}
