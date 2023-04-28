export default function shipFactory(length) {
  let shipLength = length;
  let hitNum = 0;
  let orientation = 'horizontal';
  let coordinates = [];

  const getLength = () => {
    return shipLength;
  };

  const getOrientation = () => {
    return orientation;
  };

  const changeOrientation = () => {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else if (orientation === 'vertical') {
      orientation = 'horizontal';
    }
  };

  const addCoordinates = (x, y) => {
    const result = [x, y];
    coordinates.push(result);
  };

  const getCoordinates = () => {
    return coordinates;
  };

  const hit = () => {
    hitNum++;
    return shipLength - hitNum;
  };

  const getHitNum = () => {
    return hitNum;
  };

  const isSunk = () => {
    if (hitNum === shipLength) {
      return true;
    } else {
      return false;
    }
  };

  return {
    getLength,
    getOrientation,
    changeOrientation,
    addCoordinates,
    getCoordinates,
    hit,
    getHitNum,
    isSunk,
  };
}
