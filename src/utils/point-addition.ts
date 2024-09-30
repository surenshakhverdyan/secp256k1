import { params } from '../config/params';
import { pointDoubling } from './point-doubling';
import { modInverse } from './mod-inverse';
import { IPoint } from '../interfaces/point.interface';

export const pointAddition = (
  P: IPoint,
  Q: IPoint,
): IPoint => {
  if (P.x === Q.x && P.y === Q.y) {
    return pointDoubling(P);
  }

  const lambda = (modInverse(Q.x - P.x, params.p) * (Q.y - P.y)) % params.p;
  const x = (lambda ** 2n - P.x - Q.x) % params.p;
  const y = (lambda * (P.x - x) - P.y) % params.p;

  return {
    x: (x + params.p) % params.p,
    y: (y + params.p) % params.p
  };
};
