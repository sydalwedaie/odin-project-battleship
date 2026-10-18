import { generateDOM, html, $ } from "../helpers/dom.js";
import { getRandomPlacement } from "../helpers/random.js";
import { GridPlayer } from "./grid.js";

export function PlaceShips() {
  const DOM = generateDOMplaceShips();
  const containerEl = $(".place-ships", DOM);
  const commsEl = $(".comms", containerEl);
  const gridEl = $(".wrapper-grid", DOM);

  const viewGridPlayer = GridPlayer();
  const render = (root) => {
    root.appendChild(DOM);
    viewGridPlayer.render(gridEl);
  };

  const loadData = (msgWelcome) => {
    commsEl.appendChild(generateDOM(msgWelcome));
  };

  const bindClickRandomize = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-randomize")) return;
      $(".btn-start-game", containerEl).removeAttribute("disabled");
      e.preventDefault();
      const { grid, formation } = getRandomPlacement();
      viewGridPlayer.loadData(grid);
      handleClick(formation);
    });
  };

  const bindClickStartGame = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-start-game")) return;
      e.preventDefault();
      handleClick();
    });
  };

  return { render, loadData, bindClickStartGame, bindClickRandomize };
}

function generateDOMplaceShips() {
  const markup = html`
    <div class="place-ships">
      <div class="wrapper-info">
        <div class="card">
          <h1 class="card-header">Deploy Formation</h1>
          <div class="card-content comms"></div>
        </div>
        <div class="controls">
          <button class="btn btn-randomize">Randomize</button>
          <button class="btn btn-start-game" disabled>Deploy Formation!</button>
        </div>
      </div>
      <div class="wrapper-grid"></div>
    </div>
  `;
  return generateDOM(markup);
}
