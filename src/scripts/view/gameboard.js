import { $, html, generateDOM } from "../helpers.js";
import { GridPlayer, GridEnemy } from "./grid.js";

export function Gameboard() {
  const DOM = generateDOMgameboard();

  const containerEl = $(".gameboard", DOM);
  const gridPlayerEl = $(".board-player .wrapper-grid", DOM);
  const gridEnemyEl = $(".board-enemy .wrapper-grid", DOM);
  const namePlayerEl = $(".board-player .name", DOM);
  const nameEnemyEl = $(".board-enemy .name", DOM);
  const commsEl = $(".comms", DOM);

  const viewGridPlayer = GridPlayer();
  const viewGridEnemy = GridEnemy();

  const render = (root) => {
    root.appendChild(DOM);
    viewGridPlayer.render(gridPlayerEl);
    viewGridEnemy.render(gridEnemyEl);
  };

  const loadData = ({ namePlayer, nameEnemy, gridPlayer, gridEnemy }, msg) => {
    namePlayerEl.textContent = namePlayer;
    nameEnemyEl.textContent = nameEnemy;

    viewGridPlayer.loadData(gridPlayer);
    viewGridEnemy.loadData(gridEnemy);

    commsEl.prepend(generateDOM(msg));
  };

  return { render, loadData, bindClickShoot: viewGridEnemy.bindClickShoot };
}

function generateDOMgameboard() {
  const markup = html`
    <div class="gameboard">
      <div class="wrapper-boards">
        <div class="board-player">
          <div class="board-title">
            Current Player: <span class="name"></span>
          </div>
          <div class="wrapper-grid"></div>
        </div>
        <hr />
        <div class="board-enemy">
          <div class="board-title">
            Current Enemy: <span class="name"></span>
          </div>
          <div class="wrapper-grid"></div>
        </div>
      </div>
      <div class="comms"></div>
    </div>
  `;

  return generateDOM(markup);
}
