import { params } from './config/params';
import { scalarMultiplication } from './utils/scalar-multiplication';
import { addressGenerate } from './utils/address.generate';
import { privateKeyToWIF } from './utils/private-key-to-wif';
import { findPrivateKey } from './utils/find-private-key';

const q = {
  x: 0x2F01E5E15CCA351DAFF3843FB70F3C2F0A1BDD05E5AF888A67784EF3E10A2A01n,
  y: 0x5C4DA8A741539949293D082A132D13B4C2E213D6BA5B7617B5DA2CB76CBDE904n
};

const kBinary = findPrivateKey(q);
const k = BigInt(parseInt(kBinary, 2));
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
