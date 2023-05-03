export default function shipFactory(length) {
  const shipLength = length;
  let hitNum = 0;
  let orientation = 'horizontal';
  const coordinates = [];

  const getLength = () => shipLength;

  const getOrientation = () => orientation;

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

  const getCoordinates = () => coordinates;

  const hit = () => {
    hitNum += 1;
    return shipLength - hitNum;
  };

  const getHitNum = () => hitNum;

  const isSunk = () => {
    if (hitNum === shipLength) {
      return true;
    }
    return false;
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
