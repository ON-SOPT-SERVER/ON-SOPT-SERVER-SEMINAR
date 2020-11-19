const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { userService } = require('../service');
const { User } = require('../models');
const jwt = require('../modules/jwt');

module.exports ={
  signup: async (req, res) => {
    const { email, password, userName } = req.body; 
    if(!email || !password || !userName) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try{
      const alreadyEmail = await userService.emailCheck(email);
      if(alreadyEmail){
        console.log('이미 존재하는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
      }
      const user = await userService.signup(email, password, userName);
     
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
        email: user.email,
        password: user.password,
        userName: user.userName,
      }));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
  },
  signin: async (req, res) => {
    const {email, password} = req.body; 
  
     if(!email || !password) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
     }
     
    try{
      const alreadyEmail = await userService.emailCheck(email);
      if(!alreadyEmail) {
        console.log('없는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_EMAIL));
      }
      
      const { salt, password: hashedPassword } = alreadyEmail;
      const user = await userService.signin(email,password, salt);
  
      if(!user){
        console.log('비밀번호가 일치하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
      }
      const {accessToken , refreshToken } = await jwt.sign(user);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
        accessToken,
        refreshToken
      }));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
    }
  },
  readAll: async (req, res) => {
    console.log(req.decoded);
    try {
      const users = await User.findAll({ attributes: ['id', 'email', 'userName'] });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_READ_ALL_SUCCESS, users));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));
    }
  },
  readOne: async (req, res) => {
    const { id } = req.params;
    try{
      const user = await User.findOne({ where: { id }});
      if (!user) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));    
    }
  },
  getProfile: async (req, res) => {
    const { id } = req.decoded;
    console.log(req.decoded);
    try {
      const user = await User.findOne({ where : { id }, attributes: ['id', 'userName', 'email']});
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, user));
    } catch(err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));    
    }
  }
}