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
