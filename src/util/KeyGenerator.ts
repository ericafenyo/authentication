import { customAlphabet } from 'nanoid';

export const generateKey = (length = 32): string => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const generate = customAlphabet(alphabet, length);

  // Makes sure that the first two characters are unique.
  let key = generate();
  while (key.match(/^(.)\1+/i)) {
    key = generate();
  }
  return key;
};
