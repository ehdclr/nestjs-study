"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
var port = 8000;
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
});
app.get("/cats", function (req, res, next) {
    try {
        var cats = app_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map