import gameBoardFactory from './gameBoardFactory';

export default function computerFactory(name = 'Computer') {
  const computerName = name;
  const gameBoard = gameBoardFactory();

  const getName = () => computerName;

  const availableMoves = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      availableMoves.push([i, j]);
    }
  }

  const makeMove = () => {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const [randomMove] = availableMoves.splice(randomIndex, 1);
    return randomMove;
  };

  const takeTurn = (enemy) => {
    const [x, y] = makeMove();
    enemy.receiveAttack(x, y);
  };

  return {
    ...gameBoard,
    getName,
    makeMove,
    takeTurn,
  };
}
