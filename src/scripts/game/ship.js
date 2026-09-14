export function Ship(length, name) {
  let hitCount = 0;

  const getHitCount = () => hitCount;
  const hit = () => (hitCount += 1);
  const isSunk = () => hitCount === length;

  return { length, name, getHitCount, hit, isSunk };
}
