const board = document.getElementById("board");
const message = document.getElementById("message");
let currentPlayer = "X";
let cells = [];

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(index) {
  if (cells[index].textContent === "") {
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");
    if (checkWin()) {
      message.textContent = `🎉 Player ${currentPlayer} wins!`;
      highlightWinningCells();
      endGame();
    } else if (checkDraw()) {
      message.textContent = "🤝 It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.find(pattern => {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return true;
    }
    return false;
  });
}

function highlightWinningCells() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      break;
    }
  }
}

function checkDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function endGame() {
  cells.forEach(cell => cell.classList.add("taken"));
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
}

createBoard();
