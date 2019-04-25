import { generateKeys, generatePassword } from 'services/keyService';

import { hasNotNullMemoKey, getMemo, hexToMessage } from '../memo';

const keys = generateKeys('sender', generatePassword());
const recepienPublictKey = generateKeys('recepient', generatePassword())
  .publicKey;
const emptyKey = 'OTN1111111111111111111111111111111114T1Anm';

describe('Memo Service', () => {
  describe('hasNotNullMemoKey', () => {
    test('valid key', () => {
      expect(
        hasNotNullMemoKey({
          options: {
            memo_key: keys.publicKey
          }
        })
      ).toBe(true);
    });

    test('empty account', () => {
      expect(hasNotNullMemoKey(null)).toBe(false);
    });

    test('zero key', () => {
      expect(
        hasNotNullMemoKey({
          options: {
            memo_key: emptyKey
          }
        })
      ).toBe(false);
    });

    test('empty key', () => {
      expect(
        hasNotNullMemoKey({
          options: {
            memo_key: ''
          }
        })
      ).toBe(false);
    });
  });

  describe('getMemo', () => {
    test('valid keys', () => {
      const result = getMemo(
        keys.privateKey,
        keys.publicKey,
        recepienPublictKey,
        'Message'
      );

      expect(Object.keys(result)).toEqual(['message', 'from', 'to', 'nonce']);
      expect(result.from).toBe(keys.publicKey);
      expect(result.to).toBe(recepienPublictKey);
      expect(result.nonce).toMatch(/^[1-9][0-9]+$/);
    });

    test('invalid recepient key', () => {
      const result = getMemo(
        keys.privateKey,
        keys.publicKey,
        emptyKey,
        'Message'
      );

      expect(Object.keys(result)).toEqual(['message', 'from', 'to', 'nonce']);
      expect(result.from).toBe(keys.publicKey);
      expect(result.to).toBe(emptyKey);
      expect(result.nonce).toMatch(/^[1-9][0-9]+$/);
    });

    test('invalid sender key', () => {
      const result = getMemo(
        keys.privateKey,
        emptyKey,
        recepienPublictKey,
        'Message'
      );

      expect(Object.keys(result)).toEqual(['message', 'from', 'to', 'nonce']);
      expect(result.from).toBe(emptyKey);
      expect(result.to).toBe(recepienPublictKey);
      expect(result.nonce).toMatch(/^[1-9][0-9]+$/);
    });
  });

  describe('message to hex', () => {
    test('open memo to string', () => {
      const result = getMemo(
        keys.privateKey,
        emptyKey,
        recepienPublictKey,
        'Message'
      );

      expect(hexToMessage(result.message)).toBe('Message');
    });

    test('open memo with incorrect checksum to string', () => {
      const result = getMemo(
        keys.privateKey,
        emptyKey,
        recepienPublictKey,
        'Message'
      );
      const message = '11111111' + result.message.slice(8);

      expect(hexToMessage(message)).toBe('');
    });
  });
});
