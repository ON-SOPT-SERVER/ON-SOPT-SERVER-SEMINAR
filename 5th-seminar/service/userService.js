const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
  readOneEmail: async ( email ) => {
    try {
      const user = await User.findOne({
        where: {
          email,
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  signup: async (email, userName, password) => {
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
  }
}