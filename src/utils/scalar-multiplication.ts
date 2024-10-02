import { params } from '../config/params';
import { IPoint } from '../interfaces/point.interface';
import { pointAddition } from './point-addition';
import { pointDoubling } from './point-doubling';

export const scalarMultiplication = (
  d: bigint
): IPoint => {
  let Q = { x: 0n, y: 0n };
  let R = params.G;

  while (d > 0n) {
    if (d & 1n) {
      if (Q.x === 0n && Q.y === 0n) {
        Q = R;
      } else {
        Q = pointAddition(Q, R);
      }
      console.log(Q > R);
    }
    R = pointDoubling(R);
    d >>= 1n;
  }

  return Q;
};
