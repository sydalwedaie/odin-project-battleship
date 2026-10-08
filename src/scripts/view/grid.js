import {
  generateDOM,
  html,
  $,
  gridForEach,
  getPegPlayer,
  getPegEnemy,
} from "../helpers.js";

function Grid() {
  const DOM = generateDOMgrid();
  const containerEl = $(".grid", DOM);

  const render = (root) => root.appendChild(DOM);
  const loadData = (dataGrid, loadCell) => {
    gridForEach(dataGrid, (cell, row, col) => {
      const cellEl = $(`.grid-row-${row}.grid-col-${col}`, containerEl);
      loadCell(cellEl, cell, row, col);
    });
  };

  return { containerEl, render, loadData };
}

export function GridPlayer() {
  const grid = Grid();

  const loadData = (dataGrid) => {
    grid.loadData(dataGrid, (cellEl, cell, row, col) => {
      // Reset for randomization to not leave traces
      cellEl.classList.remove(
        "ship",
        "ship-vertical-tail",
        "ship-vertical-mid",
        "ship-vertical-head",
        "ship-horizontal-tail",
        "ship-horizontal-mid",
        "ship-horizontal-head",
      );

      addClass(dataGrid, cell, cellEl, row, col, true);
    });
  };

  return { render: grid.render, loadData };
}

export function GridEnemy() {
  const grid = Grid();

  const loadData = (dataGrid) => {
    grid.loadData(dataGrid, (cellEl, cell, row, col) => {
      addClass(dataGrid, cell, cellEl, row, col, false);
    });
  };

  const bindClickShoot = (handleClick) => {
    grid.containerEl.addEventListener("click", (e) => {
      if (e.target.closest(".grid-cell")) {
        const target = [e.target.dataset.row, e.target.dataset.col];
        handleClick(target);
      }
    });
  };

  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleDisableGrid = () => {
    if (grid.containerEl.classList.contains("disabled")) {
      grid.containerEl.removeEventListener("click", blockEvent, true);
    } else {
      grid.containerEl.addEventListener("click", blockEvent, true);
    }
    grid.containerEl.classList.toggle("disabled");
  };

  return { render: grid.render, loadData, bindClickShoot, toggleDisableGrid };
}

// Helpers
function generateDOMgrid() {
  const cell = (rowN, colN) => {
    const classList = `grid-cell grid-row-${rowN} grid-col-${colN}`;
    return html`
      <div class="${classList}" data-row=${rowN} data-col=${colN}></div>
    `;
  };

  const row = (rowN) => {
    return Array(10)
      .fill()
      .map((_, colN) => cell(rowN, colN))
      .join("");
  };

  const grid = Array(10)
    .fill()
    .map((_, rowN) => row(rowN))
    .join("");

  return generateDOM(html`<div class="grid">${grid}</div>`);
}

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

function addClass(grid, cell, cellEl, row, col, isPlayer) {
  if (isPlayer ? cell.ship : cell.ship?.isSunk()) {
    const cellClass = getClassShipPart(grid, cell, row, col);
    cellEl.classList.add("ship", cellClass);
  }
  if (cell.isShut) {
    cellEl.classList.add(cell.ship ? "peg-hit" : "peg-miss");
  }
}
