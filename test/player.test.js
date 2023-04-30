import playerFactory from '../src/playerFactory';
import shipFactory from '../src/shipFactory';

describe('Create a player', () => {
  test('Player is created with default name', () => {
    const player = playerFactory();
    expect(player.getName()).toBe('Player');
  });
  test('Player is created with custom name', () => {
    const player = playerFactory('Custom');
    expect(player.getName()).toBe('Custom');
  });
  test('Player is created with default game board', () => {
    const player = playerFactory();
    const expectedBoard = [];
    const oneRow = [];
    const oneCell = { hasShip: false, hasBeenHit: false };
    for (let i = 0; i < 10; i += 1) {
      oneRow.push(oneCell);
    }
    for (let i = 0; i < 10; i += 1) {
      expectedBoard.push(oneRow);
    }
    expect(player.board).toEqual(expectedBoard);
  });
});

describe('Player takes turn', () => {
  test('Player attacks and hit', () => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2');
    const ship = shipFactory(3);
    playerTwo.placeShip(ship, 0, 0);
    playerOne.takeTurn(playerTwo, 0, 0);
    expect(playerTwo.board[0][0].hasBeenHit).toEqual(true);
  });
  test('Player attacks and miss (enemy board check)', () => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2');
    playerOne.takeTurn(playerTwo, 5, 5);
    expect(playerTwo.board[5][5].hasBeenHit).toEqual(false);
  });
  test('Player attacks and miss (missed attacks check)', () => {
    const playerOne = playerFactory('Player1');
    const playerTwo = playerFactory('Player2');
    playerOne.takeTurn(playerTwo, 5, 5);
    expect(playerTwo.getMissedHits()).toEqual([[5, 5]]);
  });
});
