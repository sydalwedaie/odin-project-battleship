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
