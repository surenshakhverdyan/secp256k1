import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import rList from '../../data/r-list.json';

export const findPrivateKey = (
  Q: { x: bigint; y: bigint }
) => {
  let previousPoints = [];

  for (let index = 0; index < rList.length; index++) {
    const R = {
      x: BigInt(rList[index].x),
      y: BigInt(rList[index].y)
    };

    const previousPoint = findPreviousPoint(Q, R);
    if (previousPoint.x !== null && previousPoint.y !== null) {
      previousPoints.push({
        [index]: {
          x: Point.fromEllipticPoint(previousPoint).x,
          y: Point.fromEllipticPoint(previousPoint).y
        }
      });
    }
  }
};
