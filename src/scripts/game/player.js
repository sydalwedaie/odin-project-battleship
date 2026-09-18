import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export function Player(name) {
  const gameboard = Gameboard();
  const ships = [
    [5, "Carrier"],
    [4, "Battleship"],
    [3, "Destroyer"],
    [3, "Submarine"],
    [2, "Patrol Boat"],
  ];

  const placeShips = (formation) => {
    if (formation.length !== 5) {
      throw new Error("number of positions is not exactly 5");
    }

    formation.forEach((pos, index) => {
      const [length, name] = ships[index];
      gameboard.placeShip(Ship(length, name), pos);
    });
  };

  return { name, gameboard, placeShips };
}
