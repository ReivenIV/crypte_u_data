const crypto = require('crypto');

const fs = require("fs");
const raw_data = fs.readFileSync("payloads/tremorData.json");
const humanReadableData = JSON.parse(raw_data);


// function checkString(secret, data) {
//   let responsetoString;
//   if (typeof secret === "string" && typeof data === "string") {
//     return secret, data;
//   }
//   if (typeof secret === "number" || typeof data === "number") {
//     secretToString = secret.toString();
//     dataToString = secret.toString();
//     return responsetoString, dataToString;
//   } else {
//     let msg = "secret and must be a string";
//     throw msg;
//   }
// }

// console.log(checkString("123"));

function hashWithSecret(data, secret) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const hashedData = iv.toString('hex') + encrypted;
  return hashedData;
}

function unhashWithSecret(hashedData, secret) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, 'salt', 32);
  const iv = Buffer.from(hashedData.slice(0, 32), 'hex');
  const encrypted = hashedData.slice(32);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Example usage
const secretToken = 'mySecretToken';
const dataToHash = '67';

const hashedData = hashWithSecret(dataToHash, secretToken);
console.log('Hashed data:', hashedData);

const unhashedData = unhashWithSecret(hashedData, secretToken);
console.log('Unhashed data:', unhashedData);
