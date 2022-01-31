const prompts = require('prompts');

const symbol = {
  x: 'X',
  o: 'O',
  empty: ' '
}

const displayRow = row => {
  console.log(`${row[0]}|${row[1]}|${row[2]}`);
}

const displayBoard = board => {
  displayRow(board[0]);
  console.log('-+-+-');
  displayRow(board[1]);
  console.log('-+-+-');
  displayRow(board[2]);
};

const checkWinner = (sym, board) => {
  const cols = [
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
  ];

  const diags = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  if (board.some(row => row.join('') === sym.repeat(3))) {
    return true;
  } else if (cols.some(col => col.join('') === sym.repeat(3))) {
    return true;
  } else if (diags.some(diag => diag.join('') === sym.repeat(3))) {
    return true;
  } else {
    return false;
  }
};

const checkFull = board => board.every(row => row.every(place => place !== symbol.empty));

const playMove = (pos, sym, board) => {
  if (pos === 1) {
    return [
      [sym, board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 2) {
    return [
      [board[0][0], sym, board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 3) {
    return [
      [board[0][0], board[0][1], sym],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 4) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [sym, board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 5) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], sym, board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 6) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], sym],
      [board[2][0], board[2][1], board[2][2]],
    ]
  } else if (pos === 7) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [sym, board[2][1], board[2][2]],
    ]
  } else if (pos === 8) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], sym, board[2][2]],
    ]
  } else if (pos === 9) {
    return [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], sym],
    ]
  } else {
    return board;
  }
};

const playGame = async (board, currentSym) => {
  displayBoard(board);
  
  if (checkWinner(symbol.x, board)) {
    console.log(`${symbol.x} wins!`);
    return;
  } else if (checkWinner(symbol.o, board)) {
    console.log(`${symbol.o} wins!`);
    return;
  } else if (checkFull(board)) {
    console.log('Tie game.');
    return;
  }

  const response = await prompts({
    type: 'number',
    name: 'pos',
    message: 'Where do you want to play?',
    validate: value => value >= 1 && value <= 9
  });

  const newBoard = playMove(response.pos, currentSym, board);

  const nextSym = currentSym === symbol.x ? symbol.o : symbol.x;
  playGame(newBoard, nextSym);
};

const startingBoard = [
  [symbol.empty, symbol.empty, symbol.empty],
  [symbol.empty, symbol.empty, symbol.empty],
  [symbol.empty, symbol.empty, symbol.empty]
];
playGame(startingBoard, symbol.x);
