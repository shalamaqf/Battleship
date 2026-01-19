import { hit } from "../functionality/ship.js";
import { Ship } from "../functionality/ship.js";

const ship = new Ship(3);

describe('hit method', () => {
    test('hit method is defined', () => {
        expect(ship.hit).toBeDefined();
    })

    test('make hit method returns 1', () => {
        ship.hit()
        expect(ship.hits).toBe(1);
    })

    test('make hit method returns 3', () => {
        ship.hits = 0;
        ship.hit(),
        ship.hit(),
        ship.hit(),
        expect(ship.hits).toBe(3);
    })
})