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

export const getRandomFormation = () => {
  const row = () => Array(10).fill(null);
  const grid = Array(10).fill().map(row);
  const shipLengths = [5, 4, 3, 3, 2];
  const formation = [];

  function getRandomPos() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const orientation = ["h", "v"][Math.floor(Math.random() * 2)];
    return [row, col, orientation];
  }

  function validateBounds(length, [row, col, orientation]) {
    return (
      (orientation === "h") & (col + length < 10) ||
      (orientation === "v") & (row + length < 10)
    );
  }

  function validateOverlap(grid, length, [row, col, orientation]) {
    for (let i = 0; i < length; i++) {
      let cell;
      if (orientation === "h") cell = grid[row][col + i];
      if (orientation === "v") cell = grid[row + i][col];
      if (cell) return false;
    }
    return true;
  }

  function placeShip(grid, length, [row, col, orientation]) {
    for (let i = 0; i < length; i++) {
      if (orientation === "h") grid[row][col + i] = length;
      if (orientation === "v") grid[row + i][col] = length;
    }
  }

  shipLengths.forEach((length, index) => {
    while (formation.length === index) {
      const pos = getRandomPos();
      if (!validateBounds(length, pos)) continue;
      if (!validateOverlap(grid, length, pos)) continue;
      placeShip(grid, length, pos);
      formation.push(pos);
    }
  });

  // console.table(grid);

  return formation;
};

// console.log(getRandomFormation());
