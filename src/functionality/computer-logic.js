export function computerAttack({x, y}, playerBoard) {
    return (playerBoard.receiveAttack({x: x, y: y}));
}

export function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 10) + 1;
    const coordinateY = Math.floor(Math.random() * 10) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}