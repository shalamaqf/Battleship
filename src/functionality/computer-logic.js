export class ComputerAI {
    constructor(realPlayerBoard) {
        this.lastHit = null;
        this.nextCandidateCoordinates = [];
        this.opponentBoard = realPlayerBoard;
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

    updateState(coordinate, result) {
        if (!result.hit) {
            this.lastHit = coordinate;
            
            if (this.anchorHit) {
                this.removeMissedCoordinate();
            }
            
            if (this.nextCandidateCoordinates.length === 0 && this.anchorHit) {
                this.generateAdjacentCoordinates();
            } else {
                return;
            }
        }

        if (result.isShipSunk) {
            this.resetState();
            return;
        }

        if (result.hit && !this.isFirstHit) {
            this.lastHit = coordinate;
            this.anchorHit = coordinate;
            this.isFirstHit = true;
            this.generateAdjacentCoordinates();
            return;
        } else {
            this.lastHit = coordinate;
            this.anchorHit = coordinate;
        }
    }

    removeMissedCoordinate() {
        const x = this.lastHit.x;
        const y = this.lastHit.y;
        this.nextCandidateCoordinates = this.nextCandidateCoordinates.filter(coordinate => {
                                                return !(coordinate.x === x && coordinate.y === y)
                                            })
    }

    resetState() {
        this.lastHit = null;
        this.nextCandidateCoordinates = [];
        this.anchorHit = null;
        this.isFirstHit = false;
    }
}


export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}