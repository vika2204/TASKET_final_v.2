const express = require('express');
require("dotenv").config();
const apiRoutes = require('./routes/api.routes');
const serverConfig = require('./config/serverConfig');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);


app.use('/api', apiRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/dist/index.html'))
})


app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
