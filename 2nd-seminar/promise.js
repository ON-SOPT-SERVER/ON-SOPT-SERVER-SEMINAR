const promise = new Promise(function (resolve, reject) {
  const age = 26;
  if (age > 20) {
    resolve(age);
  } 
});
promise //
  .then(function (resolvedData) {
    console.log(resolvedData);
  });