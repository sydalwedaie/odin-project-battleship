import { $ } from "../helpers/dom.js";
import { Gameboard } from "./gameboard.js";
import { Gameover } from "./gameover.js";
import { InitGame } from "./init_game.js";
import { PlaceShips } from "./place_ships.js";
import { Comms } from "./comms.js";
import { Attribution } from "./attr.js";

export function View() {
  const initGame = InitGame();
  const placeShips = PlaceShips();
  const gameboard = Gameboard();
  const gameover = Gameover();
  const comms = Comms();
  const attr = Attribution();

  const containerInitGameEl = $(".container-init-game");
  const containerPlaceShipsEl = $(".container-place-ships");
  const containerGameboardEl = $(".container-gameboard");
  const containerGameoverEl = $(".container-gameover");
  const footerEl = $(".footer");

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

  footerEl.innerHTML = "";
  attr.render(footerEl);

  return { initGame, placeShips, gameboard, gameover, comms, display };
}
