// Iteration helpers

export const gridMap = (grid, callback) => {
  return grid.map((row) => row.map((cell) => callback(cell)));
};
/*
 * Runs callback on each grid cell
 * grid is a 2D array of arrays
 * The callback function has access to each cell, row index and col index
 * You can call it with or without the indicies.
 */

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
