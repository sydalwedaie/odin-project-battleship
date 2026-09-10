export function Ship(length) {
  let hitCount = 0;

  const getHitCount = () => hitCount;
  const hit = () => (hitCount += 1);
  const isSunk = () => hitCount === length;

  return { length, getHitCount, hit, isSunk };
}
