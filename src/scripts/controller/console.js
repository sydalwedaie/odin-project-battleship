import { Game } from "../game/game.js";
import { ViewConsole } from "../view/console.js";

export function ControllerConsole() {
  const game = Game("Player 1", "Player 2");
  const view = ViewConsole(game.state);
  // game.player1.placeShips([
  //   [4, 7, "v"],
  //   [5, 2, "h"],
  //   [8, 1, "h"],
  //   [1, 8, "v"],
  //   [1, 1, "h"],
  // ]);

  // game.player2.placeShips([
  //   [4, 6, "v"],
  //   [5, 2, "h"],
  //   [8, 0, "h"],
  //   [2, 9, "v"],
  //   [1, 1, "v"],
  // ]);

  game.player1.placeShipsRandom();
  game.player2.placeShipsRandom();

  view.printRound();

  const play = (coords) => {
    game.playRound(coords);
    game.playRoundRandom();
    view.printRound();
  };

  return { game, play };
}
