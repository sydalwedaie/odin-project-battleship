import {
  generateDOM,
  html,
  $,
  gridForEach,
  getPegPlayer,
  getPegEnemy,
} from "../helpers.js";

function Grid(root) {
  const gridMarkup = generateGridMarkup();
  const render = () => root.appendChild(generateDOM(gridMarkup));
  return { render };
}

export function GridPlayer(root) {
  const grid = Grid(root);

  const loadData = (player) => {
    gridForEach(player.gameboard.grid, (cell, row, col) => {
      const cellEl = $(`.grid-row-${row}.grid-col-${col}`, root);
      cellEl.textContent = getPegPlayer(cell);
    });
  };

  return Object.assign({}, grid, { loadData });
}

export function GridEnemy(root) {
  const grid = Grid(root);

  const loadData = (enemy) => {
    gridForEach(enemy.gameboard.grid, (cell, row, col) => {
      const cellEl = $(`.grid-row-${row}.grid-col-${col}`, root);
      cellEl.textContent = getPegEnemy(cell);
    });
  };

  const bindCellClick = (handleClick) => {
    $(".grid", root).addEventListener("click", (e) => {
      if (e.target.closest(".grid-cell")) {
        const target = [e.target.dataset.row, e.target.dataset.col];
        console.log(target);
        handleClick(target);
      }
    });
  };

  return Object.assign({}, grid, { loadData, bindCellClick });
}
// Helpers
function generateGridMarkup() {
  const cell = (rowN, colN) => {
    const classList = `grid-cell grid-row-${rowN} grid-col-${colN}`;
    return html`<div
      class="${classList}"
      data-row=${rowN}
      data-col=${colN}
    ></div>`;
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

  return html`<section class="grid">${grid}</section>`;
}
