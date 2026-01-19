import { hit } from "../functionality/ship.js";
import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

describe('hit function', () => {
    test('hit function is defined', () => {
        expect(hit).toBeDefined();
    })

    test('make hit function returns 1', () => {
        hit(ship),
        expect(ship.hits).toBe(1);
    })

    test('make hit function returns 3', () => {
        ship.hits = 0;
        hit(ship),
        hit(ship),
        hit(ship),
        expect(ship.hits).toBe(3);
    })
})