let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
function show() {
  const board = document.getElementById('board');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = pattern[i][j];
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = value === 2 ? 'X' : value === 1 ? 'O' : '';
      board.appendChild(cell);
    }
    board.appendChild(document.createElement('br'));
  }
}

show();
