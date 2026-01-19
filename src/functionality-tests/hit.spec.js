import { hit } from "../functionality/ship.js";

test('hit function is defined', () => {
    expect(hit).toBeDefined();
})

test('make hit function returns 1', () => {
    expect(hit()).toBe(1);
})