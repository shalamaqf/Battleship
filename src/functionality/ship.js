export class Ship {
    constructor(length) {
        this.length = length;
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