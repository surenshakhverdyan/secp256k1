import { scalarMultiplication } from './utils/scalar-multiplication';
import { addressGenerate } from './utils/address.generate';
import { privateKeyToWIF } from './utils/private-key-to-wif';

const k = 0x000000000000000000000000000000000000000000000000000000000000000An;
const Q = scalarMultiplication(k);

const privateKeyUncompressed = privateKeyToWIF(k, false);
const publicKeyUncompressed = `04${Q.x.toString(16).padStart(64, '0').toUpperCase()}${Q.y.toString(16).padStart(64, '0').toUpperCase()}`;
const addressUncompressed = addressGenerate(publicKeyUncompressed);

const privateKeyCompressed = privateKeyToWIF(k, true);
const publicKeyCompressed = `${Q.y % 2n === 0n ? '02' : '03'}${Q.x.toString(16).padStart(64, '0').toUpperCase()}`;
const addressCompressed = addressGenerate(publicKeyCompressed);

console.log(`Private Key Hex: ${k.toString(16).padStart(64, '0').toUpperCase()}`);

console.log('-'.repeat(155));
console.log(`Private Key WIF Uncompressed: ${privateKeyUncompressed}`);
console.log(`Public Key Uncompressed: ${publicKeyUncompressed}`);
console.log(`Address Uncompressed: ${addressUncompressed}`);

console.log('-'.repeat(89));
console.log(`Private Key WIF Compressed: ${privateKeyCompressed}`);
console.log(`Public Key Compressed: ${publicKeyCompressed}`);
console.log(`Address Compressed: ${addressCompressed}`);
