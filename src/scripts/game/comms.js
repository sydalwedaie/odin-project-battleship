export function Comms() {
  const history = [];
  const getHistory = () => history;

  const addRoundMessage = (currPlayer, enemyGrid, [row, col]) => {
    const result = enemyGrid[row][col].ship ? "hit" : "miss";
    const msg = `${currPlayer.name} targeted coordinates ${[row, col]} ... it was a ${result}`;
    history.push(msg);
  };

  return { getHistory, addRoundMessage };
}
