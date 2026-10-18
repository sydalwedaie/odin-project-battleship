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
