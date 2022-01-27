// let pattern = [
//   [2, 0, 0],
//   [0, 1, 0],
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

// function setCellValue(i, j) {
//   pattern[i][j] = color;
//   color = 3 - color;
//   render();
// }

// render();

let pattern = [2, 0, 0, 0, 1, 0, 0, 0, 0];

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

function setCellValue(i, j) {
  pattern[i * 3 + j] = color;
  color = 3 - color;
  render();
}

render();
