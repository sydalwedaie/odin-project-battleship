import { validateBounds, validateOverlap } from "../helpers/validators.js";
import { createGrid, placeItem } from "../helpers/grid.js";

// Random generation helpers
const randomNum = (ceiling) => Math.floor(Math.random() * ceiling);

export const getRandomTarget = () => {
  return [randomNum(10), randomNum(10)];
};

export const getRandomPos = () => {
  const orientation = ["h", "v"][randomNum(2)];
  return [randomNum(10), randomNum(10), orientation];
};

export const getRandomPlacement = () => {
  const grid = createGrid();
  const formation = [];
  const ships = [
    [5, "Carrier"],
    [4, "Battleship"],
    [3, "Destroyer"],
    [3, "Submarine"],
    [2, "Patrol Boat"],
  ];

  ships.forEach(([length, name], index) => {
    while (formation.length === index) {
      const pos = getRandomPos();
      if (!validateBounds(length, pos)) continue;
      if (!validateOverlap(grid, length, pos)) continue;
      placeItem(grid, { name }, length, pos);
      formation.push(pos);
    }
  });

  return { grid, formation };
};
