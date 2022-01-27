// let pattern = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

// let color = 1;

// function render() {
//   const board = document.getElementById('board');
//   board.innerHTML = '';
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       const cellValue = pattern[i][j];
//       const cell = document.createElement('div');
//       cell.classList.add('cell');
//       cell.innerText = cellValue === 2 ? 'X' : cellValue === 1 ? 'O' : '';
//       cell.addEventListener('click', () => setCellValue(i, j))
//       board.appendChild(cell);
//     }
//     board.appendChild(document.createElement('br'));
//   }
// }

// // 落子
// function setCellValue(i, j) {
//   pattern[i][j] = color;
//   if (checkWinOrLose()) {
//     alert(`${color === 2 ? 'X' : color === 1 ? 'O' : ''} is winner!`)
//   }
//   color = 3 - color;
//   render();
// }

// // 检查胜负
// function checkWinOrLose() {
//   // 三横
//   for (let i = 0; i < 3; i++) {
//     let win = true;
//     for (let j = 0; j < 3; j++) {
//       if (pattern[i][j] !== color) {
//         win = false;
//       }
//     }
//     if (win) {
//       return win;
//     }
//   }

//   // 三纵
//   for (let i = 0; i < 3; i++) {
//     let win = true;
//     for (let j = 0; j < 3; j++) {
//       if (pattern[j][i] !== color) {
//         win = false;
//       }
//     }
//     if (win) {
//       return win;
//     }
//   }

//   // 两斜
//   // 正斜线 /
//   {
//     let win = true;
//     for (let i = 0; i < 3; i++) {
//       if (pattern[i][2 - i] !== color) {
//         win = false;
//       }
//     }
//     if (win) {
//       return win;
//     }
//   }
//   // 反斜线 \
//   {
//     let win = true;
//     for (let i = 0; i < 3; i++) {
//       if (pattern[i][i] !== color) {
//         win = false;
//       }
//     }
//     if (win) {
//       return win;
//     }
//   }
//   return false;
// }

// render();

let pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let color = 1;

function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cellValue = pattern[i * 3 + j];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = cellValue === 2 ? "X" : cellValue === 1 ? "O" : "";
      cell.addEventListener("click", () => setCellValue(i, j));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}

// 落子
function setCellValue(i, j) {
  pattern[i * 3 + j] = color;
  if (checkWinOrLose()) {
    alert(`${color === 2 ? "X" : color === 1 ? "O" : ""} is winner!`);
  }
  color = 3 - color;
  render();
}

// 检查胜负
function checkWinOrLose() {
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

render();
