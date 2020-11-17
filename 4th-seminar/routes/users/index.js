const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User } = require('../../models');
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

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
    })

    if (!user) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_READ_ALL_FAIL));    
  }
});

module.exports = router;
