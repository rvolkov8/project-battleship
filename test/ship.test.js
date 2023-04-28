import shipFactory from '../src/shipFactory';

test('Ship is hit', () => {
  const ship = shipFactory(3);
  expect(ship.hit(1)).toBe(2);
});

test('Get length', () => {
  const ship = shipFactory(3);
  expect(ship.getLength()).toBe(3);
});

test('Get orientation', () => {
  const ship = shipFactory(3);
  expect(ship.getOrientation()).toBe('horizontal');
});

test('Change orientation', () => {
  const ship = shipFactory(2);
  ship.changeOrientation();
  expect(ship.getOrientation()).toBe('vertical');
});

test('Add coordinates to the ship', () => {
  const expectedCoordinates = [
    [0, 0],
    [1, 0],
    [2, 0],
  ];
  const ship = shipFactory(3);
  ship.addCoordinates(0, 0);
  ship.addCoordinates(1, 0);
  ship.addCoordinates(2, 0);
  expect(ship.getCoordinates()).toEqual(expectedCoordinates);
});

test('Ship is sunk', () => {
  const ship = shipFactory(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('Ship is not sunk', () => {
  const ship = shipFactory(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
