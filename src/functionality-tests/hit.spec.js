import { hit } from "../functionality/ship.js";
import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

test('hit function is defined', () => {
    expect(hit).toBeDefined();
})

test('make hit function returns 1', () => {
    expect(hit()).toBe(1);
})