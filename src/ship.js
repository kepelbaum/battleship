function Ship (length) {
    let len = length;
    let hits = 0;
    // let getLength = () => len;
    let hit = () => hits++;
    let isSunk = () => hits >= length;
    return {hit, isSunk}
}

module.exports = {Ship};