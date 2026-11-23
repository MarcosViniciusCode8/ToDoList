import { randomBytes } from 'node:crypto';

export function GenerateCode() {
    let code = randomBytes(32).toString('base64url');
    console.log(code);
  return code;
}

