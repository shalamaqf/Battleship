import { isSunk } from "../functionality/ship.js";
import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

test('isSunk function defined', () => {
    expect(isSunk).toBeDefined();
})

test('isSunk function returns true', () => {
    expect(isSunk(ship)).toBe(true);
})