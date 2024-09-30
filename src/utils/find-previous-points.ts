import { IPoint } from '../interfaces/point.interface';
import { Point } from './elliptic.class';

export const findPreviousPoint = (
  Q: IPoint,
  R: IPoint
): Point => {
  const pQ = new Point(Q.x, Q.y);
  const pR = new Point(R.x, R.y);

  const pQElliptic = pQ.toEllipticPoint();
  const pRElliptic = pR.toEllipticPoint();

  const previousPointElliptic = pQElliptic.add(pRElliptic.neg());

  return previousPointElliptic;
};
