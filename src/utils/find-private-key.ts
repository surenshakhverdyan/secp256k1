import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import { findNullPoint } from './find-null-point';
import { rList } from '../config/r-list';

export const findPrivateKey = (
  Q: { x: bigint; y: bigint }
) => {
  let previousPoints = [];
  let currentPoints = [];

  for (let index = 0; index < rList.length; index++) {
    const R = rList[index]

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

  for (let i = 0; i < previousPoints.length; i++) {
    const point = previousPoints[i];
    const currentPoint = findNullPoint(point);

    if (currentPoint) {
      currentPoints.push(i);
      break;
    }
  }

  return currentPoints;
};
