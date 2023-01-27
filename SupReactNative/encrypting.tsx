import * as crypto from 'crypto';

export const encrypt = (text: string) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'your-secret-key');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export const decrypt = (text: string) => {
  const decipher = crypto.createDecipher('aes-256-cbc', 'your-secret-key');
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}