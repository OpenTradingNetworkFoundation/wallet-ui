import { PrivateKey, key } from 'bitsharesjs';

const SALT = 0;

function generatePassword(length = 45) {
  const password = key.get_random_key().toWif();

  return password.substr(0, length);
}

function generateKeys(accountName, password) {
  const seed = `${accountName}${SALT}${password}`;
  let privateKey = PrivateKey.fromSeed(seed);
  let publicKey = privateKey.toPublicKey().toString();

  return { privateKey, publicKey };
}

function validateKeys(publicKey, expectedKey) {
  return expectedKey === publicKey;
}

export { generatePassword, generateKeys, validateKeys };
