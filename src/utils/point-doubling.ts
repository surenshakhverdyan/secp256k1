import { params } from '../config/params';
import { modInverse } from './mod-inverse';

export const pointDoubling = (
  Px: bigint,
  Py: bigint
): { x: bigint; y: bigint } => {
  const lambda = (3n * Px ** 2n + params.a) * modInverse(2n * Py, params.p) % params.p;
  const x = (lambda ** 2n - 2n * Px) % params.p;
  const y = (lambda * (Px - x) - Py) % params.p;

  return {
    x: (x + params.p) % params.p,
    y: (y + params.p) % params.p
  };
};
