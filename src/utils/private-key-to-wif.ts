import { base58Encode, sha256 } from './hash';

export const privateKeyToWIF = (
  privateKey: bigint,
  compressed: boolean
): string => {
  const privateKeyHex = privateKey.toString(16).padStart(64, '0');
  const buffer = Buffer.from(privateKeyHex, 'hex');
  const prefix = Buffer.from([0x80]);

  let keyWithPrefix = Buffer.concat([prefix, buffer]);

  if (compressed) {
    keyWithPrefix = Buffer.concat([keyWithPrefix, Buffer.from([0x01])]);
  }

  const hash = sha256(sha256(keyWithPrefix));
  const checksum = hash.slice(0, 4);
  const wifBytes = Buffer.concat([keyWithPrefix, checksum]);
  const privateKeyWIF = base58Encode(wifBytes);

  return privateKeyWIF;
};
