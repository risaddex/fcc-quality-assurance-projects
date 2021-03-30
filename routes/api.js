"use strict";
const router = require("express").Router();
const converterRoute = require('./metricimpconverter')
const expect = require("chai").expect;

module.exports = function (app) {
  app.use("/api", router);
  // /api/converter
  router.use(converterRoute)
  
};
