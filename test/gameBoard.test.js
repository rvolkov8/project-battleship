import gameBoardFactory from '../src/gameBoardFactory';
import shipFactory from '../src/shipFactory';

describe('Create a board', () => {
  test('Create a board of the correct size', () => {
    const expectedBoard = [];
    const oneRow = [];
    const oneCell = { hasShip: false, hasBeenHit: false };
    for (let i = 0; i < 10; i += 1) {
      oneRow.push(oneCell);
    }
    for (let i = 0; i < 10; i += 1) {
      expectedBoard.push(oneRow);
    }
    const gameBoard = gameBoardFactory();
    const actualBoard = gameBoard.board;
    expect(actualBoard).toEqual(expectedBoard);
  });

  test('Create a board of the correct cell properties', () => {
    const expectedCell = { hasShip: false, hasBeenHit: false };
    const gameBoard = gameBoardFactory();
    const actualCell = gameBoard.board[0][0];
    expect(actualCell).toEqual(expectedCell);
  });
});

describe('Place a ship', () => {
  test('Place a ship in the correct position (horizontal length: 3)', () => {
    const ship = shipFactory(3);
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip(ship, 0, 0);
    expect(gameBoard.board[0][0].hasShip).toEqual(true);
    expect(gameBoard.board[1][0].hasShip).toEqual(true);
    expect(gameBoard.board[2][0].hasShip).toEqual(true);
  });

  test('Place a ship in the correct position (vertical length: 2)', () => {
    const ship = shipFactory(2);
    ship.changeOrientation();
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip(ship, 5, 6);
    expect(gameBoard.board[5][6].hasShip).toEqual(true);
    expect(gameBoard.board[5][7].hasShip).toEqual(true);
  });
});

describe('Receive an attack', () => {
  test('hasBeenHit check', () => {
    const gameBoard = gameBoardFactory();
    const ship = shipFactory(3);
    gameBoard.placeShip(ship, 0, 0);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.board[0][0].hasBeenHit).toEqual(true);
  });
  test('missedHits array check', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.getMissedHits()).toEqual([[0, 0]]);
  });
  test('the is hit check', () => {
    const gameBoard = gameBoardFactory();
    const ship = shipFactory(3);
    gameBoard.placeShip(ship, 0, 0);
    gameBoard.receiveAttack(0, 0);
    expect(ship.getHitNum()).toEqual(1);
  });
});

describe('All ships are sunk', () => {
  test('detects that all ships are sunk', () => {
    const gameBoard = gameBoardFactory();
    const ship1 = shipFactory(3);
    const ship2 = shipFactory(2);
    gameBoard.placeShip(ship1, 0, 0);
    gameBoard.placeShip(ship2, 5, 5);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(2, 0);
    gameBoard.receiveAttack(5, 5);
    gameBoard.receiveAttack(6, 5);
    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});
