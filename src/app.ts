import { params } from './config/params';
import { scalarMultiplication } from './utils/scalar-multiplication';
import { addressGenerate } from './utils/address.generate';
import { privateKeyToWIF } from './utils/private-key-to-wif';
import { findPrivateKey } from './utils/find-private-key';

const q = {
  x: 0x3E5AACFC20C77F3A6B24AED45D7CDA7AD889379681EB1C7968AABA1F5E28A78Fn,
  y: 0x9B1ED65C930A32375FF8C16A2204A5F63FEA35404E5084A720AD1A1A4333E0E3n
};

findPrivateKey(q);
const k = 0x000000000000000000000000000000000000000000000000000000000000000An;
const Q = scalarMultiplication(k, params.G);

const privateKeyUncompressed = privateKeyToWIF(k, false);
const publicKeyUncompressed = `04${Q.x.toString(16).toUpperCase()}${Q.y.toString(16).toUpperCase()}`;
const addressUncompressed = addressGenerate(publicKeyUncompressed);

const privateKeyCompressed = privateKeyToWIF(k, true);
const publicKeyCompressed = `${Q.y % 2n === 0n ? '02' : '03'}${Q.x.toString(16).toUpperCase()}`;
const addressCompressed = addressGenerate(publicKeyCompressed);

console.log(`Private Key Hex: ${k.toString(16).toUpperCase()}`);

console.log('-'.repeat(155));
console.log(`Private Key WIF Uncompressed: ${privateKeyUncompressed}`);
console.log(`Public Key Uncompressed: ${publicKeyUncompressed}`);
console.log(`Address Uncompressed: ${addressUncompressed}`);

console.log('-'.repeat(89));
console.log(`Private Key WIF Compressed: ${privateKeyCompressed}`);
console.log(`Public Key Compressed: ${publicKeyCompressed}`);
console.log(`Address Compressed: ${addressCompressed}`);
