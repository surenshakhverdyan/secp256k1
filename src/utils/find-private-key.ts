import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import rList from '../../data/r-list.json';

export const findPrivateKey = (
  Q: { x: bigint; y: bigint }
): number[] | undefined => {
  let rIndexes: number[] = [];
  const previousPoints: Point[] = [];

  for (let index = rList.length - 1; index >= 0; index--) {
    const R = {
      x: BigInt(rList[index].x),
      y: BigInt(rList[index].y)
    };

    const previousPoint = findPreviousPoint(Q, R);
    if (previousPoint.x !== null && previousPoint.y !== null) {
      previousPoints.push(previousPoint);
    } else {
      rIndexes.push(index);
      console.log(rIndexes);
    }
  }

  return rIndexes;
};
