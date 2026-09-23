import { $, html, generateDOM } from "../helpers.js";
import { GridPlayer, GridEnemy } from "./grid.js";

export function Gameboard(root) {
  const DOM = generateDOMgameboard();

  const gridPlayerEl = $(".board-player .wrapper-grid", DOM);
  const gridEnemyEl = $(".board-enemy .wrapper-grid", DOM);
  const namePlayerEl = $(".board-player .name", DOM);
  const nameEnemyEl = $(".board-enemy .name", DOM);

  const viewGridPlayer = GridPlayer(gridPlayerEl);
  const viewGridEnemy = GridEnemy(gridEnemyEl);

  const render = () => {
    root.appendChild(DOM);
    viewGridPlayer.render();
    viewGridEnemy.render();
  };

  const loadData = (state) => {
    namePlayerEl.textContent = state.currPlayer.name;
    nameEnemyEl.textContent = state.currEnemy.name;

    viewGridPlayer.loadData(state.currPlayer.gameboard.grid);
    viewGridEnemy.loadData(state.currEnemy.gameboard.grid);
  };

  return { render, loadData, bindClickEnemy: viewGridEnemy.bindClickCell };
}

function generateDOMgameboard() {
  const markup = html`
    <section class="board-player">
      <div class="board-title">Current Player: <span class="name"></span></div>
      <div class="wrapper-grid"></div>
    </section>
    <hr />
    <section class="board-enemy">
      <div class="board-title">Current Enemy: <span class="name"></span></div>
      <div class="wrapper-grid"></div>
    </section>
  `;

  return generateDOM(markup);
}
