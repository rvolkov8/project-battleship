import computerFactory from '../src/computerFactory';
import playerFactory from '../src/playerFactory';

describe('Create a computer player', () => {
  test('Computer player is created with default name', () => {
    const computerPlayer = computerFactory();
    expect(computerPlayer.getName()).toBe('Computer');
  });
  test('Computer player is created with default game board', () => {
    const computerPlayer = computerFactory();
    const expectedBoard = [];
    const oneRow = [];
    const oneCell = { hasShip: false, hasBeenHit: false };
    for (let i = 0; i < 10; i += 1) {
      oneRow.push(oneCell);
    }
    for (let i = 0; i < 10; i += 1) {
      expectedBoard.push(oneRow);
    }
    expect(computerPlayer.board).toEqual(expectedBoard);
  });
});

describe('Computer makes move', () => {
  test('computerPlayer selects random legal move', () => {
    const computerPlayer = computerFactory();
    const availableMoves = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        availableMoves.push([i, j]);
      }
    }
    const firstMove = computerPlayer.makeMove();
    expect(availableMoves).toContainEqual(firstMove);

    const previousMoves = [firstMove];
    for (let i = 0; i < 5; i += 1) {
      const turn = computerPlayer.makeMove();
      expect(availableMoves).toContainEqual(turn);
      expect(previousMoves).not.toContainEqual(turn);
      previousMoves.push(turn);
    }
  });
});

describe('Computer takes turn', () => {
  test('Computer attacks', () => {
    const computerPlayer = computerFactory();
    const playerTwo = playerFactory();
    expect(playerTwo.getMissedHits()).toHaveLength(0);
    computerPlayer.takeTurn(playerTwo);
    expect(playerTwo.getMissedHits().length).toBeGreaterThanOrEqual(1);
  });
});
