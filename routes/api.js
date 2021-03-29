"use strict";
const router = require("express").Router();
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.use("/api", router);
  let convertHandler = new ConvertHandler();
  router.get("/convert", (req, res, next) => {
    const response = convertHandler.getResponse(req.query.input);

    res.status(200).json(response);
    next();
  });
};
