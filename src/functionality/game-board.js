import { Ship } from "./ship.js";

export const Direction = Object.freeze({
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
})

export function generateDirection() {
    const number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {
        return Direction.HORIZONTAL;
    } else {
        return Direction.VERTICAL;
    }
}

export class GameBoard {
    constructor() {
        this.availCoordinate = {};
        this.missedAttacks = {};
        this.succeedAttacks = {};
        this.occupiedCoordinate = {};
    }

    isAvailCoordinate({x, y}) {
        if (x > 10 || x < 1) return false;
        if (y > 10 || y < 1) return false;
        return true;
    }

    placeShip({x, y}, ship) {
        if (!this.isAvailCoordinate({x, y})) return false;

        if (`${x}, ${y}` in this.occupiedCoordinate) return false;
        
        if (ship.direction === Direction.HORIZONTAL) {
            for (let i = 0; i < ship.length; i++) {
                if (!this.isAvailCoordinate({x: x + i, y: y})) return false;
                if (`${x + i}, ${y}` in this.occupiedCoordinate) return false;
            }
            for (let i = 0; i < ship.length; i++) {
                this.occupiedCoordinate[`${x + i}, ${y}`] = ship;
            }
            return true;
        }

        if (ship.direction === Direction.VERTICAL) {
            for (let i = 0; i < ship.length; i++) {
                if (!this.isAvailCoordinate({x: x, y: y + i})) return false;
                if (`${x}, ${y + i}` in this.occupiedCoordinate) return false;
            }
            for (let i = 0; i < ship.length; i++) {
                this.occupiedCoordinate[`${x}, ${y + i}`] = ship;
            }
            return true;
        }
    }

    receiveAttack({x, y}) {
        if (`${x}, ${y}` in this.missedAttacks || `${x}, ${y}` in this.succeedAttacks) return null;

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

    getShipByCoordinate(coordinate) {
        let ship;
        const key = `${coordinate.x}, ${coordinate.y}`;
        if (key in this.occupiedCoordinate) {
            ship = this.occupiedCoordinate[key];
        }
        return ship;
    }

    resetBoard() {
        this.availCoordinate = {};
        this.missedAttacks = {};
        this.succeedAttacks = {};
        this.occupiedCoordinate = {};
    }

    isPlacementValid({x, y}, length, direction) {
        const shipCoordinates = {};

        if (direction === Direction.HORIZONTAL) {
            for (let i = 0; i < length; i++) {
                const coordinate = `${x + i}, ${y}`;
                shipCoordinates[coordinate] = true;
            }
        }

        if (direction === Direction.VERTICAL) {
            for (let i = 0; i < length; i++) {
                const coordinate = `${x}, ${y + i}`;
                shipCoordinates[coordinate] = true;
            }
        } 
        
        const keys = Object.keys(shipCoordinates);
        let isValid = true;
        keys.forEach(key => {
            if (key in this.occupiedCoordinate) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}