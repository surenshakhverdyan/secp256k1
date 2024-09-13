import { Point } from './elliptic.class';

export const findPreviousPoint = (
  Q: { x: bigint; y: bigint },
  R: { x: bigint; y: bigint }
): Point => {
  const pQ = new Point(Q.x, Q.y);
  const pR = new Point(R.x, R.y);

  const pQElliptic = pQ.toEllipticPoint();
  const pRElliptic = pR.toEllipticPoint();

  const previousPointElliptic = pQElliptic.add(pRElliptic.neg());

  return Point.fromEllipticPoint(previousPointElliptic);
};
