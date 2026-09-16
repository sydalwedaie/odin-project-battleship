import { describe, expect, test } from "@jest/globals";
import { Ship } from "../src/scripts/game/ship.js";

describe("Test factory: Ship", () => {
  const ship = Ship(4, "battleship");
  test("should throw error for invalid length", () => {
    expect(() => Ship(1, "name")).toThrow();
    expect(() => Ship(6, "name")).toThrow();
  });
  test("should return length and name of ship", () => {
    expect(ship.length).toBe(4);
    expect(ship.name).toBe("battleship");
  });
  test("should return hit count 0", () => {
    expect(ship.getHitCount()).toBe(0);
  });
  test("should return hit count 2", () => {
    ship.hit();
    ship.hit();
    expect(ship.getHitCount()).toBe(2);
  });
  test("should return true when the ship is sunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
