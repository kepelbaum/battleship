const main = require('./index.js');

let shipp = main.Ship(3);
shipp.hit();
shipp.hit();
shipp.hit();

test('test ship functions', () => {
    expect(shipp.isSunk()).toBe(true);
});

let gb = main.Gameboard();
gb.placeShip(8, 8, 1, 3);
gb.placeShip(8, 7, 1, 3);
gb.placeShip(8, 7, 1, 3);
gb.placeShip(9, 9, 1, 3);
gb.placeShip(7, 7, 1, 3);
gb.placeShip(8, 1, 0, 3);
gb.placeShip(5, 1, 0, 3);

test('test ship placement & attack', () => {
    expect(gb.receiveAttack(8, 7)).toBe('Hit!');
    expect(gb.receiveAttack(8, 7)).toBe('Invalid move');
    expect(gb.receiveAttack(8, 6)).toBe('Miss');
    expect(gb.receiveAttack(8, 9)).toBe('Hit!');
    expect(gb.receiveAttack(8, 8)).toBe('Hit! Ship sunk!');
    expect(gb.receiveAttack(9, 9)).toBe('Miss');
    expect(gb.receiveAttack(7, 7)).toBe('Miss');
    expect(gb.receiveAttack(8, 1)).toBe('Miss');
    expect(gb.receiveAttack(5, 5)).toBe('Miss');
    expect(gb.receiveAttack(5, 1)).toBe('Hit!');
})

test('test whether game is over', () => {
    expect(gb.ifOver()).toBe(false);
    expect(gb.receiveAttack(7, 1)).toBe('Hit!');
    expect(gb.receiveAttack(6, 1)).toBe('Hit! Ship sunk!');
    expect(gb.ifOver()).toBe(true);
})

let player = main.Player(true);
player.board.placeShip(8, 8, 1, 3);
player.board.placeShip(7, 7, 1, 3);

test('test player class', () => {
    expect(player.board.receiveAttack(8, 8)).toBe('Miss');
    expect(player.board.receiveAttack(7, 8)).toBe('Hit!');
    expect(player.board.receiveAttack(7, 9)).toBe('Hit!');
    expect(player.board.receiveAttack(7, 6)).toBe('Miss');
    expect(player.board.receiveAttack(7, 7)).toBe('Hit! Ship sunk!');
    expect(player.board.receiveAttack(7, 7)).toBe('Invalid move');
    expect(player.getName()).toBe('Player');
})
