var variableVar = "123";
var variableVar = "321";

console.log(`variableVar: ${variableVar}`); // 321

let variableLet = "123";
let variableLet = "321";

console.log(`variableLet: ${variableLet}`); //// SyntaxError: Identifier 'variableLet' has already been declared

const variableConst = "123";
const variableConst = "321";

console.log(`variableConst: ${variableConst}`); //SyntaxError: Identifier 'variableConst' has already been declared

const objectConst = {name: '최영훈'};
objectConst.name = '김정재'; //이거는 됨
console.log(objectConst); // 김정재