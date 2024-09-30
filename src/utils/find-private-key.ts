import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import { rList } from '../config/r-list';
import { IPoint } from '../interfaces/point.interface';

export const findPrivateKey = (
  Q: IPoint
): void => {
  let previousPoints = [];

  for (let index = 0; index < rList.length; index++) {
    const R = rList[index];

    const previousPoint = findPreviousPoint(Q, R);
    if (previousPoint.x !== null && previousPoint.y !== null) {
      if (index === 0) {
        continue;
      }

      previousPoints.push({
        index,
        x: Point.fromEllipticPoint(previousPoint).x,
        y: Point.fromEllipticPoint(previousPoint).y
      });
    }
  }
};
