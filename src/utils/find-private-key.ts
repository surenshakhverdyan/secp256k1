import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import rList from '../../data/r-list.json';

export const findPrivateKey = (
  Q: { x: bigint; y: bigint },
): string => {
  let result: number[] = [];
  let currentPoint = { x: Q.x, y: Q.y };

  while (true) {
    let found = false;

    for (let index = rList.length - 1; index >= 0; index--) {
      const R = {
        x: BigInt(rList[index].x),
        y: BigInt(rList[index].y)
      };

      let previousPointElliptic = findPreviousPoint(currentPoint, R);
      if (previousPointElliptic.x === null && previousPointElliptic.y === null) {
        result.push(index);
        let dBinary: string = '';
        for (let k = 0; k < result.length; k++) {
          if (k === 0) {
            const zeros = '0'.repeat(rList.length - result[k] - 1).concat('1');
            dBinary += zeros;
          } else {
            const zeros = '0'.repeat(result[k - 1] - result[k] -1).concat('1');
            dBinary += zeros;
          }

          if (k === result.length - 1) {
            const zeros = '0'.repeat(rList.length - dBinary.length);
            dBinary += zeros;
          }
        }

        return dBinary;
      }

      for (let i = index - 1; i >= 0; i--) {
        const candidate = {
          x: BigInt(rList[i].x),
          y: BigInt(rList[i].y)
        };

        if (
          previousPointElliptic.x === candidate.x &&
          previousPointElliptic.y === candidate.y
        ) {
          result.push(index);
          currentPoint = Point.fromEllipticPoint(previousPointElliptic);
          found = true;
          break;
        }
      }
    }
  }
};
