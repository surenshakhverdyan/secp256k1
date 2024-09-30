import { params } from '../config/params';
import { IPoint } from '../interfaces/point.interface';
import { modInverse } from './mod-inverse';

export const pointDoubling = (
  P: IPoint
): IPoint => {
  const lambda = (3n * P.x ** 2n + params.a) * modInverse(2n * P.y, params.p) % params.p;
  const x = (lambda ** 2n - 2n * P.x) % params.p;
  const y = (lambda * (P.x - x) - P.y) % params.p;

  return {
    x: (x + params.p) % params.p,
    y: (y + params.p) % params.p
  };
};
