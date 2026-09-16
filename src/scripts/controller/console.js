import { Game } from "../game/game.js";
import { displayRound } from "../display/console.js";

export function ConsoleController() {
  const game = Game("Player 1", "Player 2");
  game.player1.placeShips([
    [4, 7, "v"],
    [5, 2, "h"],
    [8, 1, "h"],
    [1, 8, "v"],
    [1, 1, "h"],
  ]);

  game.player2.placeShips([
    [4, 6, "v"],
    [5, 2, "h"],
    [8, 0, "h"],
    [2, 9, "v"],
    [1, 1, "v"],
  ]);

  displayRound(game.state);

  const play = (coords) => {
    game.playRound(coords);
    displayRound(game.state);
  };

  return { game, play };
}
