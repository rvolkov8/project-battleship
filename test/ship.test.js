import shipFactory from '../src/shipFactory';

test('Ship is hit', () => {
  const ship = shipFactory(3);
  expect(ship.hit(1)).toBe(2);
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
