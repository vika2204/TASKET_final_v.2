const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const path = require('path')




const serverConfig = (app) => {
    // погран. служба / парсит тело из формы
    app.use(express.urlencoded({ extended: true }))

    // погран. служба регистрации / парсит JSON
    app.use(express.json())

    app.use(
        cors({
            origin: ["http://46.148.238.157:80"],
            optionsSuccessStatus: 200,
            credentials: true
        })
    );

    // "служба" фиксации логов
    app.use(morgan('dev'));

    app.use(cookieParser());

    // настройка статики, папка public ассоциирована с маршрутом запроса
    app.use(express.static(path.join(__dirname, '../public/dist')));
    // app.use(express.static('public'))
}

module.exports = serverConfig;
