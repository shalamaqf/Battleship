import { Direction } from "./game-board";

export class ComputerAI {
    constructor() {
        this.lastHit = null;
        this.direction = null;
        this.nextCandidateCoordinates = [];
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
            this.nextCandidateCoordinates.push(coordinates[i]);
        }
    }

    generateDirectionalCoordinates(direction) {
        const x = this.lastHit.x;
        const y = this.lastHit.y;
        this.nextCandidateCoordinates = [];

        if (direction === Direction.HORIZONTAL) {
            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x + i, y: y};
                this.nextCandidateCoordinates.push(coordinate);
            }

            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x - i, y: y};
                this.nextCandidateCoordinates.push(coordinate);
            }
        }

        if (direction === Direction.VERTICAL) {
            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x, y: y + i};
                this.nextCandidateCoordinates.push(coordinate);
            }

            for (let i = 1; i < 4; i++) {
                const coordinate = {x: x, y: y - i};
                this.nextCandidateCoordinates.push(coordinate);
            }
        }
    }

    updateState(coordinate, result) {
        if (result.hit) {
            this.lastHit = coordinate;
        }
    }

    resetState() {
        this.direction = null;
        this.lastHit = null;
        this.nextCandidateCoordinates = [];
    }
}


export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}