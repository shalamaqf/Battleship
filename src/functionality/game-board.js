import { Ship } from "./ship.js";

export const Direction = Object.freeze({
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
})

export class GameBoard {
    constructor() {
        this.availCoordinate = {};
        this.missedCoordinate = {};
        this.occupiedCoordinate = {};
    }

    isAvailCoordinate({x, y}) {
        if (x > 8 || x < 1) return false;
        if (y > 8 || y < 1) return false;
        return true;
    }

    placeShip({x, y}, length, direction) {
        if (!this.isAvailCoordinate({x, y})) return false;

        if (`${x}, ${y}` in this.occupiedCoordinate) return false;

        const ship = new Ship(length);
        
        for (let i = 0; i < length; i++) {
            if (`${x + i}, ${y}` in this.occupiedCoordinate) return false;
            this.occupiedCoordinate[`${x + i}, ${y}`] = ship;
        }

        return true;
    }
}