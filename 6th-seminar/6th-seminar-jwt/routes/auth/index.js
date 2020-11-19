const express = require('express');
const router = express.Router();
const ut = require('../../modules/util');
const sc = require('../../modules/statusCode');
const rm = require('../../modules/responseMessage');
const jwt = require('../../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/', async (req, res) => {
  const token = req.headers.jwt;
  if (!token) {
    return res.json(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
  }
  const user = await jwt.verify(token);
  console.log(user);
  if (user === TOKEN_EXPIRED) {
    return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
  }
  if (user === TOKEN_INVALID) {
    return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  if (user.id === undefined) {
    return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
  }
  return res.status(sc.OK).send(ut.fail(sc.OK, rm.AUTH_SUCCESS));
});

module.exports = router;