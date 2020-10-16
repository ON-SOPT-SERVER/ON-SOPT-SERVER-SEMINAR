const fs = require('fs');

const numArr = [1, 2, 3, 4, 5];
const fileCommonName = 'asyncText';

numArr.forEach((num) => {
  const fileName = fileCommonName + num;
  const data = `reserved message for the '${fileName}'`;
  fs.writeFile(`${fileName}.txt`, data, () => {
    console.log(`file[${fileName}] write complete`);
  });
});