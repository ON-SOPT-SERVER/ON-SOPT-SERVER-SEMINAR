const { User, Post, Like } = require('../models');
const create = async (title, contents, UserId) => {
  try {
    const post = await Post.create({
      title,
      contents,
      UserId,
    });
    return post;
  } catch (err) {
    throw err;
  }
}

const readOne = async (postId) => {
  try{
    const post = await Post.findOne({
      where: {
        id: postId,
      }
    });
    return post;
  } catch (err) {
    throw err;
  }
}

const getPostAll = async () => {
  try{
    const posts = await Post.findAndCountAll({
      attributes: ['title', 'contents', 'createdAt'],
      include: [{
        model: User, //작성자
        attributes: ['userName']
      }, {
        model: User, //좋아요 한사람
        as: 'Liker',
        attributes: ['userName'],
        required: true,
      }]
    });

    return posts;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  create,
  readOne,
  getPostAll,
}
