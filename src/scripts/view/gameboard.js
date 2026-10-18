import { $, html, generateDOM } from "../helpers/dom.js";
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

  const bindClickRestart = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-restart")) return;
      e.preventDefault();
      handleClick();
    });
  };

  return {
    render,
    loadData,
    bindClickShoot: viewGridEnemy.bindClickShoot,
    toggleDisableGrid: viewGridEnemy.toggleDisableGrid,
    toggleActiveBoard,
    bindClickRestart,
  };
}

function generateDOMgameboard() {
  const markup = html`
    <div class="gameboard">
      <div class="wrapper-info">
        <div class="card messages">
          <div class="card-header">Comms</div>
          <div class="card-content comms"></div>
        </div>
        <div class="card player-status">
          <div class="card-header">Active Player</div>
          <div class="card-content player-active"></div>
        </div>
      </div>
      <div class="wrapper-boards">
        <div class="board board-enemy">
          <div class="card-header board-title">
            Enemy Waters (<span class="name"></span>)
          </div>
          <div class="wrapper-grid"></div>
        </div>
        <div class="board board-player">
          <div class="card-header board-title">
            Own Waters (<span class="name"></span>)
          </div>
          <div class="wrapper-grid"></div>
        </div>
      </div>
      <div class="controls">
        <button class="btn btn-restart">Start Over</button>
      </div>
    </div>
  `;

  return generateDOM(markup);
}
