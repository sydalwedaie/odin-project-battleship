import {
  generateDOM,
  html,
  $,
  gridForEach,
  getPegPlayer,
  getPegEnemy,
} from "../helpers.js";

function Grid(root) {
  const DOM = generateDOMgrid();
  const render = () => root.appendChild(DOM);
  const loadData = (dataGrid, loadCell) => {
    gridForEach(dataGrid, (cell, row, col) => {
      const cellEl = $(`.grid-row-${row}.grid-col-${col}`, root);
      loadCell(cellEl, cell);
    });
  };
  return { render, loadData };
}

export function GridPlayer(root) {
  const grid = Grid(root);

  const loadData = (dataGrid) => {
    grid.loadData(dataGrid, (cellEl, cell) => {
      cellEl.textContent = getPegPlayer(cell);
    });
  };

  return { render: grid.render, loadData };
}

export function GridEnemy(root) {
  const grid = Grid(root);

  const loadData = (dataGrid) => {
    grid.loadData(dataGrid, (cellEl, cell) => {
      cellEl.textContent = getPegEnemy(cell);
    });
  };

  const bindClickCell = (handleClick) => {
    root.addEventListener("click", (e) => {
      if (e.target.closest(".grid-cell")) {
        const target = [e.target.dataset.row, e.target.dataset.col];
        handleClick(target);
      }
    });
  };

  return { render: grid.render, loadData, bindClickCell };
}

// Helpers
function generateDOMgrid() {
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

  return generateDOM(html`<div class="grid">${grid}</div>`);
}
