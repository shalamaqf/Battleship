export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.isSunk = false;
    }
}

export function hit(ship) {
    return ship.hits++;
}

export function isSunk(ship) {
    if (ship.hits === ship.length) return true;
    return false;
}