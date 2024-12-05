const jwt = require("jsonwebtoken")

function verifyAccessToken(req, res, next) {
    try {
        // в константу кладем токен (из строки типа 'Bearer ${accessToken}' делаем массив и берем нужный элемент)
        const accessToken = req.headers.authorization.split(' ')[1];
        const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        res.locals.user = user;

        next();
    } catch (error) {
        res.status(403).send('Invalid access token');
    }
}

module.exports = verifyAccessToken
