import { describe, expect, test } from "@jest/globals";
import { Gameboard } from "../src/scripts/game/gameboard.js";
import { Ship } from "../src/scripts/game/ship.js";

function gridForEach(cb) {
  [...Array(10).keys()].forEach((row) => {
    [...Array(10).keys()].forEach((col) => {
      cb(row, col);
    });
  });
}

describe("Test factory: Gameboard grid", () => {
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
    gridForEach((row, col) => {
      expect(grid[row][col]).toEqual({ ship: null, isShut: false });
    });
  });
});

describe("Test factory: Gameboard ship placement", () => {
  const gameboard = Gameboard();
  const grid = gameboard.grid;

  const shipA = Ship(4, "A");
  const shipB = Ship(4, "B");
  const shipC = Ship(4, "C");

  test.each([
    [10, 4, "h"],
    [4, 10, "v"],
    [-1, 4, "h"],
    [1, -4, "v"],
  ])(
    "should throw error for ship placement with invalid coordinates",
    (pos) => {
      expect(() => gameboard.placeShip(shipA, pos)).toThrow();
    },
  );

  test("should throw effor for ship placement with invalid orientation", () => {
    expect(() => gameboard.placeShip(shipA, [1, 1, "a"])).toThrow();
  });

  test.each([
    [4, 8, "h"],
    [8, 4, "v"],
  ])("should throw error for ship dimentions out of bounds", (pos) => {
    expect(() => gameboard.placeShip(shipA, pos)).toThrow();
  });

  test("should throw error for overlapping ships", () => {
    gameboard.placeShip(shipA, [4, 4, "h"]);
    expect(() => gameboard.placeShip(shipB, [4, 2, "h"])).toThrow();
    expect(() => gameboard.placeShip(shipB, [2, 6, "v"])).toThrow();
  });

  test("should place ships correctly", () => {
    gameboard.placeShip(shipB, [1, 3, "h"]);
    gameboard.placeShip(shipC, [4, 3, "v"]);
    [(0, 1, 2)].forEach((count) => {
      expect(grid[1][3 + count].ship).toEqual(shipB);
      expect(grid[4 + count][3].ship).toEqual(shipC);
    });
  });

  test("should return fleet", () => {
    expect(gameboard.fleet).toEqual([shipA, shipB, shipC]);
  });
});

describe("Test factory: Gameboard attack logic", () => {
  const gameboard = Gameboard();
  const grid = gameboard.grid;

  const shipA = Ship(4, "A");
  const shipB = Ship(3, "B");
  const shipC = Ship(2, "C");

  gameboard.placeShip(shipA, [1, 1, "h"]);
  gameboard.placeShip(shipB, [3, 3, "h"]);
  gameboard.placeShip(shipC, [6, 3, "v"]);

  test.each([
    [10, 4],
    [4, 10],
    [-1, 4],
    [4, -1],
  ])("should throw error if recieves attack out of bounds", (row, col) => {
    expect(() => gameboard.receiveAttack([row, col])).toThrow();
  });

  test.each([
    [1, 3],
    [2, 4],
    [4, 5],
    [6, 3],
  ])("should recieve attack if coords not already shut", (row, col) => {
    gameboard.receiveAttack([row, col]);
    expect(grid[row][col].isShut).toBe(true);
  });

  test.each([
    [1, 3],
    [2, 4],
    [4, 5],
    [6, 3],
  ])(
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
    expect(gameboard.allShipsAreSunk()).toBe(false);
  });

  test("should return true if ALL ships are sunk", () => {
    gridForEach((row, col) => {
      if (grid[row][col].isShut) return;
      gameboard.receiveAttack([row, col]);
    });

    expect(gameboard.allShipsAreSunk()).toBe(true);
  });
});
