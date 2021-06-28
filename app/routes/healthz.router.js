'use strict';

const express = require('express');

const healthzRouter = express.Router();

healthzRouter.get('/_healthz', (req, res, next) => {
    res.json({
        "ok": "ok"
    });
});

module.exports = healthzRouter;