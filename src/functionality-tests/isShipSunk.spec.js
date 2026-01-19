import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

test('isShipSunk method defined', () => {
    expect(ship.isShipSunk).toBeDefined();
})

test('isShipSunk method returns false', () => {
    expect(ship.isShipSunk()).toBe(false);
})

test('make isShipSunk method returns false when it hits 2', () => {
    ship.hit(),
    ship.hit(),
    expect(ship.isShipSunk()).toBe(false);
})

test('make isShipSunk function returns true when it hits 3', () => {
    ship.hits = 0;
    ship.hit(),
    ship.hit(),
    ship.hit(),
    expect(ship.isShipSunk()).toBe(true);
})