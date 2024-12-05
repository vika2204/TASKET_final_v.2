const jwt = require("jsonwebtoken")

function verifyRefreshToken(req, res, next) {
    try {
        // в express у req есть свойство cookies
        const { refreshToken } = req.cookies;
        // проверяем токен, который пришел выше, при помощи секретного слова
        const { user } = jwt.verify(refreshToken || '', process.env.REFRESH_TOKEN_SECRET);

        // используется для хранения произвольных данных между разными мидлварками, и в конце концов в контроллере
        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.clearCookie('refreshToken').sendStatus(401);
    }
}


module.exports = verifyRefreshToken
