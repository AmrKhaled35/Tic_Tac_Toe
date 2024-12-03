const cells = document.querySelectorAll('.cell');
const titleHeader = document.getElementById('gameTitle');
const XPlayer = document.getElementById('XPlayer');
const OPlayer = document.getElementById('OPlayer');
const boardElement = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
const XScore = document.getElementById('XScore');
const OScore = document.getElementById('OScore');

let board = Array(25).fill('');
let player = 'X';
let pause = false;
let game = false;
let XWins = 0;
let OWins = 0;
let moves = 0;
let scoredLines = [];
let maxTurnsPerPlayer = 12;
let xTurns = 0; 
let oTurns = 0; 

function tapCell(cell, i) {
  if (cell.textContent === '' && !pause) {
    game = true;
    moves++;
    update(cell, i);
    if (player === 'X') xTurns++;
    else oTurns++;

    checkStraightWins();
    if (xTurns >= maxTurnsPerPlayer && oTurns >= maxTurnsPerPlayer) {
      declareWinner();
    } else {
      PlayerSwap();
    }
  }
}

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    tapCell(cell, i);
  });
});

function update(cell, i) {
  cell.textContent = player;
  board[i] = player;
  cell.style.color = player === 'X' ? '#1892EA' : '#A737FF';
}

function PlayerSwap() {
  player = player === 'X' ? 'O' : 'X';
  titleHeader.textContent = `${player}'s Turn`;
}

function checkStraightWins() {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col <= 2; col++) {
      const line = [row * 5 + col, row * 5 + col + 1, row * 5 + col + 2];
      if (isNewScorableLine(line)) {
        highlightCells(line);
        updateScore();
        scoredLines.push(line);
      }
    }
  }
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row <= 2; row++) {
      const line = [row * 5 + col, (row + 1) * 5 + col, (row + 2) * 5 + col];
      if (isNewScorableLine(line)) {
        highlightCells(line);
        updateScore();
        scoredLines.push(line);
      }
    }
  }
  for (let row = 0; row <= 2; row++) {
    for (let col = 0; col <= 2; col++) {
      const mainDiagonal = [row * 5 + col, (row + 1) * 5 + col + 1, (row + 2) * 5 + col + 2];
      if (isNewScorableLine(mainDiagonal)) {
        highlightCells(mainDiagonal);
        updateScore();
        scoredLines.push(mainDiagonal);
      }
      if (col >= 2) {
        const antiDiagonal = [row * 5 + col, (row + 1) * 5 + col - 1, (row + 2) * 5 + col - 2];
        if (isNewScorableLine(antiDiagonal)) {
          highlightCells(antiDiagonal);
          updateScore();
          scoredLines.push(antiDiagonal);
        }
      }
    }
  }
}

function isNewScorableLine(line) {
  return (
    line.every((index) => board[index] === player) &&
    !scoredLines.some((scoredLine) =>
      scoredLine.every((index) => line.includes(index))
    )
  );
}

function highlightCells(indices) {
  indices.forEach((i) => {
    cells[i].style.backgroundColor = '#2A2343';
  });
}

function updateScore() {
  if (player === 'X') {
    XWins++;
    XScore.textContent = `X : ${XWins}`;
  } else {
    OWins++;
    OScore.textContent = `O : ${OWins}`;
  }
}

function declareWinner() {
  pause = true;
  restartBtn.style.display = 'block';
  if (XWins > OWins) {
    titleHeader.textContent = 'X Wins!';
  } else if (OWins > XWins) {
    titleHeader.textContent = 'O Wins!';
  } else {
    titleHeader.textContent = 'It\'s a Draw!';
  }
}

restartBtn.addEventListener('click', () => {
  pause = false;
  game = false;
  board = Array(25).fill('');
  player = 'X';
  moves = 0;
  xTurns = 0;
  oTurns = 0;
  scoredLines = [];
  XWins = 0;
  OWins = 0;
  titleHeader.textContent = 'Tic Tac Toe';
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.backgroundColor = '';
  });
  XScore.textContent = 'X: 0';
  OScore.textContent = 'O: 0';
});

function choose(select) {
  if (!game) {
    player = select;
    if (player === 'X') {
      XPlayer.classList.add('Player-active');
      OPlayer.classList.remove('Player-active');
    } else {
      XPlayer.classList.remove('Player-active');
      OPlayer.classList.add('Player-active');
    }
  }
}
