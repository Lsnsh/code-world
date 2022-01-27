let pattern, color;

function init() {
  pattern = [0, 0, 0, 0, 1, 0, 0, 0, 0];
  color = 2;
}

function render() {
  const board = document.getElementById("board");
  // 绘制前，清空棋盘
  board.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cellValue = pattern[i * 3 + j];
      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.innerText = cellValue === 2 ? "X" : cellValue === 1 ? "O" : "";
      cell.addEventListener("click", () => userSetCellValue(i, j));

      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }

  document.getElementById("action").addEventListener("click", () => {
    init();
    render();
  });
}

// 落子
function userSetCellValue(i, j) {
  pattern[i * 3 + j] = color;
  render();
  if (checkWinOrLose(pattern, color)) {
    alert(`${color === 2 ? "X" : color === 1 ? "O" : ""} is winner!`);
    // 游戏结束
    return;
  }
  color = 3 - color;
  computerSetCellValue();
}

// 电脑落子
function computerSetCellValue() {
  let choice = bestChoice(pattern, color);
  if (choice.point) {
    pattern[choice.point[0] * 3 + choice.point[1]] = color;
    render();
    if (checkWinOrLose(pattern, color)) {
      alert(`${color === 2 ? "X" : color === 1 ? "O" : ""} is winner!`);
      // 游戏结束
      return;
    }
    color = 3 - color;
  }
}

// 检查胜负
function checkWinOrLose(pattern, color) {
  let win = false;

  // 三横
  for (let i = 0; i < 3; i++) {
    win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  // 三纵
  for (let i = 0; i < 3; i++) {
    win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j * 3 + i] !== color) {
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
    win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + 2 - i] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  // 反斜线 \
  {
    win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + i] !== color) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }
  return false;
}

// 模拟落子（一层）
function predictWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 跳过已经落子的位置
      if (pattern[i * 3 + j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i * 3 + j] = color;
      if (checkWinOrLose(temp, color)) {
        return [i, j];
      }
    }
  }
  return null;
}

// 最佳选择（递归）
function bestChoice(pattern, color) {
  let point = predictWin(pattern, color);
  if (point) {
    return {
      color: color,
      point: point,
      result: 1,
    };
  }

  // 起步结果
  let result = -2;
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 跳过已经落子的位置
      if (pattern[i * 3 + j]) {
        continue;
      }
      let temp = clone(pattern);
      temp[i * 3 + j] = color;
      // 根据「对手方」目前情况下未来「最好的结果」，换位得出我方「最差的结果」（-r）
      let r = bestChoice(temp, 3 - color).result;
      // 比较后更新落子位置和结果
      if (-r >= result) {
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
    color: color,
    point: point,
    result: point ? result : 0,
  };
}

function clone(value) {
  return Object.create(value);
}

init();
render();
