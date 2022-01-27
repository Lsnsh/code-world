let pattern = [
  [0, 0, 0],
  [0, 1, 0],
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
  if (checkWinOrLose(pattern, color)) {
    alert(`${color === 2 ? 'X' : color === 1 ? 'O' : ''} is winner!`)
  }
  color = 3 - color;
  render();
  if (predictWin(pattern, color)) {
    console.log(`${color === 2 ? 'X' : color === 1 ? 'O' : ''} will win!`)
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
        return [i, j];
      }
    }
  }
  return null;
}

// 局面胜负预判
function bestChoice(pattern, color) {
  let point = null;
  if (point = predictWin(pattern, color)) {
    return {
      point: point,
      result: 1
    }
  }

  // 我方目前「最坏的结果」，从-2起步
  let result = -2; // -1=>输 | 0=>和 | 1=>赢
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 跳过已经落子的位置
      if (pattern[i][j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i][j] = color;
      // 根据「对方」目前情况下未来「最好的结果」，换位得出「我方的结果」（-r）
      let r = bestChoice(temp, 3 - color).result;
      // 如果换位得出的结果，比当前我方最坏的结果（result = -2）更好的话
      if (-r >= result) {
        // 更新我方目前最坏的结果，通过逆推的方式直到找到我方最好的结果
        // 逆推：我方在每个能落子位置的落子后，通过递归调用bestChoice方法，找到对方最好的结果，直到棋盘上所有能落子的位置都尝试一遍为止
        result = -r;
        point = [i, j];
      }
      // 剪枝
      if (result === 1) {
        break outer;
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

render();
console.log(bestChoice(pattern, 3 - color));

