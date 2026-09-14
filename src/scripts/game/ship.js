export function Ship(length, name) {
  let hitCount = 0;

  const hit = () => (hitCount += 1);
  const getHitCount = () => hitCount;
  const getHealth = () => Math.round(100 - (getHitCount() / length) * 100);
  const isSunk = () => hitCount === length;

  return { length, name, hit, getHitCount, getHealth, isSunk };
}
