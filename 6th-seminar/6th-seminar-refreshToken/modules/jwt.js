const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey')
const { userService } = require('../service');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user.id,
            name: user.userName
        };
        const result = {
            token: jwt.sign(payload, secretKey, options),
            refreshToken: jwt.sign(payload, secretKey, refreshOptions),
        };
        await userService.updateRefreshToken(user.id, result.refreshToken);
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    },
    refresh: async (refreshToken) => {
        try {
            const result = await jwt.verify(refreshToken, secretKey);
            if (result.id === undefined) {
                return TOKEN_INVALID;
            }
            const user = await userService.getUserId(result.id);
            if (refreshToken !== user.refreshToken) {
                console.log('invalid refresh token');
                return TOKEN_INVALID;
            }
            const payload = {
                id: user.id,
                name: user.userName
            };
            const dto = {
                token: jwt.sign(payload, secretKey, options)
            };
            return dto;
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
    }
}