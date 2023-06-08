const readline = require('readline');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const virginFilePath = path.join(__dirname, 'payloads', 'virgin_data.txt');
const virginFileData = fs.readFileSync(virginFilePath, 'utf8');
const cryptedFilePath = path.join(__dirname, 'payloads', 'crypted_data.txt');
const cryptedFileData = fs.readFileSync(cryptedFilePath, 'utf8');
const secretToken = process.env.SECRET_TOKEN;

const {
  unhashSaveData,
  hashSaveData,
  burnCryptedData,
  burnvirginFileData,
} = require('./functions');

const menu = `
  Select an option:
  1. Unhash and save data
  2. Hash and save data
  3. Burn crypted data
  4. Burn virgin file data
  5. Exit
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runMenu() {
  console.log(menu);

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        console.log('. . .');
        unhashSaveData(cryptedFileData, secretToken);
        console.log('. . .');
        runMenu();
        break;
      case '2':
        console.log('. . .');
        hashSaveData(virginFileData, secretToken);
        console.log('. . .');
        runMenu();
        break;
      case '3':
        console.log('. . .');
        burnCryptedData();
        console.log('. . .');
        runMenu();
        break;
      case '4':
        console.log('. . .');
        burnvirginFileData();
        console.log('. . .');
        runMenu();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        runMenu();
        break;
    }
  });
}

runMenu();
