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
      const namePlayer1 = formEl.elements["name-player1"].value;
      const namePlayer2 = formEl.elements["name-player2"].value;
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
        <div>
          <label for="name-player1">Player 1 Name:</label>
          <input
            type="text"
            name="name-player1"
            id="name-player1"
            placeholder="Player 1"
          />
        </div>
        <div>
          <label for="name-player2">Player 2 Name:</label>
          <input
            type="text"
            name="name-player2"
            id="name-player2"
            placeholder="Player 2"
          />
        </div>
        <div>
          <button class="btn-init-game">Initialize Game</button>
        </div>
      </form>
    </div>
  `;

  return generateDOM(markup);
}
