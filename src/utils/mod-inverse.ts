export const modInverse = (
  k: bigint,
  p: bigint
): bigint => {
  if (k < 0n) {
    return p - modInverse(-k, p);
  }
  let [s, old_s] = [0n, 1n];
  let [r, old_r] = [p, k];

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }

  return (old_s + p) % p;
};
