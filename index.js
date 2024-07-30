'use strict';

require("dotenv").config();
require('./sqlite.init');
const app = require("./server");
const port = process.env.BACKEND_PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});