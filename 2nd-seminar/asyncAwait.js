async function getData() {
  const data = 'data' // 데이터를 읽어오는데 10초가 걸린다고 가정.
  return data;
}

async function main(){
  const data = await getData();
  console.log(data);
}

main();