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

  const placeShips = (positions) => {
    if (positions.length !== 5) {
      throw new Error("number of positions is not exactly 5");
    }

    positions.forEach((pos, index) => {
      const [length, name] = ships[index];
      gameboard.placeShip(Ship(length, name), pos);
    });
  };

  const placeShipsRandom = () => {
    ships.forEach(([length, name], index) => {
      while (gameboard.fleet.length === index) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const orientation = ["h", "v"][Math.floor(Math.random() * 2)];
        if (
          (orientation === "h") & (col + length < 10) ||
          (orientation === "v") & (row + length < 10)
        ) {
          try {
            gameboard.placeShip(Ship(length, name), [row, col, orientation]);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  };

  return { name, gameboard, placeShips, placeShipsRandom };
}
