import { Ship } from "./ship.js";

export const Direction = Object.freeze({
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
})

export class GameBoard {
    constructor() {
        this.availCoordinate = {};
        this.missedAttacks = {};
        this.succeedAttacks = {};
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
        
        if (direction === Direction.HORIZONTAL) {
            for (let i = 0; i < length; i++) {
                if (!this.isAvailCoordinate({x: x + i, y: y})) return false;
                if (`${x + i}, ${y}` in this.occupiedCoordinate) return false;
                this.occupiedCoordinate[`${x + i}, ${y}`] = ship;
            }
            return true;
        }

        if (direction === Direction.VERTICAL) {
            for (let i = 0; i < length; i++) {
                if (!this.isAvailCoordinate({x: x, y: y + i})) return false;
                if (`${x}, ${y + i}` in this.occupiedCoordinate) return false;
                this.occupiedCoordinate[`${x}, ${y + i}`] = ship;
            }
            return true;
        }
    }

    receiveAttack({x, y}) {
        if (`${x}, ${y}` in this.occupiedCoordinate) {
            this.succeedAttacks[`${x}, ${y}`] = true;
            const ship = this.occupiedCoordinate[`${x}, ${y}`];
            ship.hit();
            return true;
        };

        this.missedAttacks[`${x}, ${y}`] = true;
        return false;
    }

    areAllShipsSunk() {
        const ships = this.getAllShips();

        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isShipSunk()) return false;
        }

        return true;
    }

    getAllShips() {
        const ships = [];
        const duplicateShips = Object.values(this.occupiedCoordinate);
        
        duplicateShips.forEach(ship => {
            if (!ships.includes(ship)) {
                ships.push(ship);
            }
        });

        return ships;
    }
}