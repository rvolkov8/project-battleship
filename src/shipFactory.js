export default function shipFactory(length) {
  let shipLength = length;
  let hitNum = 0;

  const hit = () => {
    hitNum++;
    return shipLength - hitNum;
  };

  const isSunk = () => {
    if (hitNum === shipLength) {
      return true;
    } else {
      return false;
    }
  };

  return {
    hit,
    isSunk,
  };
}
