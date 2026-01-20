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

    placeShip({x, y}) {
        if (!this.isAvailCoordinate({x, y})) return false;

        this.occupiedCoordinate[`${x}, ${y}`] = undefined;
        return true;
    }
}