import { generateDOM, html, $ } from "../helpers.js";

export function Gameover() {
  const DOM = generateDOMgameover();
  const containerEl = $(".gameover", DOM);
  const namePlayerEl = $(".name-player", DOM);
  const nameEnemyEl = $(".name-enemy", DOM);

  const render = (root) => root.appendChild(DOM);
  const loadData = (namePlayer, nameEnemy) => {
    namePlayerEl.textContent = namePlayer;
    nameEnemyEl.textContent = nameEnemy;
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
      <p class="message-gameover">
        <span class="name-player"></span> defeated
        <span class="name-enemy"></span>
      </p>
      <button class="btn-play-again">Play Again?</button>
    </div>
  `;
  return generateDOM(markup);
}
