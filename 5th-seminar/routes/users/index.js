const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User, Post } = require('../../models');
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);

router.post('/signin', async (req, res) => {
  const {email, password} = req.body; 

   if(!email || !password) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
    try{
    const alreadyEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(alreadyEmail);

    if(!alreadyEmail) {
      console.log('없는 이메일 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const { salt, password: hashedPassword } = alreadyEmail;
    const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

    if(inputPassword !== hashedPassword){
      console.log('비밀번호가 일치하지 않습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, email));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName'],
    });

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_READ_ALL_SUCCESS, users));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    const posts = await user.getPosts();

    if (!user) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, posts));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));    
  }
});


module.exports = router;
