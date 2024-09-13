import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

export class Point {
  x: bigint;
  y: bigint;

  constructor(x: bigint, y: bigint) {
    this.x = x;
    this.y = y;
  }

  toEllipticPoint(): any {
    return ec.curve.point(this.x.toString(16), this.y.toString(16));
  }

  static fromEllipticPoint(point: any): Point {
    return new Point(BigInt('0x' + point.getX().toString(16)), BigInt('0x' + point.getY().toString(16)));
  }
}
