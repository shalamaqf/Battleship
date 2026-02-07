export class ComputerAI {
    constructor() {
        this.lastHit = null;
        this.direction = null;
        this.nextCandidateCoordinates = [];
    }

    getNextCoordinate() {
        if (this.nextCandidateCoordinates.length !== 0) {
            return this.nextCandidateCoordinates[0];
        }
        return generateCoordinate();
    }
}


export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}