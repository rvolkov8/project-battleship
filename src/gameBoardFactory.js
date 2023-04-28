export default function gameBoardFactory() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push({ hasShip: false, hasBeenHit: false });
    }
    board.push(row);
  }
  const ships = [];
  const missedHits = [];

  const getMissedHits = () => {
    return missedHits;
  };

  const placeShip = (ship, startX, startY) => {
    const shipLength = ship.getLength();
    if (ship.getOrientation() === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        board[startX + i][startY].hasShip = true;
        ship.addCoordinates(startX + i, startY);
      }
    } else if (ship.getOrientation() === 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        board[startX][startY + i].hasShip = true;
        ship.addCoordinates(startX, startY + i);
      }
    }
    ships.push(ship);
  };

  const includesArr = (mainArr, arrToCheck) => {
    return mainArr.some(
      (arr) => JSON.stringify(arr) === JSON.stringify(arrToCheck)
    );
  };

  const receiveAttack = (x, y) => {
    const targetCoordinates = [x, y];
    let hasShip = false;
    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i];
      const shipCoordinates = ships[i].getCoordinates();
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
    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i];
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  };

  return {
    board,
    getMissedHits,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
}
