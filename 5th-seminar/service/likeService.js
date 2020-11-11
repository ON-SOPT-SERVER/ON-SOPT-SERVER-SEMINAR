const { Like } = require('../models');
const createLike = async (UserId, PostId) => {
  try {
    const like = await Like.create({
      UserId,
      PostId
    });
    return like;
  } catch (err) {
    throw err;
  }
}

const readOne = async (UserId, PostId) => {
  try {
    const like = await Like.findOne({ 
      where: {
        UserId,
        PostId,
      }
     });
    return like;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createLike,
  readOne,
}