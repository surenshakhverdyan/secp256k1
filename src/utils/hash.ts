import crypto from 'crypto';

export const sha256 = (buffer: Buffer): Buffer => {
  return crypto.createHash('sha256').update(buffer).digest();
};

export const ripemd160 = (buffer: Buffer): Buffer => {
  return crypto.createHash('ripemd160').update(buffer).digest();
};

export const base58Encode = (buffer: Buffer): string => {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let encoded = BigInt('0x' + buffer.toString('hex'));
  let output = '';
  while (encoded > 0n) {
    const remainder = Number(encoded % 58n);
    encoded = encoded / 58n;
    output = alphabet[remainder] + output;
  }

  for (const byte of buffer) {
    if (byte !== 0x00) break;
    output = '1' + output;
  }

  return output;
};
