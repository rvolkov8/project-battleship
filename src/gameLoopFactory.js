import domManipulatorFactory from './domManipulatorFactory';
import playerFactory from './playerFactory';
import computerFactory from './computerFactory';

export default function gameLoopFactory() {
  const playerGrid = document.querySelector('.player-grid');
  const computerGrid = document.querySelector('.computer-grid');

  const domManipulator = domManipulatorFactory();
  const player = playerFactory();
  const computer = computerFactory();
  let turnIsInProcess = false;

  const startGame = () => {
    domManipulator.showPlayerTurnText(player);
    player.placeShipsRandomly();
    computer.placeShipsRandomly();
    domManipulator.renderGameBoard(player, playerGrid);
    domManipulator.renderGameBoard(computer, computerGrid);
    domManipulator.addClickListener(computerGrid, async (x, y) => {
      if (!turnIsInProcess) {
        turnIsInProcess = true;
        player.takeTurn(computer, x, y);
        domManipulator.renderGameBoard(computer, computerGrid);
        computer.takeTurn(player);
        domManipulator.showPlayerTurnText(computer);
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000)); // add a 1 sec delay
        domManipulator.showPlayerTurnText(player);
        domManipulator.renderGameBoard(player, playerGrid);
        if (player.allShipsSunk()) {
          domManipulator.showWinner(computer);
        }
        if (computer.allShipsSunk()) {
          domManipulator.showWinner(player);
        }
        turnIsInProcess = false;
      }
    });
  };

  const resetGame = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return { startGame, resetGame };
}
