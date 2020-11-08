const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const userController = require('../../controllers/userController');
const { User } = require('../../models');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', userController.readAll);
router.get('/:id', userController.readOne);
router.put('/:id', userController.update);
router.delete('/:id', async (req, res) =>{
  const { id } = req.params;

  const alreadyEmail = await User.findOne({
    where: {
      id
    }
  });

  if(!alreadyEmail) {
    console.log('없는 이메일 입니다.');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NO_USER));
  }
  const isDeleted = await User.destroy({
    where: {
      id
    }
  });

  if(!isDeleted) {
    console.log('사용자 삭제 실패.');
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));
  }

  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_USER_SUCCESS));
})

module.exports = router;
