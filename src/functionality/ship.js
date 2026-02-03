export class Ship {
    constructor(length, direction) {
        this.length = length;
        this.direction = direction;
        this.hits = 0;
        this.isSunk = false;
    }

    hit() {
        return this.hits++;
    }

    isShipSunk() {
        if (this.hits === this.length) return true;
        return false;
    }   
}