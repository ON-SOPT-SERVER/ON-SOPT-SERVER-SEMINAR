// 중학교 -> 고등학교 -> 대학교
const 자퇴 = true;
const middleSchool = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`중학교`);
  }, 1000)
});

const highSchool = school => new Promise((resolve, reject) => {
  if (자퇴) {
    setTimeout(() => {
      reject(new Error('에러!'));
    }, 1000)
  } else {
    setTimeout(() => {
      resolve(`${school} => 고등학교`);
    }, 1000)
  }
})

const univ = school => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`${school} => 대학교`);
  }, 1000)
})

middleSchool() //
  .then(school => highSchool(school))
  .catch(err => {
    return `검정고시`;
  })
  .then(school => univ(school))
  .then(result => console.log(result))
  .catch(error => console.error(error));
