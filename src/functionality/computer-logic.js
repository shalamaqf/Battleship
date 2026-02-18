import { Direction } from "./game-board.js";

export class ComputerAI {
    constructor(realPlayerBoard) {
        this.lastHit = null;
        this.direction = null;
        this.nextCandidateCoordinates = [];
        this.opponentBoard = realPlayerBoard;
    }

    getNextCoordinate() {
        let coordinate;

        if (this.nextCandidateCoordinates.length !== 0) {
            coordinate = this.nextCandidateCoordinates[0];
            this.nextCandidateCoordinates.shift();
            return coordinate;
        }
        return coordinate = generateCoordinate();
    }

    generateAdjacentCoordinates() {
        const coordinateX = this.lastHit.x;
        const coordinateY = this.lastHit.y;

        const firstCoordinate = {x: coordinateX, y: coordinateY + 1};
        const secondCoordinate = {x: coordinateX + 1, y: coordinateY};
        const thirdCoordinate = {x: coordinateX, y: coordinateY - 1};
        const fourthCoordinate = {x: coordinateX - 1, y: coordinateY};
        const coordinates = [firstCoordinate, secondCoordinate, thirdCoordinate, fourthCoordinate];

        for (let i = 0; i < coordinates.length; i++) {
            if (this.opponentBoard.isAvailCoordinate(coordinates[i])) {
                this.nextCandidateCoordinates.push(coordinates[i]);
            }
        }
    }

    generateDirectionalCoordinates(direction) {
        const x = this.lastHit.x;
        const y = this.lastHit.y;
        this.nextCandidateCoordinates = [];

        if (direction === Direction.HORIZONTAL) {
            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x + i, y: y};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }

            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x - i, y: y};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }
        }

        if (direction === Direction.VERTICAL) {
            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x, y: y + i};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }

            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x, y: y - i};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }
        }
    }

    updateState(coordinate, result) {
        let isFirstHit = !this.lastHit;

        if (result.hit === null) {
            return;
        } else if (result.hit === true) {
            this.lastHit = coordinate;
        } else {
            this.lastHit = null;
        }

        // Reset computer state if the ship is sunk
        this.resetState(result);

        if (this.lastHit === null) {
            const x = coordinate.x;
            const y = coordinate.y;
            this.nextCandidateCoordinates = this.nextCandidateCoordinates.filter(coordinate => {
                                                return !(coordinate.x === x && coordinate.y === y)
                                            })
        }

        if (this.lastHit === coordinate && isFirstHit) {
            this.generateAdjacentCoordinates();
        }

        if (this.lastHit === coordinate && !isFirstHit) {
            const ship = this.opponentBoard.getShipByCoordinate(coordinate);
            const direction = ship.direction;

            this.generateDirectionalCoordinates(direction);
        }
    }

    resetState(result) {
        if (result.isShipSunk) {
            this.direction = null;
            this.lastHit = null;
            this.nextCandidateCoordinates = [];
        }
    }
}


export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}