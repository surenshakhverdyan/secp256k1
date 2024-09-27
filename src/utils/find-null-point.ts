import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import { rList } from '../config/r-list';

export const findNullPoint = (point: any): boolean => {
  let points = [];
  if (Object.keys(point)[0] === '0') {
    return false
  }
  
  for (let i = parseInt(Object.keys(point)[0]); i > 0 ; i--) {
    const R = rList[i - 1];
    const previous = findPreviousPoint(point[Object.keys(point)[0]], R);
    if (previous.x !== null && previous.y !== null) {
      points.push({
        [i - 1]: {
          x: Point.fromEllipticPoint(previous).x,
          y: Point.fromEllipticPoint(previous).y
        }
      });
    } else {
      console.log(i - 1);
      return true;
    }
  }

  return false;
};
