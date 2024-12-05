require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');



//ф-я создает объект с 2-мя токенами

function generateTokens(payload) {
    return {             //что шифруем,  при помощи уникального ключа,    срок жизни токена
        accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: jwtConfig.access.expiresIn}),
        refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: jwtConfig.refresh.expiresIn}),
    };
}

module.exports = generateTokens;
