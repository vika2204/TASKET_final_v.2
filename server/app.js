const express = require('express')
//const indexRoutes = require('./routes/index.routes')
const serverConfig = require('./config/serverConfig');

const app = express();

const PORT = 3000;

serverConfig(app);

//app.use('/', indexRoutes)


app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
