import { $, html, generateDOM } from "../helpers.js";
import { GridPlayer, GridEnemy } from "./grid.js";

export function Gameboard() {
  const DOM = generateDOMgameboard();

  const containerEl = $(".gameboard", DOM);
  const playerActiveEl = $(".player-active", DOM);
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
    $(".board-enemy .grid").classList.add("active");
  };

  const loadData = (
    { namePlayerActive, namePlayer1, namePlayer2, gridPlayer1, gridPlayer2 },
    msg,
  ) => {
    playerActiveEl.textContent = namePlayerActive;
    namePlayerEl.textContent = namePlayer1;
    nameEnemyEl.textContent = namePlayer2;

    viewGridPlayer.loadData(gridPlayer1);
    viewGridEnemy.loadData(gridPlayer2);

    const commsList = commsEl.querySelectorAll("p");
    commsEl.prepend(generateDOM(msg));
    if (commsList.length > 2) {
      commsList[commsList.length - 1].remove();
    }
  };

  const toggleActiveBoard = () => {
    $(".board-player .grid").classList.toggle("active");
    $(".board-enemy .grid").classList.toggle("active");
  };

  return {
    render,
    loadData,
    bindClickShoot: viewGridEnemy.bindClickShoot,
    toggleDisableGrid: viewGridEnemy.toggleDisableGrid,
    toggleActiveBoard,
  };
}

function generateDOMgameboard() {
  const markup = html`
    <div class="gameboard">
      <div class="wrapper-boards">
        <div>Active Player: <span class="player-active"></span></div>
        <div class="board-player">
          <div class="board-title">Own Waters (<span class="name"></span>)</div>
          <div class="wrapper-grid"></div>
        </div>
        <div class="board-enemy">
          <div class="board-title">
            Enemy Wanters (<span class="name"></span>)
          </div>
          <div class="wrapper-grid"></div>
        </div>
      </div>
      <div class="comms"></div>
    </div>
  `;

  return generateDOM(markup);
}
