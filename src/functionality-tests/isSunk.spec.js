import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

test('isSunk function defined', () => {
    expect(isSunk).toBeDefined();
})

test('isSunk function returns false', () => {
    expect(isSunk(ship)).toBe(false);
})

test('make isSunk function returns false when it hits 2', () => {
    hit(ship),
    hit(ship),
    expect(isSunk(ship)).toBe(false);
})

test('make isSunk function returns true when it hits 3', () => {
    ship.hits = 0;
    hit(ship),
    hit(ship),
    hit(ship),
    expect(isSunk(ship)).toBe(true);
})