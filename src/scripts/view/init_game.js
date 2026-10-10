import { generateDOM, html, $ } from "../helpers.js";

export function InitGame() {
  const DOM = generateDOMinitGame();

  const containerEl = $(".init-game", DOM);
  const formEl = $("form", DOM);

  const render = (root) => root.appendChild(DOM);

  const bindClickInitGame = (handleClick) => {
    containerEl.addEventListener("click", (e) => {
      if (!e.target.closest(".btn-init-game")) return;
      e.preventDefault();
      const namePlayer1 = formEl.elements["name-player1"].value || "Player 1";
      const namePlayer2 = formEl.elements["name-player2"].value || "Player 2";
      handleClick(namePlayer1, namePlayer2);
      formEl.reset();
    });
  };

  return { render, bindClickInitGame };
}

function generateDOMinitGame() {
  const markup = html`
    <div class="init-game">
      <form>
        <div class="card comms">
          Enter player names below. You will play as Player 1 against the
          computer.
        </div>
        <div class="card player1">
          <label for="name-player1" class="card-header">Player 1</label>
          <input
            type="text"
            name="name-player1"
            id="name-player1"
            placeholder="Player 1"
          />
        </div>
        <div class="card player2">
          <label for="name-player2" class="card-header">Player 2</label>
          <input
            type="text"
            name="name-player2"
            id="name-player2"
            placeholder="Player 2"
          />
        </div>
        <div class="controls">
          <button class="btn btn-init-game">Initialize Game</button>
        </div>
      </form>
    </div>
  `;

  return generateDOM(markup);
}
