import { Ship } from "./ship.js";

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

    placeShip({x, y}, length) {
        if (!this.isAvailCoordinate({x, y})) return false;

        const ship = new Ship(length);
        
        for (let i = 0; i < length; i++) {
            this.occupiedCoordinate[`${x + i}, ${y}`] = ship;
        }

        return true;
    }
}