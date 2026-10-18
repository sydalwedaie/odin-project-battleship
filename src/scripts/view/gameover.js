import { generateDOM, html, $ } from "../helpers/dom.js";

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
      <div class="card">
        <h1 class="card-header">Game Over!</h1>
        <div class="card-content comms"></div>
      </div>
      <div class="controls">
        <button class="btn btn-play-again">Play Again?</button>
      </div>
    </div>
  `;
  return generateDOM(markup);
}
