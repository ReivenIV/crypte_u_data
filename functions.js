const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const virginFilePath = path.join(__dirname, 'payloads', 'virgin_data.txt');
//const virginFileData = fs.readFileSync(virginFilePath, 'utf8');
const cryptedFilePath = path.join(__dirname, 'payloads', 'crypted_data.txt');
//const cryptedFileData = fs.readFileSync(cryptedFilePath, 'utf8');
//const secretToken = process.env.SECRET_TOKEN;

function hashDataWithSecret(data, secret) {
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

async function unhashSaveData(cryptedFileData, secretToken) {
  try {
    const unHashedData = unhashWithSecret(cryptedFileData, secretToken);
    await fs.writeFileSync(virginFilePath, unHashedData, 'utf8');
    console.log('☁️ Data saved successfully.☁️');
  } catch (err) {
    console.error(err);
  }
}

function hashSaveData(virginFileData, secretToken) {
  try {
    const hashedData = hashDataWithSecret(virginFileData, secretToken);
    fs.writeFileSync(cryptedFilePath, hashedData, 'utf8');
    console.log('☁️ Data saved successfully.☁️');
  } catch (err) {
    console.error(err);
  }
}

function burnCryptedData() {
  try {
    fs.truncateSync(cryptedFilePath, 0);
    console.log('🔥🔥Crypted Data Burned 🔥🔥');
  } catch (error) {
    console.error(error);
  }
}

function burnvirginFileData() {
  try {
    fs.truncateSync(virginFilePath, 0);
    console.log('🔥🔥 Virgin Data Burned 🔥🔥');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  unhashSaveData,
  hashSaveData,
  burnCryptedData,
  burnvirginFileData,
};