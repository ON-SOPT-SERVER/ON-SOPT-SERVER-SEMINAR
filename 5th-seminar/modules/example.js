const {
  User,
  Post
} = require('../models');

async function play() {
  const user = await User.findOne({});
  const posts = await user.getPosts();
  posts.forEach( it => {
    console.log(it.dataValues)
  });
}

play();