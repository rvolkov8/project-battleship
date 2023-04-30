import gameBoardFactory from './gameBoardFactory';

export default function playerFactory(name = 'Player') {
  const playerName = name;
  const gameBoard = gameBoardFactory();

  const getName = () => playerName;

  const takeTurn = (enemy, x, y) => {
    enemy.receiveAttack(x, y);
  };

  return {
    ...gameBoard,
    getName,
    takeTurn,
  };
}
