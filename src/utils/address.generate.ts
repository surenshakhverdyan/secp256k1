import {
  sha256,
  ripemd160,
  base58Encode
} from "./hash";

export const addressGenerate = (publicKey: string): string => {
  const buffer = Buffer.from(publicKey, 'hex');
  const sha256Hash = sha256(buffer);
  const ripemd160Hash = ripemd160(sha256Hash);
  const networkByte = Buffer.from([0x00]);
  const networkedHash = Buffer.concat([networkByte, ripemd160Hash]);
  const checksum = sha256(sha256(networkedHash)).slice(0, 4);
  const finalHash = Buffer.concat([networkedHash, checksum]);
  return base58Encode(finalHash);
};
