const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const jwt = require('../modules/jwt');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  reIssue: async (req, res) => {
    try {
      const refreshToken = req.headers.refreshtoken;
      if (!refreshToken) {
        return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
      }
      const newToken = await jwt.refresh(refreshToken);
      if (newToken == TOKEN_EXPIRED) {
        return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
      }
      if (newToken == TOKEN_INVALID) {
        return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
      }
      res.status(sc.OK).send(ut.success(sc.OK, rm.ISSUE_SUCCESS, {
        accessToken: newToken
      }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  }
}