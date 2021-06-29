'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const healthzRouter = require("./routes/healthz.router");
const fdkExtension = require("./fdk");

const app = express();

app.use(cookieParser("ext.session"));
app.use(bodyParser.json({
    limit: '2mb'
}));

app.use("/", healthzRouter);
app.use("/", fdkExtension.fdkHandler);

app.use(express.static("dist"));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

module.exports = app;