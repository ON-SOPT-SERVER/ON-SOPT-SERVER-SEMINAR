function print(){
  console.log('print');
}

// Synchronous callback function
function printImmediately(print){
  print();
}

printImmediately(print);

// Asynchronous callback function
function printDelay(print, timeOut){
  setTimeout(print, timeOut);
}

function asyncPrint(){
  console.log('async print');
}

printDelay(asyncPrint, 1000);
