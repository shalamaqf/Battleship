export function computerAttack() {

}

function generateCoordinate() {
    const coordinateX = Math.floor(Math.random() * 8) + 1;
    const coordinateY = Math.floor(Math.random() * 8) + 1;
    const coordinate = {x: coordinateX, y: coordinateY};
    return coordinate;
}