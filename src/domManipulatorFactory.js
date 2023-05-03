export default function domManipulatorFactory() {
  const messageText = document.querySelector('.turn-message-text');
  const winnerContainer = document.querySelector('.winner-container');
  const winnerText = document.querySelector('.winner-text');

  const setPlayerName = (player, nameElement) => {
    // eslint-disable-next-line no-param-reassign
    nameElement.textContent = player.getName();
  };

  const toggleWinnerContainer = () => {
    if (winnerContainer.style.display === 'none') {
      winnerContainer.style.display = 'flex';
    } else if (winnerContainer.style.display === 'flex') {
      winnerContainer.style.display = 'none';
    }
  };

  const renderGameBoard = (player, boardElement) => {
    winnerContainer.style.display = 'none';
    while (boardElement.firstChild) {
      boardElement.removeChild(boardElement.firstChild);
    }
    const { board } = player;
    for (let i = 0; i < board.length; i += 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < board[i].length; j += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        if (board[i][j].hasBeenHit === true) {
          cell.classList.add('hit');
        }
        if (player.includesArr(player.getMissedHits(), [i, j])) {
          cell.classList.add('missed');
        }
        if (player.getName() !== 'Computer') {
          if (
            // eslint-disable-next-line operator-linebreak
            board[i][j].hasShip === true &&
            board[i][j].hasBeenHit === false
          ) {
            cell.classList.add('has-ship');
          }
        }
        row.append(cell);
      }
      boardElement.append(row);
    }
  };

  const addClickListener = (boardElement, callback) => {
    boardElement.addEventListener('click', (event) => {
      const cell = event.target.closest('.cell');
      if (cell) {
        if (
          // eslint-disable-next-line operator-linebreak
          !cell.classList.contains('missed') &&
          !cell.classList.contains('hit')
        ) {
          const row = parseInt(cell.dataset.row, 10);
          const col = parseInt(cell.dataset.col, 10);
          callback(row, col);
        }
      }
    });
  };

  const showPlayerTurnText = (player) => {
    messageText.textContent = `It is ${player.getName()}'s turn!`;
  };

  const showWinner = (player) => {
    toggleWinnerContainer();
    winnerText.textContent = `${player.getName()} wins!`;
  };

  return {
    setPlayerName,
    showPlayerTurnText,
    renderGameBoard,
    addClickListener,
    showWinner,
    toggleWinnerContainer,
  };
}
