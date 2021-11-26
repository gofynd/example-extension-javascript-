'use strict';

require("dotenv").config();
require('./app/common/redis.init');
const app = require("./app/server");
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});