import { generateDOM, html, $ } from "../helpers.js";

export function Gameover() {
  const DOM = generateDOMgameover();
  const containerEl = $(".gameover", DOM);
  const commsEl = $(".comms", DOM);

  const render = (root) => root.appendChild(DOM);
  const loadData = (msg) => {
    commsEl.appendChild(generateDOM(msg));
  };
  const bindClickPlayAgain = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-play-again")) return;
      e.preventDefault();
      handleClick();
    });
  };

  return { render, loadData, bindClickPlayAgain };
}

function generateDOMgameover() {
  const markup = html`
    <div class="gameover">
      <h1>Game Over!</h1>
      <div class="comms"></div>
      <button class="btn-play-again">Play Again?</button>
    </div>
  `;
  return generateDOM(markup);
}
