const crypto = require('crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User } = require('../models');
const { userService } = require('../service');

module.exports = {
  signup : async (req, res) => {
    const { email, password, userName } = req.body; 
    if(!email || !password || !userName) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try{
      const alreadyEmail = await userService.readOneEmail(email);
      if(alreadyEmail){
        console.log('이미 존재하는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
      }
      const user = await userService.signup(email, userName, password);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, user));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
  }
}

