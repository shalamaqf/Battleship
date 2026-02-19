import { Direction } from "./game-board.js";

export class ComputerAI {
    constructor(realPlayerBoard) {
        this.lastHit = null;
        this.direction = null;
        this.nextCandidateCoordinates = [];
        this.opponentBoard = realPlayerBoard;
        this.targetShip = null;
        this.anchorHit = null;
        this.isFirstHit = false;
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
        const coordinateX = this.anchorHit.x;
        const coordinateY = this.anchorHit.y;

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
        const x = this.anchorHit.x;
        const y = this.anchorHit.y;
        this.nextCandidateCoordinates = [];

        if (direction === Direction.HORIZONTAL) {
            for (let i = 1; i < 5; i++) {
                const coordinate = {x: x + i, y: y};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }

            for (let i = 1; i < 5; i++) {
                const coordinate = {x: x - i, y: y};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }
        }

        if (direction === Direction.VERTICAL) {
            for (let i = 1; i < 5; i++) {
                const coordinate = {x: x, y: y + i};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }

            for (let i = 1; i < 5; i++) {
                const coordinate = {x: x, y: y - i};
                if (this.opponentBoard.isAvailCoordinate(coordinate)) {
                    this.nextCandidateCoordinates.push(coordinate);
                }
            }
        }
    }

    updateState(coordinate, result) {
        this.trackHit(coordinate, result);
    }

    trackHit(coordinate, result) {
        if (result.hit === false) {
            this.lastHit = coordinate;
        }

        if (result.hit) {
            if (this.isFirstHit === false) {
                this.isFirstHit = true;
                this.lastHit = coordinate;
                this.anchorHit = coordinate;
                this.targetShip = this.opponentBoard.getShipByCoordinate(coordinate);
            } else {
                this.lastHit = coordinate;
            }
        }
    }

    determineGenerator() {
        
    }

    removeMissedCoordinate() {
        const x = this.lastHit.x;
        const y = this.lastHit.y;
        this.nextCandidateCoordinates = this.nextCandidateCoordinates.filter(coordinate => {
                                                return !(coordinate.x === x && coordinate.y === y)
                                            })
    }

    resetState(result) {
        if (result.isShipSunk) {
            this.direction = null;
            this.lastHit = null;
            this.nextCandidateCoordinates = [];
            this.targetShip = null;
            this.anchorHit = null;
        }
    }
}


export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}