import { generateDOM, html, $, gridForEach } from "../helpers.js";
import { addClass } from "../helpers/ship.js";

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
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        handleClick([row, col]);
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
      <button class="${classList}" data-row=${rowN} data-col=${colN}></button>
    `;
  };

  const cellHeaderCol = (colN) => {
    const letter = String.fromCharCode(colN + 65);
    return html`<div class="header-col">${letter}</div>`;
  };

  const cellHeaderRow = (rowN) => {
    return html`<div class="header-row">${rowN === 0 ? "" : rowN}</div>`;
  };

  const row = (rowN) => {
    return Array(10)
      .fill()
      .map((_, colN) => {
        if (rowN === 0) return cellHeaderCol(colN);
        return cell(rowN - 1, colN);
      })
      .join("");
  };

  const grid = Array(11)
    .fill()
    .map((_, rowN) => cellHeaderRow(rowN) + row(rowN))
    .join("");

  return generateDOM(html`<div class="grid">${grid}</div>`);
}
