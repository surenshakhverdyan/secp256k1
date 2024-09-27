import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import { rList } from '../config/r-list';

export const findNullPoint = (
  point: {
    index: number;
    x: bigint;
    y: bigint;
  }
): boolean => {
  let points = [];

  if (point.index === 0) {
    return false
  }
  
  for (let i = point.index - 1; i >= 0 ; i--) {
    const R = rList[i];
    const previous = findPreviousPoint({ x: point.x, y: point.y }, R);

    if (previous.x !== null && previous.y !== null) {
      points.push({
        [i]: {
          x: Point.fromEllipticPoint(previous).x,
          y: Point.fromEllipticPoint(previous).y
        }
      });
    } else {
      console.log(i);
      return true;
    }
  }

  return false;
};
