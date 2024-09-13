import rList from '../../data/r-list.json';
import { findPreviousPoint } from './find-previous-points';

export const findPrivateKey = (Q: { x: bigint; y: bigint }): string => {
  let k: string = '';

  for (let i = rList.length -1; i >= 0; i--) {
    const R = {
      x: BigInt(rList[i].x),
      y: BigInt(rList[i].y)
    };
    const previousPoint = findPreviousPoint(Q, R);
  }

  return k;
};
