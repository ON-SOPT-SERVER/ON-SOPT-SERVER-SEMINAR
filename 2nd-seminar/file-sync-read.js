const fs = require('fs');

const numArr = [1, 2, 3, 4, 5];
const fileCommonName = 'syncText';

numArr.forEach((num) => {
  const fileName = fileCommonName + num;
  const data = fs.readFileSync(`${fileName}.txt`);
  console.log(`file[${fileName}] with ${data}`);
})