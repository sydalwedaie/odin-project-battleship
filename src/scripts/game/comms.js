export function Comms() {
  const history = [];
  const getHistory = () => history;

  const addRoundMessage = (currPlayerName, enemyGrid, [row, col]) => {
    const result = enemyGrid[row][col].ship ? "hit" : "miss";
    const msg = `${currPlayerName} targeted coordinates ${[row, col]} ... it was a ${result}`;
    history.push(msg);
  };

  const addErrorMessage = (error) => {
    const msg = "Invalid operation: " + error.message;
    history.push(msg);
  };

  const addWelcomeMessage = (player1Name, player2Name) => {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good morning" : "Good evening";
    const msg = `${greeting}, Captain ${player1Name}. Your mission is to defeat ${player2Name} by sinking all their ships. Let's proceed with placing your ships.`;
    history.push(msg);
  };

  const addGameoverMessage = (currPlayerName, player1Name, player2Name) => {
    const player1Wins = currPlayerName === player1Name;
    let msg;
    if (player1Wins) {
      msg = `Job well done Captain ${player1Name}! You have defeated ${player2Name} and sunk all their ships.`;
    } else {
      msg = `We underestimated the enemy, Captain ${player1Name}. ${player2Name} has sunk all our ships.`;
    }
    history.push(msg);
  };

  return {
    getHistory,
    addRoundMessage,
    addErrorMessage,
    addWelcomeMessage,
    addGameoverMessage,
  };
}
