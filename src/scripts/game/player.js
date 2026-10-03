import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { getRandomPlacement, gridForEach } from "../helpers.js";

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

  const placeShipsRandom = () => {
    placeShips(getRandomPlacement().formation);
  };

  const resetBoard = () => {
    gameboard.fleet.length = 0;
    gridForEach(gameboard.grid, (cell) => {
      cell.ship = null;
      cell.isShut = false;
    });
  };

  return { name, gameboard, placeShips, placeShipsRandom, resetBoard };
}
