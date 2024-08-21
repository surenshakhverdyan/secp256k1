import { params } from '../config/params';
import { pointDoubling } from './point-doubling';
import { modInverse } from './mod-inverse';

export const pointAddition = (
  Px: bigint,
  Py: bigint,
  Qx: bigint,
  Qy: bigint
): { x: bigint; y: bigint } => {
  if (Px === Qx && Py === Qy) {
    return pointDoubling(Px, Py);
  }

  const lambda = (modInverse(Qx - Px, params.p) * (Qy - Py)) % params.p;
  const x = (lambda ** 2n - Px - Qx) % params.p;
  const y = (lambda * (Px - x) - Py) % params.p;

  return {
    x: (x + params.p) % params.p,
    y: (y + params.p) % params.p
  };
};
