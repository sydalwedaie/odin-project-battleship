import { describe, expect, test } from "@jest/globals";
import { Game } from "../src/scripts/game/game.js";

function placeShips(game) {
  game.player1.placeShips([
    [4, 7, "v"],
    [5, 2, "h"],
    [8, 1, "h"],
    [1, 8, "v"],
    [1, 1, "h"],
  ]);

  game.player2.placeShips([
    [4, 6, "v"],
    [5, 2, "h"],
    [8, 0, "h"],
    [2, 9, "v"],
    [1, 1, "v"],
  ]);
}

describe("Test factory: Game init", () => {
  const game = Game("player 1", "player 2");

  test("should return names of players", () => {
    expect(game.player1.name).toBe("player 1");
    expect(game.player2.name).toBe("player 2");
  });

  test("should throw error if attempt to play before placing ships", () => {
    expect(() => game.playRound([1, 1])).toThrow();
  });

  test("should place ships for both players", () => {
    placeShips(game);

    expect(game.player1.gameboard.fleet.length).toBe(5);
    expect(game.player1.gameboard.fleet.length).toBe(5);
  });

  test("should switch players after each round", () => {
    expect(game.state.currPlayer).toEqual(game.player1);
    expect(game.state.currEnemy).toEqual(game.player2);
    game.playRound([1, 1]);
    expect(game.state.currPlayer).toEqual(game.player2);
    expect(game.state.currEnemy).toEqual(game.player1);
    game.playRound([1, 1]);
    expect(game.state.currPlayer).toEqual(game.player1);
    expect(game.state.currEnemy).toEqual(game.player2);
  });

  test("should throw error if a target is already shut", () => {
    expect(() => game.playRound([1, 1])).toThrow();
  });
});

describe("Test winning game, two players", () => {
  const game = Game("player 1", "player 2");
  placeShips(game);

  const targets = [
    [1, 1],
    [8, 1],
    [1, 2],
    [5, 2],
    [8, 2],
    [5, 3],
    [8, 3],
    [5, 4],
    [5, 5],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [8, 7],
    [1, 8],
    [2, 8],
    [3, 8],
  ];

  test("should return false before gameover", () => {
    expect(game.state.gameover).toBe(false);
  });

  test("should return true after gameover", () => {
    targets.forEach((target) => {
      game.playRound(target);
      game.playRound(target);
    });

    expect(game.state.gameover).toBe(true);
    expect(game.state.currPlayer).toBe(game.player2);
  });

  test("should throw error if attempts to play after gameover", () => {
    expect(() => game.playRound([7, 3])).toThrow();
  });
});
