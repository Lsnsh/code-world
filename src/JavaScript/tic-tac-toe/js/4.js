let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let color = 1;

function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cellValue = pattern[i][j];
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = cellValue === 2 ? 'X' : cellValue === 1 ? 'O' : '';
      cell.addEventListener('click', () => setCellValue(i, j))
      board.appendChild(cell);
    }
    board.appendChild(document.createElement('br'));
  }
}

// 落子
function setCellValue(i, j) {
  pattern[i][j] = color;
  render();
  if (checkWinOrLose(pattern, color)) {
    alert(`${color === 2 ? 'X' : color === 1 ? 'O' : ''} is winner!`)
    // 游戏结束
    return;
  }
  color = 3 - color;
  if (predictWin(pattern, color)) {
    alert(`${color === 2 ? 'X' : color === 1 ? 'O' : ''} will win!`)
  }
}

// 检查胜负
function checkWinOrLose(pattern, color) {
  // 三横
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  // 三纵
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  // 两斜
  // 正斜线 /
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i][2 - i] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }
  // 反斜线 \
  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i][i] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }
  return false;
}

// 即将落子方胜负预判
function predictWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 跳过已经落子的位置
      if (pattern[i][j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      if (checkWinOrLose(temp, color)) {
        // return true;
        return [i, j];
      }
    }
  }
  return false;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

render();
