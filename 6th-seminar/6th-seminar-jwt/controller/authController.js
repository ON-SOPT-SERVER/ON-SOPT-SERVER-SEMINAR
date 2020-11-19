const express = require('express');
const router = express.Router();
const ut = require('../modules/ut');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/', async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
  }
  const user = await jwt.verify(token);
  // 유효하지 않은 JWT - 이렇게 출력하고 저한테 캡처해서 주세요
  console.log(user);

  if (user === TOKEN_EXPIRED) {
    return res.json(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
  }
  if (user === TOKEN_INVALID) {
    return res.json(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  if (user.idx === undefined) {
    return res.json(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  return res.json(ut.success(sc.OK, rm.AUTH_SUCCESS));
});
module.exports = router;