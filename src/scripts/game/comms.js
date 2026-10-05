import { html } from "../helpers.js";

export function Comms() {
  const getMsgWelcome = (namePlayer1, namePlayer2) => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good morning" : "Good evening";
    const msg = html`
      <p>
        ${greeting}, Captain
        <strong>${namePlayer1}</strong>. Your mission is to defeat
        <strong>${namePlayer2}</strong> by sinking all their ships. Let's
        proceed with placing your ships.
      </p>
    `;
    return msg;
  };

  const getMsgTurn = (namePlayer1, namePlayer, gridEnemy, [row, col]) => {
    const result = gridEnemy[row][col].ship ? "hit" : "miss";
    const nameShooter = namePlayer === namePlayer1 ? "You" : namePlayer;
    const msg = html`
      <p>
        <strong>${nameShooter}</strong> targeted coordinates
        [${[row, col].join(", ")}] ... it was a <strong>${result}</strong>
      </p>
    `;
    return msg;
  };

  const getMsgError = (error) => {
    return `<p>Invalid operation: ${error.message}</p>`;
  };

  const getMsgGameover = (nameCurrPlayer, namePlayer1, namePlayer2) => {
    const player1Wins = nameCurrPlayer === namePlayer1;
    let msg;
    if (player1Wins) {
      msg = html`
        <p>
          Job well done Captain <strong>${namePlayer1}</strong>! You have
          defeated
          <strong>${namePlayer2}</strong>
          and sunk all their ships.
        </p>
      `;
    } else {
      msg = html`
        <p>
          We underestimated the enemy, Captain <strong>${namePlayer1}</strong>.
          <strong>${namePlayer2}</strong> has sunk all our ships.
        </p>
      `;
    }
    return msg;
  };

  return {
    getMsgWelcome,
    getMsgTurn,
    getMsgError,
    getMsgGameover,
  };
}
