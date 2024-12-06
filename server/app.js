const express = require('express')
const apiRoutes = require('./routes/api.routes')
const serverConfig = require('./config/serverConfig');

const app = express();

const PORT = 3000;

serverConfig(app);


app.use('/api', apiRoutes)


app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
