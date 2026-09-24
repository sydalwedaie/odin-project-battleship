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

  const loadData = ({ namePlayer, nameEnemy, gridPlayer, gridEnemy }) => {
    namePlayerEl.textContent = namePlayer;
    nameEnemyEl.textContent = nameEnemy;

    viewGridPlayer.loadData(gridPlayer);
    viewGridEnemy.loadData(gridEnemy);
  };

  return { render, loadData, bindClickEnemy: viewGridEnemy.bindClickCell };
}

function generateDOMgameboard() {
  const markup = html`
    <div class="gameboard">
      <div class="board-player">
        <div class="board-title">
          Current Player: <span class="name"></span>
        </div>
        <div class="wrapper-grid"></div>
      </div>
      <hr />
      <div class="board-enemy">
        <div class="board-title">Current Enemy: <span class="name"></span></div>
        <div class="wrapper-grid"></div>
      </div>
    </div>
  `;

  return generateDOM(markup);
}
