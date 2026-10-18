function getClassShipPart(grid, cell, row, col) {
  const shipCurrent = cell.ship?.name;
  const shipLeft = grid[row][col - 1]?.ship?.name;
  const shipTop = grid[row - 1]?.[col]?.ship?.name;
  const shipRight = grid[row][col + 1]?.ship?.name;
  const shipBot = grid[row + 1]?.[col]?.ship?.name;

  if (!shipCurrent) return "empty";
  else if (hasShipsOnSides(false, false, false, true)) {
    return "ship-vertical-tail";
  } else if (hasShipsOnSides(false, true, false, true)) {
    return "ship-vertical-mid";
  } else if (hasShipsOnSides(false, true, false, false)) {
    return "ship-vertical-head";
  } else if (hasShipsOnSides(false, false, true, false)) {
    return "ship-horizontal-tail";
  } else if (hasShipsOnSides(true, false, true, false)) {
    return "ship-horizontal-mid";
  } else if (hasShipsOnSides(true, false, false, false)) {
    return "ship-horizontal-head";
  }

  /* Return true if all 4 sides satisfy the condition
   * For each side, tell if you want there to be a ship of the same type
   * `true` means you want there to be a ship, `false` means you don't.
   */
  function hasShipsOnSides(left, top, right, bottom) {
    const hasLeft = left ? shipLeft === shipCurrent : shipLeft !== shipCurrent;
    const hasTop = top ? shipTop === shipCurrent : shipTop !== shipCurrent;
    const hasRight = right
      ? shipRight === shipCurrent
      : shipRight !== shipCurrent;
    const hasBot = bottom ? shipBot === shipCurrent : shipBot !== shipCurrent;

    return hasLeft && hasTop && hasRight && hasBot;
  }
}
export function addClass(grid, cell, cellEl, row, col, isPlayer) {
  if (isPlayer ? cell.ship : cell.ship?.isSunk()) {
    const cellClass = getClassShipPart(grid, cell, row, col);
    cellEl.classList.add("ship", cellClass);
  }
  if (cell.isShut) {
    cellEl.classList.add(cell.ship ? "peg-hit" : "peg-miss");
    cellEl.setAttribute("disabled", "");
  }
}
