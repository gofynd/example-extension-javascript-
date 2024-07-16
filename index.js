'use strict';

require("dotenv").config();
require('./app/common/redis.init');
const app = require("./app/server");
const config = require("./app/config");
const port = config.port || 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});