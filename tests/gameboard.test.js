import { describe, expect, test } from "@jest/globals";
import { Gameboard } from "../src/scripts/game/gameboard.js";
import { Ship } from "../src/scripts/game/ship.js";
import { gridForEach } from "../src/scripts/helpers.js";

describe("Test Gameboard: grid", () => {
  const gameboard = Gameboard();
  const grid = gameboard.grid;

  test("should return 10 grid rows", () => {
    expect(grid.length).toBe(10);
  });

  test.each([...Array(10).keys()])(
    "should return 10 column for each grid row",
    (row) => {
      expect(grid[row].length).toBe(10);
    },
  );

  test("should return valid empty cell for each cell", () => {
    const emptyCell = { ship: null, isShut: false };
    gridForEach(grid, (cell) => {
      expect(cell).toEqual(emptyCell);
    });
  });
});

describe("Test Gameboard: ship placement errors", () => {
  const gameboard = Gameboard();

  const shipA = Ship(4, "A");
  const shipB = Ship(4, "B");

  const invalidCoordsCases = [
    [10, 4, "h"],
    [4, 10, "v"],
    [-1, 4, "h"],
    [1, -4, "v"],
  ];

  const invalidBoundsCases = [
    [2, 7, "h"],
    [4, 8, "h"],
    [7, 4, "v"],
    [8, 7, "v"],
  ];

  test.each(invalidCoordsCases)(
    "should throw error for ship placement with invalid coordinates",
    (pos) => {
      expect(() => gameboard.placeShip(shipA, pos)).toThrow();
    },
  );

  test("should throw effor for ship placement with invalid orientation", () => {
    expect(() => gameboard.placeShip(shipA, [1, 1, "a"])).toThrow();
  });

  test.each(invalidBoundsCases)(
    "should throw error for ship dimentions out of bounds",
    (pos) => {
      expect(() => gameboard.placeShip(shipA, pos)).toThrow();
    },
  );

  test("should throw error for overlapping ships", () => {
    gameboard.placeShip(shipA, [4, 4, "h"]);
    expect(() => gameboard.placeShip(shipB, [4, 2, "h"])).toThrow();
    expect(() => gameboard.placeShip(shipB, [2, 6, "v"])).toThrow();
  });
});

describe("Test Gameboard: ship placement", () => {
  const horizontalCases = [
    [0, 0],
    [0, 6],
    [9, 0],
    [9, 6],
    [1, 3],
    [5, 5],
    [7, 6],
  ];

  const verticalCases = [
    [0, 0],
    [6, 0],
    [0, 9],
    [6, 9],
    [3, 1],
    [5, 5],
    [6, 8],
  ];

  test.each(horizontalCases)(
    "should place horizontal ships correctly",
    (row, col) => {
      const gameboard = Gameboard();
      const grid = gameboard.grid;

      const ship = Ship(4, "A");

      gameboard.placeShip(ship, [row, col, "h"]);

      [...Array(ship.length).keys()].forEach((count) => {
        expect(grid[row][col + count].ship).toEqual(ship);
      });
    },
  );

  test.each(verticalCases)(
    "should place vertical ships correctly",
    (row, col) => {
      const gameboard = Gameboard();
      const grid = gameboard.grid;

      const ship = Ship(4, "A");

      gameboard.placeShip(ship, [row, col, "v"]);

      [...Array(ship.length).keys()].forEach((count) => {
        expect(grid[row + count][col].ship).toEqual(ship);
      });
    },
  );

  test("should return fleet", () => {
    const gameboard = Gameboard();

    const shipA = Ship(5, "A");
    const shipB = Ship(4, "B");
    const shipC = Ship(3, "C");

    gameboard.placeShip(shipA, [4, 4, "h"]);
    gameboard.placeShip(shipB, [1, 3, "h"]);
    gameboard.placeShip(shipC, [4, 3, "v"]);

    expect(gameboard.fleet).toEqual([shipA, shipB, shipC]);
  });
});

describe("Test Gameboard: attack logic", () => {
  const gameboard = Gameboard();
  const grid = gameboard.grid;

  const shipA = Ship(4, "A");
  const shipB = Ship(3, "B");
  const shipC = Ship(2, "C");

  gameboard.placeShip(shipA, [1, 1, "h"]);
  gameboard.placeShip(shipB, [3, 3, "h"]);
  gameboard.placeShip(shipC, [6, 3, "v"]);

  const invalidCoordsCases = [
    [10, 4],
    [4, 10],
    [-1, 4],
    [4, -1],
  ];

  const validCoordsCases = [
    [1, 3],
    [2, 4],
    [4, 5],
    [6, 3],
  ];

  test.each(invalidCoordsCases)(
    "should throw error if recieves attack out of bounds",
    (row, col) => {
      expect(() => gameboard.receiveAttack([row, col])).toThrow();
    },
  );

  test.each(validCoordsCases)(
    "should recieve attack if coords not already shut",
    (row, col) => {
      gameboard.receiveAttack([row, col]);
      expect(grid[row][col].isShut).toBe(true);
    },
  );

  test.each(validCoordsCases)(
    "should throw error if recieves attack in coords already shut",
    (row, col) => {
      expect(() => gameboard.receiveAttack([row, col])).toThrow();
    },
  );

  test("should return false if NO ship is sunk", () => {
    expect(gameboard.allShipsAreSunk()).toBe(false);
  });

  test("should return false if SOME ships are sunk", () => {
    gameboard.receiveAttack([7, 3]);
    expect(shipC.isSunk()).toBe(true);
    expect(gameboard.allShipsAreSunk()).toBe(false);
  });

  test("should return true if ALL ships are sunk", () => {
    gridForEach(grid, (cell, row, col) => {
      if (!cell.isShut) gameboard.receiveAttack([row, col]);
    });

    expect(shipA.isSunk()).toBe(true);
    expect(shipB.isSunk()).toBe(true);
    expect(shipC.isSunk()).toBe(true);
    expect(gameboard.allShipsAreSunk()).toBe(true);
  });
});
