import { Game } from "../game/game.js";
import { ViewConsole } from "../view/console.js";

export function ControllerConsole() {
  const game = Game("Player 1", "Player 2");
  const view = ViewConsole(game.state, game.comms);

  game.comms.addWelcomeMessage(game.player1.name, game.player2.name);

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
