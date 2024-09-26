import { params } from '../config/params';
import { pointAddition } from './point-addition';
import { pointDoubling } from './point-doubling';

export const scalarMultiplication = (
  d: bigint
): { x: bigint; y: bigint } => {
  let Q = { x: 0n, y: 0n };
  let R = params.G;

  while (d > 0n) {
    if (d & 1n) {
      if (Q.x === 0n && Q.y === 0n) {
        Q = R;
      } else {
        Q = pointAddition(Q.x, Q.y, R.x, R.y);
      }
    }
    R = pointDoubling(R.x, R.y);
    d >>= 1n;
  }

  return Q;
};
