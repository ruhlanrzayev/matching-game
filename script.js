const table = document.querySelector('#game');
const resultText = document.querySelector('.result-text');
const score = document.querySelector('#score');

let scr = 0;
let count = 0;
let code = '';
let arr = [];
let first = [];
let matrix = [];

// Push elements to array
for (let i = 1; i <= 8; i++) {
    arr.push(i);
    arr.push(i);
}

// Create Game
createMatrix();
createTable();

// Create Matrix for identify table row and col
function createMatrix() {
    arr.sort(() => Math.random() - 0.5);
    x = 0;
    matrix = []; 

    for (let i = 0; i < 4; i++) {
        matrix[i] = [];
        for (let j = 0; j < 4; j++) {
            matrix[i][j] = arr[x++];
        }
    }
}

// Create game table
function createTable() {
    code = '';
    for (let i = 0; i < 4; i++) {
        code += `<tr>`;
        for (let j = 0; j < 4; j++) {
            code += `<td id="x${i}${j}" onclick="show(${i}, ${j})" style="background-image: url('assets/${matrix[i][j]}.png')"></td>`;
        }
        code += `</tr>`;
    }
    game.innerHTML = code; 
}

score.innerHTML = `<h1>Your Score : ${scr}</h1>`;

// Turn image back in 2.5 seconds
setTimeout(turnBack, 2500);

// Identify turnBack() function
function turnBack() {
    const tableItem = document.querySelectorAll('td');
    for (const elm of tableItem) {
        elm.style.backgroundImage = `url('assets/0.png')`;
    }
}

let locked = [];

function show(i, j) {
    const cell = document.getElementById(`x${i}${j}`);

    if (first.length && (i === first[0] && j === first[1]) || locked.some(e => e[0] === i && e[1] === j)) return;

    cell.style.backgroundImage = `url('assets/${matrix[i][j]}.png')`;

    if (first.length) {
        if (matrix[i][j] !== matrix[first[0]][first[1]]) {
            setTimeout(function () {
                const prev = document.getElementById(`x${first[0]}${first[1]}`);
                prev.style.backgroundImage = `url('assets/0.png')`;
                cell.style.backgroundImage = `url('assets/0.png')`;
                first = [];
            }, 1000);
        } else {
            locked.push([i, j], [first[0], first[1]]);
            first = [];
            count++;

            if (count == 8) {
                resultText.innerHTML = `
                <h1>You Won!</h1>
                <button onclick="playAgain()">Play Again</button>
                `;
                scr++;
                score.innerHTML = `<h1>Your Score : ${scr}</h1>`;
            }
        }
    } else {
        first = [i, j];
    }
}


// Identify playAgain function
function playAgain() {
    resultText.innerHTML = '';
    count = 0;
    locked = [];
    createMatrix();
    createTable();
    setTimeout(turnBack, 2000);
}
