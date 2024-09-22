import { Point } from './elliptic.class';
import { findPreviousPoint } from './find-previous-points';
import rList from '../../data/r-list.json';

export const findPrivateKey = (
  Q: { x: bigint; y: bigint },
) => {
  let dBinary: string = '';
  let indexes: number[] = [];
  let candidateQ = Q;

  for (let i = rList.length - 1; i >= 0; i--) {
    const candidateR = {
      x: BigInt(rList[i].x),
      y: BigInt(rList[i].y)
    };

    const previousPoint = Point.fromEllipticPoint(
      findPreviousPoint(candidateQ, candidateR)
    );

    for (let k = i - 1; k >= 0; k--) {
      const preCandidateR = {
        x: BigInt(rList[k].x),
        y: BigInt(rList[k].y)
      };

      if (
        previousPoint.x === preCandidateR.x &&
        previousPoint.y === preCandidateR.y
      ) {
        indexes.push(k);
        dBinary += '1';
      }
    }
  }
};
