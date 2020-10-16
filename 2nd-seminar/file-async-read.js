const fs = require('fs');

const numArr = [1, 2, 3, 4, 5];
const fileCommonName = 'asyncText';

numArr.forEach((num) => {
  const fileName = fileCommonName + num;
  fs.readFile(`${fileName}.txt`, (err, data) => {
    console.log(`file[${fileName}] with ${data}`);
  });
});