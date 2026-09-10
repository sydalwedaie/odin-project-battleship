import "./assets/modern-normalize.css";
import "./assets/reset.css";
import "./index.css";
import "./template.html";
import { Ship } from "./game_logic/ship.js";
import { Gameboard } from "./game_logic/gameboard.js";

const gameboard = Gameboard();

gameboard.placeShip(Ship(5), [4, 7], "v");
gameboard.placeShip(Ship(4), [5, 2], "h");
gameboard.placeShip(Ship(3), [8, 1], "h");
gameboard.placeShip(Ship(3), [1, 8], "v");
gameboard.placeShip(Ship(2), [1, 1], "h");

gameboard.receiveAttack([1, 1]);
gameboard.receiveAttack([3, 2]);
gameboard.receiveAttack([5, 4]);
gameboard.receiveAttack([9, 4]);

gameboard.printBoard();
