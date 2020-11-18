const jwt = require('../modules/jwt');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const ut = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    //middlewares
    //미들웨어로 token이 있는지 없는지 확인하고
    //token이 있다면 jwt.verify함수를 이용해서 토큰 hash를 확인하고 토큰에 들어있는 정보 해독
    //해독한 정보는 req.decoded에 저장하고 있으며 이후 로그인 유무는 decoded가 있는지 없는지를 통해 알 수 있음
    checkToken: async (req, res, next) => {
        var token = req.headers.jwt;
        if (!token) {
            return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
        }
        if (user.id === undefined) {
            return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
        }
        req.decoded = user;
        next();
    }
}
module.exports = authUtil;