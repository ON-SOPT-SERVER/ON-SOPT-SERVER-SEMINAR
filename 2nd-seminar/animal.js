const func1 = () => {
  console.log('function');
}

const func2 = () => {
  console.log('function 2');
}

const animal = {
	animalType: "dog",
	animalName: "뽀삐",
	animalFriends: ['코코', '초코', '쿠키'],
	bark: function() {
		console.log(`${this.animalName}: 멍멍`);
	},
	thisFriends: function() {
		this.animalFriends.forEach( friend => {
			console.log(`${this.animalName}의 친구: ${friend}`);
		})
	}
};

module.exports = {
  func1,
  func2,
  animal,
}
