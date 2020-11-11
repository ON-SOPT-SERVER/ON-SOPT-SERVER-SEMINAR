const crypto = require('crypto');
const { User, Post } = require('../models');
module.exports = {
  isValidEmail: async ( email ) => {
    try {
      const alreadyEmail = await User.findOne({
        where: {
          email,
        }
      });
      return alreadyEmail;
    } catch (err) {
      throw err;
    }
  },
  signup: async ({email, userName, password}) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        email,
        password: hashedPassword,
        userName,
        salt,
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  isValidUser: async (id) => {
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  deleteOne: async (userId) => {
    try {
      const user = await User.destroy({ where: { id: userId }});
      return user;
    } catch (err) {
      throw err;
    }
  },
  getPostByUser: async (userId) => {
    try {
      const user = await User.findOne({
        attributes: ['userName', 'email'],
        where: {
          id: userId,
        },
        include: [{
          model: Post,// 내가 쓴 게시글
          attributes: ['title', 'contents'],
        },{
          model: Post, //내가 좋아요한 게시글
          attributes: ['title'],
          as: 'Liked',
        }]
      });
      return user;
    } catch (err) {
      throw err;
    }
  } 
}