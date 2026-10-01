import { $ } from "../helpers.js";
import { Gameboard } from "./gameboard.js";
import { Gameover } from "./gameover.js";
import { InitGame } from "./init_game.js";
import { PlaceShips } from "./place_ships.js";

export function View() {
  const initGame = InitGame();
  const placeShips = PlaceShips();
  const gameboard = Gameboard();
  const gameover = Gameover();

  const containerInitGameEl = $(".container-init-game");
  const containerPlaceShipsEl = $(".container-place-ships");
  const containerGameboardEl = $(".container-gameboard");
  const containerGameoverEl = $(".container-gameover");

  const switchPage = (page) => {
    if (page !== "init-game") containerInitGameEl.innerHTML = "";
    if (page !== "place-ships") containerPlaceShipsEl.innerHTML = "";
    if (page !== "gameboard") containerGameboardEl.innerHTML = "";
    if (page !== "gameover") containerGameoverEl.innerHTML = "";
  };

  const display = {
    initGame: () => {
      switchPage("init-game");
      initGame.render(containerInitGameEl);
    },
    placeShips: () => {
      switchPage("place-ships");
      placeShips.render(containerPlaceShipsEl);
    },
    gameboard: () => {
      switchPage("gameboard");
      gameboard.render(containerGameboardEl);
    },
    gameover: () => {
      switchPage("gameover");
      gameover.render(containerGameoverEl);
    },
  };

  return { initGame, placeShips, gameboard, gameover, display };
}
