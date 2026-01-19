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