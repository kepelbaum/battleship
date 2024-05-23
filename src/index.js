function Ship (length) {
    let len = length;
    let hits = 0;
    // let getLength = () => len;
    let hit = () => hits++;
    let isSunk = () => hits >= length;
    return {hit, isSunk}
}

function Gameboard () {
    let matrix = [[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],
    [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]; //column by column
    let shipsLeft = 0;
    let dir = 0; //for manual placement
    let seeMatrix = () => matrix;
    let placeShip = (x, y, dir, len) => { //horizontal = 0, vertical = 1 for direction
        if (checkLegal(x, y, dir, len)) {
            let ship = Ship(len);
            shipsLeft++;
            if (dir === 1) {
                for (let i = 0; i < len; i++) {
                    matrix[x][y + i].push(ship);
                }
            }
            else {
                for (let i = 0; i < len; i++) {
                    matrix[x + i][y].push(ship);
                }
            }
        }
     }
    let seeDir = () => dir;
    let switchDir = () => {
       dir = (dir === 0 ? 1 : 0);
    }
    let checkLegal = (x, y, dir, len) => {
        if (dir === 1) {
            if (y + len - 1 > 9) {
                return false;
            }
            else {
                let minx = Math.max(0, x - 1);
                let miny = Math.max(0, y - 1);
                let maxx = Math.min(9, x + 1);
                let maxy = Math.min(9, y + len);
                for (let i = minx; i <= maxx; i++) {
                    for (let j = miny; j <=maxy; j++) {
                        if (matrix[i][j].length > 1) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        else {
            if (x + len - 1 > 9) {
                return false;
            }
            else {
                let minx = Math.max(0, x - 1);
                let miny = Math.max(0, y - 1);
                let maxx = Math.min(9, x + len);
                let maxy = Math.min(9, y + 1);
                for (let i = minx; i <= maxx; i++) {
                    for (let j = miny; j <=maxy; j++) {
                        if (matrix[i][j].length > 1) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
    }
    let receiveAttack = (x, y) => {
        if (matrix[x][y][0] > 0) {
            return 'Invalid move';
        }
        else if (matrix[x][y].length === 1) {
            matrix[x][y][0] = 2;
            return 'Miss';
        }
        else {
            matrix[x][y][0] = 1;
            matrix[x][y][1].hit();
            if (matrix[x][y][1].isSunk()) {
                shipsLeft--;
                return 'Hit! Ship sunk!';
            }
            else {
                return 'Hit!';
            }
        }
    }
    let autoTurn = () => {
        let arr = [];
        for (x = 0; x < 10; x++) {
            for (y = 0; y < 10; y++) {
                if (matrix[x][y][0] === 0) {
                    arr.push([x, y]);
                }
            }
        }
        let rand = Math.floor(Math.random() * arr.length);
        return receiveAttack(arr[rand][0], arr[rand][1]);
    }
    let ifOver = () => shipsLeft === 0 ? true : false;
    let reveal = () => {
        for (x = 0; x < 10; x++) {
            for (y = 0; y < 10; y++) {
                if (matrix[x][y][0] === 0 && matrix[x][y].length > 1) {
                    matrix[x][y][0] = -1;
                }
            }
        }
    }
    let randomize = () => {
    nullify();
    function placeRandom(size) {
        let rone = Math.floor(Math.random() * 10);
        let rtwo = Math.floor(Math.random() * 10);
        let rdir = Math.floor(Math.random() * 2);
        if (checkLegal(rone, rtwo, rdir, size)) {
            placeShip(rone, rtwo, rdir, size);
        }
        else {
            placeRandom(size);
        }
    }
    placeRandom(4);
    placeRandom(3);
    placeRandom(3);
    placeRandom(2);
    placeRandom(2);
    placeRandom(2);
    placeRandom(1);
    placeRandom(1);
    placeRandom(1);
    placeRandom(1);
    }
    const nullify = () => {
        matrix = [[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],
    [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]; 
        shipsLeft = 0;
    }
    const seeLeft = () => shipsLeft;
    return {placeShip, receiveAttack, ifOver, seeMatrix, autoTurn, reveal, randomize, nullify, seeLeft, checkLegal, seeDir, switchDir};
}

function Player (bool) { /*true for human, false for AI*/
    let name = bool === true ? 'Player' : 'Computer';
    let getName = () => name;
    let board = Gameboard();
    return {getName, board};
}

module.exports = {
    Ship,
    Gameboard,
    Player
}

let player = Player(true);
let computer = Player(false);

// player.board.placeShip(0, 1, 0, 3);
// player.board.placeShip(5, 1, 0, 2);
// player.board.placeShip(9, 1, 0, 1);
// player.board.placeShip(0, 6, 0, 2);
// player.board.placeShip(0, 9, 0, 2);
// player.board.placeShip(7, 5, 0, 1);
// player.board.placeShip(9, 5, 0, 1);
// player.board.placeShip(7, 8, 0, 1);
// player.board.placeShip(3, 3, 1, 4);
// player.board.placeShip(9, 7, 1, 3);
// player.board.receiveAttack(2, 1);
// player.board.receiveAttack(8, 8);

player.board.randomize();
computer.board.randomize();


// computer.board.placeShip(0, 1, 0, 3);
// computer.board.placeShip(5, 1, 0, 2);
// computer.board.placeShip(9, 1, 0, 1);
// computer.board.placeShip(0, 6, 0, 2);
// computer.board.placeShip(0, 8, 0, 2);
// computer.board.placeShip(7, 5, 0, 1);
// computer.board.placeShip(9, 5, 0, 1);
// computer.board.placeShip(7, 8, 0, 1);
// computer.board.placeShip(3, 3, 1, 4);
// computer.board.placeShip(9, 7, 1, 3);
// computer.board.receiveAttack(2, 1);
// computer.board.receiveAttack(8, 8);
// computer.board.receiveAttack(5, 5);

function Display () {
    let toggle = -1; /* turn toggle; 0 = player turn, 1 = computer turn, -1 = game not started; 2 = game over, -2 = manual mode */
    let main = document.querySelector('.container');
    main.setAttribute('style', 'display: flex; justify-content: space-around; align-items: center; height: 80vh;')
    let one = document.createElement('div');
    let two = document.createElement('div');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelector('.buttons');
    let align = document.querySelector('.alignment');
    async function refresh () {
        main.textContent = '';
        one.textContent = '';
        two.textContent = '';
        buttons.textContent = '';
        align.textContent = '';
        let len;
        function setLength () {
            if (player.board.seeLeft() === 0) {
                len = 4;
                screen.textContent = 'Place 4-tile ship';
            }
            else if (player.board.seeLeft() < 3) {
                len = 3;
                screen.textContent = 'Place 3-tile ship';
            }
            else if (player.board.seeLeft() < 6) {
                len = 2;
                screen.textContent = 'Place 2-tile ship';
            } 
            else if (player.board.seeLeft() < 10) {
                len = 1;
                screen.textContent = 'Place 1-tile ship';
            }
            else {
                len = 0;
                toggle = -1;
                screen.textContent = 'Ships placed';
            }
        }
        if (toggle === -2) {
            setLength();
            if (toggle === -2) {
                 let div = document.createElement('div');
                 div.textContent = (player.board.seeDir() === 0 ? 'Ship alignment: Horizontal' : 'Ship alignment: Vertical');
                let chdir = document.createElement('button');
                chdir.textContent = 'Reverse ship alignment';
                chdir.addEventListener('click', () => {
                    player.board.switchDir();
                    refresh();
                })
                buttons.appendChild(chdir);
                align.appendChild(div);
            }
        }
        for (let i = 0; i < 10; i++) {
            let bigdiv = document.createElement('div');
            bigdiv.setAttribute('style', 'display: flex; flex-direction: column;');
            for (let j = 0; j < 10; j++) {
                let div = document.createElement('div');
                div.setAttribute('style', 'background-color: azure; border: 1px solid black; width: 20px; height: 20px;');
                if (player.board.seeMatrix()[i][j].length > 1) {
                    div.setAttribute('style', 'background-color: gray; border: 1px solid black; width: 20px; height: 20px;');
                    if (player.board.seeMatrix()[i][j][0] > 0) {
                        if (player.board.seeMatrix()[i][j][1].isSunk()) {
                            div.setAttribute('style', 'background-color: red; border: 1px solid black; width: 20px; height: 20px');
                        }
                        else {
                            div.setAttribute('style', 'background-color: orange; border: 1px solid black; width: 20px; height: 20px');
                        }
                    }
                }
                else if (player.board.seeMatrix()[i][j][0] > 0) {
                    div.setAttribute('style', 'background-color: lightblue; border: 1px solid black; width: 20px; height: 20px');
                }
                    div.addEventListener('click', () => {
                        if (toggle === -2) {
                            player.board.placeShip(i, j, player.board.seeDir(), len);
                            refresh();
                        }
                    })

                    bigdiv.appendChild(div);
                }
                
                one.appendChild(bigdiv);     
        }
        one.setAttribute('style', 'display: flex;');
        main.appendChild(one);
        
        for (let i = 0; i < 10; i++) {
            let bigdiv = document.createElement('div');
            bigdiv.setAttribute('style', 'display: flex; flex-direction: column;');
            for (let j = 0; j < 10; j++) {
                let div = document.createElement('div');
                div.setAttribute('style', 'background-color: azure; border: 1px solid black; width: 20px; height: 20px;');
                if (computer.board.seeMatrix()[i][j].length > 1 && computer.board.seeMatrix()[i][j][0] > 0)  {
                        if (computer.board.seeMatrix()[i][j][1].isSunk()) {
                            div.setAttribute('style', 'background-color: red; border: 1px solid black; width: 20px; height: 20px');
                        }
                        else {
                            div.setAttribute('style', 'background-color: orange; border: 1px solid black; width: 20px; height: 20px');
                        }
                }
                else if (computer.board.seeMatrix()[i][j][0] > 0) {
                    div.setAttribute('style', 'background-color: lightblue; border: 1px solid black; width: 20px; height: 20px');
                }
                else if (computer.board.seeMatrix()[i][j][0] < 0) {
                    div.setAttribute('style', 'background-color: green; border: 1px solid black; width: 20px; height: 20px;');
                }
                div.addEventListener('click', () => {
                    if (toggle === 0) {
                        let result = computer.board.receiveAttack(i, j);
                        if (result === 'Miss') {
                            toggle = 1;
                            screen.textContent = 'Player missed! \n\nComputer Turn!';
                        }
                        else if (result === 'Hit!') {
                            screen.textContent = 'Player hit a ship! \nPlayer Turn!';
                        }
                        else if (result === 'Hit! Ship sunk!') {
                            if (computer.board.ifOver()) {
                                screen.textContent = 'Player sunk a ship! \nGAME OVER! \nYou win! ...this time.';
                                toggle = 2;
                            }
                            else {
                                screen.textContent = 'Player sunk a ship! \nPlayer Turn!';
                            }
                        }
                        refresh();
                    }
                });
                    bigdiv.appendChild(div);    
                }
                
                two.appendChild(bigdiv);     
        
            }
        two.setAttribute('style', 'display: flex');
        main.appendChild(two);
        if (toggle === 1) {
            function computerMoves () {
                    let move = player.board.autoTurn();
                    if (move === 'Miss') {
                        toggle = 0;
                        screen.textContent = 'Computer missed! \nPlayer Turn!';
                    }
                    else if (move === 'Hit!') {
                        screen.textContent = 'Computer hit a ship! \nComputer Turn!';
                    }
                    else if (move === 'Hit! Ship sunk!') {
                        if (player.board.ifOver()) {
                            screen.textContent = 'Computer sunk a ship! \nGAME OVER! \nYOU LOSE!';
                            toggle = 2;
                            computer.board.reveal();
                        }
                        else {
                            screen.textContent = 'Computer sunk a ship! \nComputer Turn!';
                        }
                    }
                    refresh();
                }
            
            setTimeout(computerMoves, 2000);
        }
        else if (toggle === -1) {
            let random = document.createElement('button');
            let manual = document.createElement('button');
            let begin = document.createElement('button');
            random.textContent = 'Randomize Board';
            manual.textContent = 'Manual Placement';
            begin.textContent = 'Begin!';
            random.addEventListener('click', () => {
                player.board.randomize();
                refresh();
            });
            begin.addEventListener('click', () => {
                toggle++;
                screen.textContent = 'Player Turn!';
                refresh();
            })
            manual.addEventListener('click', () => {
                player.board.nullify();
                toggle = -2;
                refresh();
            })
            buttons.appendChild(random);
            buttons.appendChild(begin);
            buttons.appendChild(manual);
        }
    }  
    return {refresh};
}

let display = Display();

display.refresh();


