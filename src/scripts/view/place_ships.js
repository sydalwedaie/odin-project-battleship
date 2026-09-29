import { generateDOM, html, $ } from "../helpers.js";

export function PlaceShips() {
  const DOM = generateDOMplaceShips();
  const containerEl = $(".place-ships", DOM);
  const render = (root) => root.appendChild(DOM);
  const bindClickStartGame = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-start-game")) return;
      e.preventDefault();
      handleClick();
    });
  };

  return { render, bindClickStartGame };
}

function generateDOMplaceShips() {
  const markup = html`
    <div class="place-ships">
      <button class="btn-start-game">Start Game!</button>
    </div>
  `;
  return generateDOM(markup);
}
