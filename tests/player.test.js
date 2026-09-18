import { describe, expect, test } from "@jest/globals";
import { Player } from "../src/scripts/game/player.js";

describe("Test factory: Player", () => {
  const player = Player("name");

  test("should return name of player", () => {
    expect(player.name).toBe("name");
  });

  test("should throw error if number of positions is not exactly 5", () => {
    expect(() => {
      player.placeShips([[1, 1, "h"], [(2, 2, "h")]]);
    }).toThrow();
    expect(() => {
      player.placeShips([
        [1, 1, "h"],
        [2, 2, "h"],
        [3, 3, "h"],
        [4, 4, "h"],
        [5, 5, "h"],
        [6, 6, "h"],
      ]);
    }).toThrow();
  });

  test("should place ships given 5 positions", () => {
    player.placeShips([
      [4, 7, "v"],
      [5, 2, "h"],
      [8, 1, "h"],
      [1, 8, "v"],
      [1, 1, "h"],
    ]);

    expect(player.gameboard.fleet.length).toBe(5);
  });

  test("should place 5 ships randomly", () => {
    player.placeShipsRandom();
    expect(player.gameboard.fleet.length).toBe(5);
  });
});
