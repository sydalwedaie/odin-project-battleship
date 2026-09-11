import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export function Player() {
  const gameboard = Gameboard();

  const initFormation = (positions) => {
    if (positions.length !== 5) {
      throw new Error("number of positions is not exactly 5");
    }
    const shipLengths = [5, 4, 3, 3, 2];
    positions.forEach((pos, index) => {
      const len = shipLengths[index];
      gameboard.placeShip(Ship(len), pos);
    });
  };

  return { gameboard, initFormation };
}
