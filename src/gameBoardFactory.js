import shipFactory from './shipFactory';

export default function gameBoardFactory() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      row.push({ hasShip: false, hasBeenHit: false });
    }
    board.push(row);
  }
  const ships = [];
  const missedHits = [];

  const getMissedHits = () => missedHits;

  const placeShip = (ship, startX, startY) => {
    const shipLength = ship.getLength();
    if (ship.getOrientation() === 'horizontal') {
      for (let i = 0; i < shipLength; i += 1) {
        board[startX + i][startY].hasShip = true;
        ship.addCoordinates(startX + i, startY);
      }
    } else if (ship.getOrientation() === 'vertical') {
      for (let i = 0; i < shipLength; i += 1) {
        board[startX][startY + i].hasShip = true;
        ship.addCoordinates(startX, startY + i);
      }
    }
    ships.push(ship);
  };

  const placeShipRandomly = (ship) => {
    const shipSize = ship.getLength();
    const isHorizontal = ship.getOrientation() === 'horizontal';

    let startX;
    let startY;
    let invalidPlacement;
    do {
      invalidPlacement = false;
      startX = Math.floor(Math.random() * (10 - (isHorizontal ? shipSize : 0)));
      startY = Math.floor(Math.random() * (10 - (isHorizontal ? 0 : shipSize)));

      for (let i = -1; i <= shipSize; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          const x = isHorizontal ? startX + i : startX + j;
          const y = isHorizontal ? startY + j : startY + i;

          if (x < 0 || y < 0 || x >= 10 || y >= 10) {
            // Ship goes off the edge of the board, so placement is invalid
            invalidPlacement = true;
            break;
          }

          if (board[x][y].hasShip) {
            // A ship is already occupying this cell or a neighboring cell, so placement is invalid
            invalidPlacement = true;
            break;
          }
        }
        if (invalidPlacement) {
          break;
        }
      }
    } while (invalidPlacement);

    for (let i = 0; i < shipSize; i += 1) {
      const x = isHorizontal ? startX + i : startX;
      const y = isHorizontal ? startY : startY + i;

      board[x][y].hasShip = true;
      ship.addCoordinates(x, y);
    }

    ships.push(ship);
    return true;
  };

  const placeShipsRandomly = () => {
    const carrier = shipFactory(5);
    const battleship = shipFactory(4);
    const cruiser = shipFactory(3);
    const submarine = shipFactory(3);
    const destroyer = shipFactory(2);
    if (Math.random() > 0.5) {
      carrier.changeOrientation();
    }
    if (Math.random() > 0.5) {
      battleship.changeOrientation();
    }
    if (Math.random() > 0.5) {
      cruiser.changeOrientation();
    }
    if (Math.random() > 0.5) {
      submarine.changeOrientation();
    }
    if (Math.random() > 0.5) {
      destroyer.changeOrientation();
    }

    placeShipRandomly(carrier);
    placeShipRandomly(battleship);
    placeShipRandomly(cruiser);
    placeShipRandomly(submarine);
    placeShipRandomly(destroyer);
  };

  const includesArr = (mainArr, arrToCheck) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    mainArr.some((arr) => JSON.stringify(arr) === JSON.stringify(arrToCheck));

  const receiveAttack = (x, y) => {
    const targetCoordinates = [x, y];
    let hasShip = false;
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      const shipCoordinates = ship.getCoordinates();
      if (includesArr(shipCoordinates, targetCoordinates)) {
        ship.hit();
        board[x][y].hasBeenHit = true;
        hasShip = true;
      }
    }
    if (!hasShip) {
      missedHits.push(targetCoordinates);
    }
  };

  const allShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  return {
    board,
    includesArr,
    getMissedHits,
    placeShip,
    placeShipsRandomly,
    receiveAttack,
    allShipsSunk,
  };
}
