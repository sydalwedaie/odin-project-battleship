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

export const getRandomTarget = () => {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  return [row, col];
};

export const getRandomPos = () => {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  const orientation = ["h", "v"][Math.floor(Math.random() * 2)];
  return [row, col, orientation];
};

export const getRandomFormation = () => {
  const cell = () => ({ ship: null });
  const row = () => Array(10).fill().map(cell);
  const grid = Array(10).fill().map(row);

  const shipLengths = [5, 4, 3, 3, 2];
  const formation = [];

  shipLengths.forEach((length, index) => {
    while (formation.length === index) {
      const pos = getRandomPos();
      if (!validateBounds(length, pos)) continue;
      if (!validateOverlap(grid, length, pos)) continue;
      placeItem(grid, length, length, pos);
      formation.push(pos);
    }
  });

  return formation;
};

export const placeItem = (grid, item, length, [row, col, orientation]) => {
  for (let i = 0; i < length; i++) {
    let cell;
    if (orientation === "h") cell = grid[row][col + i];
    if (orientation === "v") cell = grid[row + i][col];
    cell.ship = item;
  }
};
